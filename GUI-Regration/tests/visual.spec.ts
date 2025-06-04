import { test, expect } from '@playwright/test';
import { VisualComparison } from '../utils/visualComparison';

test.describe('Visual Regression Tests', () => {
  let visualComparison: VisualComparison;

  test.beforeEach(async ({ page }) => {
    visualComparison = new VisualComparison();
    await page.goto('/');
  });

  test('homepage should match baseline', async ({ page }) => {
    const screenshot = await page.screenshot();
    const result = await visualComparison.compareScreenshots(
      screenshot,
      'homepage'
    );
    expect(result.match).toBeTruthy();
    expect(result.diffPercentage).toBeLessThan(0.1);
  });

  test('login page should match baseline', async ({ page }) => {
    await page.goto('/login');
    const screenshot = await page.screenshot();
    const result = await visualComparison.compareScreenshots(
      screenshot,
      'login-page'
    );
    expect(result.match).toBeTruthy();
    expect(result.diffPercentage).toBeLessThan(0.1);
  });

  test('dashboard should match baseline', async ({ page }) => {
    await page.goto('/dashboard');
    // Wait for any loading states to complete
    await page.waitForLoadState('networkidle');
    const screenshot = await page.screenshot();
    const result = await visualComparison.compareScreenshots(
      screenshot,
      'dashboard'
    );
    expect(result.match).toBeTruthy();
    expect(result.diffPercentage).toBeLessThan(0.1);
  });
}); 