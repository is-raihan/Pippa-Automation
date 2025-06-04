# GUI Regression Testing Suite

This directory contains the GUI regression testing suite for the Pippa project using Playwright and pixelmatch for visual comparison.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

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
BASE_URL=http://your-application-url
```

## Project Structure

- `tests/` - Contains test files
- `utils/` - Utility functions and helpers
- `baseline/` - Baseline screenshots for comparison
- `diff/` - Generated diff images when tests fail

## Running Tests

- Run all tests:
```bash
npm test
```

- Run visual regression tests:
```bash
npm run test:visual
```

- Run tests in UI mode:
```bash
npm run test:ui
```

- Run tests in debug mode:
```bash
npm run test:debug
```

- View test report:
```bash
npm run report
```

## Visual Comparison

The suite uses pixelmatch for visual comparison with the following features:
- Automatic baseline creation for new tests
- Configurable threshold for pixel differences
- Diff image generation for failed tests
- Support for multiple browsers (Chrome, Firefox, Safari)

## Best Practices

1. Keep baseline images in version control
2. Review and update baselines when UI changes are intentional
3. Use appropriate thresholds for different types of pages
4. Run tests in multiple browsers
5. Clean up old diff images regularly 