import { setWorldConstructor, World } from '@cucumber/cucumber';
import { APIRequestContext, request } from '@playwright/test';

export class CustomWorld extends World {
  public token?: string;
  public profileData?: any;
  public apiContext?: APIRequestContext;

  async init() {
    this.apiContext = await request.newContext({
      baseURL: process.env.API_BASE_URL
    });
  }

  async cleanup() {
    if (this.apiContext) {
      await this.apiContext.dispose();
    }
  }
}

setWorldConstructor(CustomWorld); 