import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Selectors
  private readonly usernameInput = '#username';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#login-button';
  private readonly errorMessage = '.error-message';
  private readonly welcomeMessage = '.welcome-message';

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async getWelcomeMessage() {
    return await this.getText(this.welcomeMessage);
  }

  async isLoginPage() {
    return await this.page.url().includes('/login');
  }
} 