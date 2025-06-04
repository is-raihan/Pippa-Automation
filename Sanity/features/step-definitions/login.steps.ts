import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { Page, Browser } from '@playwright/test';
import { World } from '../support/world';

Given('I am on the login page', async function(this: World) {
  await this.page.goto(`${process.env.BASE_URL}/login`);
  await this.page.waitForLoadState('networkidle');
});

When('I enter valid username and password', async function(this: World) {
  await this.page.fill('#username', process.env.TEST_USERNAME || 'testuser');
  await this.page.fill('#password', process.env.TEST_PASSWORD || 'testpass');
});

When('I enter invalid username and password', async function(this: World) {
  await this.page.fill('#username', 'invaliduser');
  await this.page.fill('#password', 'invalidpass');
});

When('I leave username and password fields empty', async function(this: World) {
  await this.page.fill('#username', '');
  await this.page.fill('#password', '');
});

When('I click the login button', async function(this: World) {
  await this.page.click('#login-button');
  await this.page.waitForLoadState('networkidle');
});

Then('I should be redirected to the dashboard', async function(this: World) {
  const currentUrl = this.page.url();
  expect(currentUrl).to.include('/dashboard');
});

Then('I should see a welcome message', async function(this: World) {
  const welcomeMessage = await this.page.textContent('.welcome-message');
  expect(welcomeMessage).to.include('Welcome');
});

Then('I should see an error message', async function(this: World) {
  const errorMessage = await this.page.textContent('.error-message');
  expect(errorMessage).to.include('Invalid credentials');
});

Then('I should remain on the login page', async function(this: World) {
  const currentUrl = this.page.url();
  expect(currentUrl).to.include('/login');
});

Then('I should see validation error messages', async function(this: World) {
  const usernameError = await this.page.textContent('#username-error');
  const passwordError = await this.page.textContent('#password-error');
  expect(usernameError).to.exist;
  expect(passwordError).to.exist;
}); 