import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { SelectorManager } from '../utils/selectorManager';

test.describe('Selector Management Example', () => {
  let selectorManager: SelectorManager;

  test.beforeEach(async () => {
    selectorManager = new SelectorManager();
  });

  test('should use selectors from CSV for login flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // Navigate to login page
    await loginPage.navigateToLogin(process.env.BASEURL || 'https://example.com');

    // Wait for login page to load
    await loginPage.waitForLoginPage();

    // Verify login form is visible
    expect(await loginPage.isLoginFormVisible()).toBe(true);

    // Perform login using selectors from CSV
    await loginPage.login('testuser@example.com', 'password123');

    // Wait for home page
    await homePage.waitForHomePage();

    // Verify user is logged in
    expect(await homePage.isUserLoggedIn()).toBe(true);
  });

  test('should demonstrate selector management operations', async ({ page }) => {
    // List all selectors
    const allSelectors = selectorManager.listSelectors();
    console.log('All selectors:', allSelectors);

    // Get selectors for login page
    const loginSelectors = selectorManager.getPageSelectors('login');
    console.log('Login page selectors:', loginSelectors);

    // Search for selectors containing 'button'
    const buttonSelectors = selectorManager.searchSelectors('button');
    console.log('Button selectors:', buttonSelectors);

    // Get a specific selector
    const usernameSelector = selectorManager.getSelector('login', 'username_input');
    console.log('Username selector:', usernameSelector);

    // Use the selector directly with Playwright
    await page.goto(process.env.BASEURL || 'https://example.com/login');
    const usernameField = page.locator(usernameSelector);
    await usernameField.fill('test@example.com');
  });

  test('should add and update selectors dynamically', async ({ page }) => {
    // Add a new selector
    selectorManager.addSelector(
      'payment_button',
      'checkout',
      'button',
      'button[data-testid="payment-submit"]',
      'Payment submit button on checkout page'
    );

    // Update an existing selector
    selectorManager.updateSelector(
      'username_input',
      'login',
      'input',
      'input[data-testid="username"]',
      'Updated username input with data-testid'
    );

    // Verify the updated selector works
    const updatedSelector = selectorManager.getSelector('login', 'username_input');
    expect(updatedSelector).toBe('input[data-testid="username"]');
  });

  test('should handle selector errors gracefully', async ({ page }) => {
    // Test error handling for non-existent selector
    expect(() => {
      selectorManager.getSelector('nonexistent', 'element');
    }).toThrow('Selector not found: nonexistent.element');

    // Test error handling for non-existent page
    const emptySelectors = selectorManager.getPageSelectors('nonexistent');
    expect(Object.keys(emptySelectors)).toHaveLength(0);
  });
});