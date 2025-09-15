#!/usr/bin/env node
import { runValidator } from '../src/index.js';

// Read baseUrl from ENV or arguments
const baseUrl = process.env.BASE_URL || 'https://your-website-url.com'; // Replace with your staging/production URL
const mode = process.env.MODE || 'desktop'; // 'mobile' or 'desktop'
const pageUrl = process.env.PAGE_URL;   // Optional single URL

await runValidator({ baseUrl, mode, pageUrl });
