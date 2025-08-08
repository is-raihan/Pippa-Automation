import { Page, Locator } from '@playwright/test';
import { SelectorManager } from '../utils/selectorManager';

export class BasePage {
  protected page: Page;
  protected selectorManager: SelectorManager;
  protected pageName: string;

  constructor(page: Page, pageName: string) {
    this.page = page;
    this.pageName = pageName;
    this.selectorManager = new SelectorManager();
  }

  /**
   * Get a locator using the selector from CSV
   */
  protected getElement(selectorName: string): Locator {
    const selector = this.selectorManager.getSelector(this.pageName, selectorName);
    return this.page.locator(selector);
  }

  /**
   * Get all selectors for this page
   */
  protected getPageSelectors(): Record<string, string> {
    return this.selectorManager.getPageSelectors(this.pageName);
  }

  /**
   * Navigate to a URL
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Wait for page to load
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selectorName: string): Promise<boolean> {
    const element = this.getElement(selectorName);
    return await element.isVisible();
  }

  /**
   * Click an element
   */
  async clickElement(selectorName: string): Promise<void> {
    const element = this.getElement(selectorName);
    await element.click();
  }

  /**
   * Fill an input field
   */
  async fillElement(selectorName: string, text: string): Promise<void> {
    const element = this.getElement(selectorName);
    await element.fill(text);
  }

  /**
   * Get text from an element
   */
  async getElementText(selectorName: string): Promise<string> {
    const element = this.getElement(selectorName);
    return await element.textContent() || '';
  }

  /**
   * Wait for an element to be visible
   */
  async waitForElement(selectorName: string, timeout: number = 5000): Promise<void> {
    const element = this.getElement(selectorName);
    await element.waitFor({ state: 'visible', timeout });
  }

  /**
   * Hover over an element
   */
  async hoverElement(selectorName: string): Promise<void> {
    const element = this.getElement(selectorName);
    await element.hover();
  }

  /**
   * Double click an element
   */
  async doubleClickElement(selectorName: string): Promise<void> {
    const element = this.getElement(selectorName);
    await element.dblclick();
  }

  /**
   * Right click an element
   */
  async rightClickElement(selectorName: string): Promise<void> {
    const element = this.getElement(selectorName);
    await element.click({ button: 'right' });
  }

  /**
   * Check if element is enabled
   */
  async isElementEnabled(selectorName: string): Promise<boolean> {
    const element = this.getElement(selectorName);
    return await element.isEnabled();
  }

  /**
   * Get element attribute
   */
  async getElementAttribute(selectorName: string, attribute: string): Promise<string | null> {
    const element = this.getElement(selectorName);
    return await element.getAttribute(attribute);
  }
}