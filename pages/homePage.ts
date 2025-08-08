import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page, 'home');
  }

  /**
   * Navigate to home page
   */
  async navigateToHome(baseUrl: string = ''): Promise<void> {
    await this.goto(`${baseUrl}/home`);
  }

  /**
   * Get welcome message text
   */
  async getWelcomeMessage(): Promise<string> {
    return await this.getElementText('welcome_message');
  }

  /**
   * Check if welcome message is visible
   */
  async isWelcomeMessageVisible(): Promise<boolean> {
    return await this.isElementVisible('welcome_message');
  }

  /**
   * Click on navigation menu
   */
  async clickNavigationMenu(): Promise<void> {
    await this.clickElement('navigation_menu');
  }

  /**
   * Click on user profile dropdown
   */
  async clickUserProfileDropdown(): Promise<void> {
    await this.clickElement('user_profile_dropdown');
  }

  /**
   * Wait for home page to load
   */
  async waitForHomePage(): Promise<void> {
    await this.waitForElement('welcome_message');
    await this.waitForElement('navigation_menu');
  }

  /**
   * Check if user is logged in (profile dropdown visible)
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.isElementVisible('user_profile_dropdown');
  }
}