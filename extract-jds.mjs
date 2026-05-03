#!/usr/bin/env node
/**
 * extract-jds.mjs — Extract JDs from Ashby job URLs using Playwright
 * Usage: node extract-jds.mjs <url1> <url2> ...
 */

import { chromium } from 'playwright';

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error('Usage: node extract-jds.mjs <url1> <url2> ...');
  process.exit(1);
}

async function extractJD(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    // Wait a bit more for SPA to fully render
    await page.waitForTimeout(3000);

    // Try multiple selectors to find job description content
    const content = await page.content();

    // Extract title
    const title = await page.title();

    // Try to find the main content area
    let bodyText = '';
    try {
      bodyText = await page.locator('body').innerText({ timeout: 5000 });
    } catch {
      bodyText = '';
    }

    // Get visible text from main content
    let mainContent = '';
    const selectors = [
      '[data-testid="job-description"]',
      '.job-description',
      '#job-description',
      'article',
      'main',
      '.content',
      '[role="main"]'
    ];

    for (const sel of selectors) {
      try {
        const el = page.locator(sel).first();
        if (await el.isVisible({ timeout: 2000 })) {
          mainContent = await el.innerText({ timeout: 3000 });
          if (mainContent.length > 100) break;
        }
      } catch {}
    }

    if (!mainContent || mainContent.length < 100) {
      mainContent = bodyText;
    }

    return {
      url,
      title,
      content: mainContent.substring(0, 15000),
      rawHtml: content.substring(0, 50000)
    };
  } finally {
    await browser.close();
  }
}

(async () => {
  for (const url of urls) {
    console.error(`\n=== Extracting JD from: ${url} ===`);
    try {
      const result = await extractJD(url);
      console.log(JSON.stringify(result));
    } catch (err) {
      console.error(`Error extracting ${url}: ${err.message}`);
      process.exit(1);
    }
  }
})();
