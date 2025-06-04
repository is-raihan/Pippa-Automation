import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

BeforeAll(async function() {
  // Global setup before all tests
  console.log('Starting API test suite...');
});

Before(async function(this: CustomWorld) {
  // Setup before each scenario
  await this.init();
});

After(async function(this: CustomWorld) {
  // Cleanup after each scenario
  await this.cleanup();
});

AfterAll(async function() {
  // Global cleanup after all tests
  console.log('API test suite completed.');
}); 