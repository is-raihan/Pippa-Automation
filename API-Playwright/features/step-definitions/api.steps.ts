import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { APIRequestContext, request } from '@playwright/test';
import { World } from '../support/world';

let apiContext: APIRequestContext;
let response: any;

Given('I have a valid authentication token', async function(this: World) {
  const loginResponse = await request.post(`${process.env.API_BASE_URL}/api/login`, {
    data: {
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD
    }
  });
  const responseBody = await loginResponse.json();
  this.token = responseBody.token;
});

Given('I don\'t have an authentication token', function(this: World) {
  this.token = undefined;
});

Given('I have valid user profile data', function(this: World) {
  this.profileData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890'
  };
});

Given('I have invalid user profile data', function(this: World) {
  this.profileData = {
    name: '',
    email: 'invalid-email',
    phone: 'invalid-phone'
  };
});

When('I send a {string} request to {string}', async function(this: World, method: string, endpoint: string) {
  const headers: any = {
    'Content-Type': 'application/json'
  };

  if (this.token) {
    headers['Authorization'] = `Bearer ${this.token}`;
  }

  const options: any = {
    headers
  };

  if (method === 'PUT' && this.profileData) {
    options.data = this.profileData;
  }

  response = await request[method.toLowerCase()](
    `${process.env.API_BASE_URL}${endpoint}`,
    options
  );
});

Then('the response status code should be {int}', async function(statusCode: number) {
  expect(response.status()).to.equal(statusCode);
});

Then('the response should contain user profile data', async function() {
  const responseBody = await response.json();
  expect(responseBody).to.have.property('name');
  expect(responseBody).to.have.property('email');
});

Then('the response should contain an error message', async function() {
  const responseBody = await response.json();
  expect(responseBody).to.have.property('error');
});

Then('the response should contain updated profile data', async function() {
  const responseBody = await response.json();
  expect(responseBody.name).to.equal(this.profileData.name);
  expect(responseBody.email).to.equal(this.profileData.email);
});

Then('the response should contain validation error messages', async function() {
  const responseBody = await response.json();
  expect(responseBody).to.have.property('errors');
  expect(responseBody.errors).to.be.an('array');
}); 