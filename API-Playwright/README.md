# API Testing Suite with Playwright and Cucumber

This directory contains API tests for the Pippa project using Playwright and Cucumber for BDD (Behavior Driven Development).

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Playwright browsers

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. Create a `.env` file with your environment variables:
```
API_BASE_URL=http://your-api-url
TEST_USERNAME=your_test_username
TEST_PASSWORD=your_test_password
```

## Project Structure

- `features/` - Contains Cucumber feature files
  - `api/` - API feature files
  - `step-definitions/` - Step definitions for features
  - `support/` - Support files (hooks, world, etc.)
- `cucumber.js` - Cucumber configuration
- `package.json` - Project dependencies and scripts

## Running Tests

- Run all tests:
```bash
npm test
```

- Run tests in parallel:
```bash
npm run test:parallel
```

- Generate HTML report:
```bash
npm run test:report
```

- Run specific tags:
```bash
# Run smoke tests
npm run test:smoke

# Run regression tests
npm run test:regression

# Run API tests
npm run test:api

# Run UI tests
npm run test:ui
```

## Writing Tests

1. Create a new feature file in `features/api/` directory:
```gherkin
Feature: Feature Name
  As an API user
  I want to perform some action
  So that I can achieve some goal

  @api @tag
  Scenario: Scenario description
    Given some precondition
    When I perform some action
    Then I should see some result
```

2. Create step definitions in `features/step-definitions/`:
```typescript
import { Given, When, Then } from '@cucumber/cucumber';

Given('some precondition', async function() {
  // Implementation
});

When('I perform some action', async function() {
  // Implementation
});

Then('I should see some result', async function() {
  // Implementation
});
```

## Best Practices

1. Use meaningful feature and scenario descriptions
2. Keep scenarios focused and atomic
3. Use appropriate tags for test organization
4. Follow the Given-When-Then pattern
5. Keep step definitions reusable
6. Handle test data appropriately
7. Clean up after tests
8. Use environment variables for configuration 