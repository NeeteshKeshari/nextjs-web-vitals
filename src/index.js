import fs from 'fs';
import path from 'path';
import { analyzePage } from './analyzer.js';
import { generateReport } from './reporter.js';

/**
 * Recursively get all Next.js pages in the project
 */
function getNextPages(dir) {
  const pages = [];
  const possibleDirs = [
    path.join(dir, 'app'),
    path.join(dir, 'pages'),
    path.join(dir, 'src', 'app'),
    path.join(dir, 'src', 'pages'),
  ];

  function walk(directory, prefix = '') {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      const relativePath = path.join(prefix, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath, relativePath);
      } else if (
        entry.name.endsWith('.js') ||
        entry.name.endsWith('.jsx') ||
        entry.name.endsWith('.ts') ||
        entry.name.endsWith('.tsx')
      ) {
        let pagePath = '/' + relativePath.replace(/\.(js|jsx|ts|tsx)$/, '');

        // Skip special pages and API routes
        if (
          ['/app/_app', '/app/_document', '/app/_error', '/pages/_app', '/pages/_document', '/pages/_error'].includes(pagePath)
        ) continue;
        if (pagePath.includes('[') && pagePath.includes(']')) continue;
        if (pagePath.startsWith('/api/')) continue;

        // Normalize /index to /
        if (pagePath.endsWith('/index')) {
          pagePath = pagePath.replace(/\/index$/, '');
        }

        pages.push(pagePath);
      }
    }
  }

  for (const dirPath of possibleDirs) {
    if (fs.existsSync(dirPath)) {
      walk(dirPath);
    }
  }

  return pages;
}

/**
 * Run the validator
 */
export async function runValidator({ baseUrl, mode = 'desktop', pageUrl }) {
  const results = [];

  if (pageUrl) {
    // Single page analysis: use the URL as-is
    const normalizedUrl = pageUrl.trim();
    console.log(`🚀 Analyzing single page: ${normalizedUrl}...`);
    try {
      const result = await analyzePage({ url: normalizedUrl, mode });
      results.push(result);
    } catch (err) {
      console.error(`❌ Failed to analyze ${normalizedUrl}:`, err.message || err);
    }
  } else {
    // Full site scan: combine baseUrl + relative page paths
    const projectDir = process.cwd();
    const pages = getNextPages(projectDir);

    console.log(`🔍 Found ${pages.length} pages:`, pages);

    for (const page of pages) {
      const url = new URL(page, baseUrl).href; // safely combine baseUrl + relative path
      console.log(`🚀 Analyzing ${url}...`);

      try {
        const result = await analyzePage({ url, mode });
        results.push(result);
      } catch (err) {
        console.error(`❌ Failed to analyze ${url}:`, err.message || err);
      }
    }
  }

  generateReport(results);
}
