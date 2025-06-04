import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Smoke Tests', () => {
  test('should login successfully with valid credentials @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Navigate to login page
    await loginPage.navigate('/login');
    
    // Perform login
    await loginPage.login(
      process.env.TEST_USERNAME || 'testuser',
      process.env.TEST_PASSWORD || 'testpass'
    );
    
    // Verify successful login
    const welcomeMessage = await loginPage.getWelcomeMessage();
    expect(welcomeMessage).toContain('Welcome');
  });

  test('should show error with invalid credentials @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Navigate to login page
    await loginPage.navigate('/login');
    
    // Attempt login with invalid credentials
    await loginPage.login('invaliduser', 'invalidpass');
    
    // Verify error message
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
    
    // Verify still on login page
    const isLoginPage = await loginPage.isLoginPage();
    expect(isLoginPage).toBeTruthy();
  });
}); 