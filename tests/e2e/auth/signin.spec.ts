import { test, expect, Page } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { LoginPage } from '../../../pages/login/signin.page';

// Load environment variables based on environment
const env = process.env.NODE_ENV || 'dev';
dotenv.config({ path: path.resolve(__dirname, `../../../env/.env.${env}`) });

const BASE_URL = process.env.BASE_URL || 'https://dev.pippasync.customeradmin.boostonamazon.com/';

// Test data
const validCredentials = {
  email: 'admin@admin.com',
  password: '12345678'
};

const invalidCredentials = {
  email: 'wrong@email.com',
  password: 'wrongpassword'
};

const invalidEmailFormat = {
  email: 'invalid-email',
  password: '12345678'
};

const invalidPasswordFormat = {
  email: 'admin@admin.com',
  password: '123' // Too short password
};

const emptyCredentials = {
  email: '',
  password: ''
};

// Selector for sign out button (not part of login page)
const signOutSelector = 'button:has-text("Sign Out")'; // This might need adjustment based on actual implementation

// Helper function for sign out
async function signOut(page: Page) {
  // This might need adjustment based on actual implementation
  await page.click(signOutSelector);
}

test.describe('Authentication - Sign In', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(BASE_URL);
  });

  // Positive scenarios
  test.describe('Positive Scenarios', () => {
    test('should sign in with valid credentials', async ({ page }) => {
      await loginPage.login(validCredentials.email, validCredentials.password);
      
      // Verify successful login - this might need adjustment based on actual implementation
      // For example, checking for a dashboard element or user profile
      await expect(page).not.toHaveURL(BASE_URL); // Assuming redirect after login
      // Additional assertions based on the actual behavior after login
    });

    test('should sign out successfully', async ({ page }) => {
      // First sign in
      await loginPage.login(validCredentials.email, validCredentials.password);
      
      // Then sign out
      await signOut(page);
      
      // Verify successful sign out - this might need adjustment based on actual implementation
      await expect(page).toHaveURL(BASE_URL);
    });
  });

  // Negative scenarios
  test.describe('Negative Scenarios', () => {
    test('should not sign in with wrong credentials', async ({ page }) => {
      await loginPage.login(invalidCredentials.email, invalidCredentials.password);
      
      // Verify error message - this might need adjustment based on actual implementation
      await loginPage.verifyErrorMessage();
      await expect(page).toHaveURL(BASE_URL); // Should stay on login page
    });

    test('should not sign in with wrong email format', async ({ page }) => {
      await loginPage.login(invalidEmailFormat.email, invalidEmailFormat.password);
      
      // Verify error message - this might need adjustment based on actual implementation
      await loginPage.verifyErrorMessage();
      await expect(page).toHaveURL(BASE_URL); // Should stay on login page
    });

    test('should not sign in with wrong password format', async ({ page }) => {
      await loginPage.login(invalidPasswordFormat.email, invalidPasswordFormat.password);
      
      // Verify error message - this might need adjustment based on actual implementation
      await loginPage.verifyErrorMessage();
      await expect(page).toHaveURL(BASE_URL); // Should stay on login page
    });

    test('should not sign in with empty credentials', async ({ page }) => {
      await loginPage.login(emptyCredentials.email, emptyCredentials.password);
      
      // Verify error message - this might need adjustment based on actual implementation
      await loginPage.verifyErrorMessage();
      await expect(page).toHaveURL(BASE_URL); // Should stay on login page
    });
  });

  // Page content verification
  test.describe('Page Content Verification', () => {
    test('should verify page title', async () => {
      await loginPage.verifyPageTitle('Pippasync Customer Admin');
    });

    test('should verify login form elements', async () => {
      await loginPage.verifyLoginFormElements();
    });
  });
});


