# API Testing with Playwright

This directory contains the API testing suite for the Pippa project using Playwright.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
API_BASE_URL=http://localhost:3000
TEST_USERNAME=your_test_username
TEST_PASSWORD=your_test_password
```

## Running Tests

- Run all tests:
```bash
npm test
```

- Run tests in headed mode:
```bash
npm run test:headed
```

- Run tests in debug mode:
```bash
npm run test:debug
```

- View test report:
```bash
npm run report
```

## Test Structure

- Tests are located in the `tests` directory
- Test files should follow the naming convention: `*.api.spec.ts`
- Use the `request` fixture from Playwright for API calls

## Best Practices

1. Keep tests independent and isolated
2. Use environment variables for configuration
3. Clean up test data after each test
4. Use meaningful test descriptions
5. Follow the AAA pattern (Arrange, Act, Assert) 