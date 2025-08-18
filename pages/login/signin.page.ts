import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.signInButton = page.locator('button:has-text("Sign In")');
    this.forgotPasswordLink = page.locator('a:has-text("Forgot Password?")');
    this.signUpLink = page.locator('a:has-text("Sign Up")');
    this.errorMessage = page.locator('.error-message'); // This might need adjustment based on actual implementation
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async fillLoginForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async login(email: string, password: string) {
    await this.fillLoginForm(email, password);
    await this.clickSignIn();
  }

  async verifyPageTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async verifyLoginFormElements() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
    await expect(this.signUpLink).toBeVisible();
  }

  async verifyErrorMessage() {
    await expect(this.errorMessage).toBeVisible();
  }
}