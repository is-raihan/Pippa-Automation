# Smoke Journey Tests

This directory contains smoke tests for the Pippa project using Playwright and TypeScript.

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
BASE_URL=http://your-app-url
TEST_USERNAME=your_test_username
TEST_PASSWORD=your_test_password
```

## Project Structure

- `tests/` - Contains test files
  - `pages/` - Page Object Models
    - `BasePage.ts` - Base page class with common methods
    - `LoginPage.ts` - Login page specific methods
  - `smoke/` - Smoke test files
- `playwright.config.ts` - Playwright configuration
- `package.json` - Project dependencies and scripts

## Running Tests

- Run all tests:
```bash
npm test
```

- Run tests with UI mode:
```bash
npm run test:ui
```

- Run tests in headed mode:
```bash
npm run test:headed
```

- Run tests in debug mode:
```bash
npm run test:debug
```

- Run smoke tests only:
```bash
npm run test:smoke
```

- Record new test:
```bash
npm run test:record
```

- View test report:
```bash
npm run report
```

## Page Object Model

The project uses the Page Object Model pattern to maintain test code:

1. `BasePage` - Contains common methods for all pages
2. Page-specific classes (e.g., `LoginPage`) extend `BasePage`
3. Each page class contains:
   - Selectors as private readonly properties
   - Methods for page-specific actions
   - Methods for page-specific assertions

## Best Practices

1. Keep selectors in page objects
2. Use meaningful test descriptions
3. Tag smoke tests with @smoke
4. Use environment variables for configuration
5. Keep tests independent
6. Clean up after tests
7. Use appropriate assertions
8. Handle test data appropriately 