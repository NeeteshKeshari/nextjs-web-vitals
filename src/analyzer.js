import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';

export async function analyzePage({ url, mode = 'desktop' }) {
  // Validate URL
  try {
    new URL(url);
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }

  // Launch Chrome
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  const options = {
    port: chrome.port,
    output: 'json',
    logLevel: 'info',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    emulatedFormFactor: mode === 'desktop' ? 'desktop' : 'mobile',
  };

  const runnerResult = await lighthouse(url, options);
  await chrome.kill();

  const audits = runnerResult.lhr.audits;

  return {
    url,
    performance: runnerResult.lhr.categories.performance.score * 100,
    accessibility: runnerResult.lhr.categories.accessibility.score * 100,
    bestPractices: runnerResult.lhr.categories['best-practices'].score * 100,
    seo: runnerResult.lhr.categories.seo.score * 100,
    lcp: audits['largest-contentful-paint'].displayValue,
    cls: audits['cumulative-layout-shift'].displayValue,
    tbt: audits['total-blocking-time'].displayValue,
    fcp: audits['first-contentful-paint'].displayValue,
    speedIndex: audits['speed-index'].displayValue,
  };
}
