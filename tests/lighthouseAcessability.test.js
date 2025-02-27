const { test, expect } = require('@playwright/test');
const { execSync } = require('child_process');
const { readFileSync } = require('fs');



test('Lighthouse audit home page for accessibility', async ({ page }) => {
    await page.goto('http://localhost:3000');
  
    const url = page.url();
    const reportPath = 'lighthouse-report.json';
    const command = `npx lighthouse ${url} --output json --output-path ${reportPath} --only-categories=accessibility`;
  
    try {
      execSync(command);
    } catch (error) {
      console.error('Error running Lighthouse:', error);
    }
  
    const lhr = JSON.parse(readFileSync(reportPath));
  
    const accessibilityScore = lhr.categories.accessibility.score * 100;
    expect(accessibilityScore).toBeGreaterThanOrEqual(80);
  });
  
  test('Lighthouse audit content page for accessibility', async ({ page }) => {
    await page.goto('http://localhost:3000/content.html');
  
    const url = page.url();
    const reportPath = 'lighthouse-report.json';
    const command = `npx lighthouse ${url} --output json --output-path ${reportPath} --only-categories=accessibility`;
  
    try {
      execSync(command);
    } catch (error) {
      console.error('Error running Lighthouse:', error);
    }
  
    const lhr = JSON.parse(readFileSync(reportPath));
  
    const accessibilityScore = lhr.categories.accessibility.score * 100;
    expect(accessibilityScore).toBeGreaterThanOrEqual(90);
  });