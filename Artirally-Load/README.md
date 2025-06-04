# Artirally Load Testing Suite

This directory contains the load testing suite for the Pippa project using Artillery.io.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Setup

1. Install Artillery globally:
```bash
npm install -g artillery
```

2. Install project dependencies:
```bash
npm install
```

## Project Structure

- `scenarios/` - Contains load test scenarios
- `config/` - Configuration files for different environments
- `reports/` - Generated test reports
- `package.json` - Project dependencies and scripts

## Running Tests

- Run all load tests:
```bash
npm run test:load
```

- Run specific scenario:
```bash
artillery run scenarios/your-scenario.yml
```

- Generate HTML report:
```bash
artillery run --output reports/report.json scenarios/your-scenario.yml
artillery report reports/report.json
```

## Configuration

Create a `config/environment.json` file with your environment variables:
```json
{
  "dev": {
    "baseUrl": "http://localhost:3000",
    "apiKey": "your-api-key"
  },
  "staging": {
    "baseUrl": "https://staging-api.example.com",
    "apiKey": "your-staging-api-key"
  }
}
```

## Best Practices

1. Keep scenarios focused and specific
2. Use environment variables for configuration
3. Generate and review reports after each test run
4. Monitor system resources during load tests
5. Start with small load and gradually increase 