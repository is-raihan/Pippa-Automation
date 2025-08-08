import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page, 'login');
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin(baseUrl: string = ''): Promise<void> {
    await this.goto(`${baseUrl}/login`);
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    await this.fillElement('username_input', username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillElement('password_input', password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.clickElement('login_button');
  }

  /**
   * Click forgot password link
   */
  async clickForgotPasswordLink(): Promise<void> {
    await this.clickElement('forgot_password_link');
  }

  /**
   * Perform complete login
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Check if login form is visible
   */
  async isLoginFormVisible(): Promise<boolean> {
    const usernameVisible = await this.isElementVisible('username_input');
    const passwordVisible = await this.isElementVisible('password_input');
    const buttonVisible = await this.isElementVisible('login_button');
    
    return usernameVisible && passwordVisible && buttonVisible;
  }

  /**
   * Wait for login page to load
   */
  async waitForLoginPage(): Promise<void> {
    await this.waitForElement('username_input');
    await this.waitForElement('password_input');
    await this.waitForElement('login_button');
  }
}