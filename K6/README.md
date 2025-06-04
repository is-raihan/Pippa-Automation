# K6 Performance Testing Suite

This directory contains performance testing scripts for both API and website testing using K6.

## Prerequisites

- [K6](https://k6.io/docs/getting-started/installation) installed on your system
- Node.js (v16 or higher)
- npm or yarn

## Setup

1. Install K6:
```bash
# macOS
brew install k6

# Windows
choco install k6

# Docker
docker pull grafana/k6
```

2. Install project dependencies:
```bash
npm install
```

3. Create a `.env` file with your environment variables:
```
API_BASE_URL=http://your-api-url
WEB_BASE_URL=http://your-website-url
TEST_USERNAME=your_test_username
TEST_PASSWORD=your_test_password
API_KEY=your_api_key
```

## Project Structure

- `scenarios/` - Contains test scenarios
  - `api/` - API performance tests
  - `web/` - Website performance tests
- `config/` - Configuration files
  - `environment.js` - Environment variables and common settings

## Running Tests

### API Tests
- Run all API tests:
```bash
npm run test:api
```

- Run API smoke test:
```bash
npm run test:api:smoke
```

- Run API load test:
```bash
npm run test:api:load
```

- Run API stress test:
```bash
npm run test:api:stress
```

### Website Tests
- Run all website tests:
```bash
npm run test:web
```

- Run website smoke test:
```bash
npm run test:web:smoke
```

- Run website load test:
```bash
npm run test:web:load
```

- Run website stress test:
```bash
npm run test:web:stress
```

## Test Types

1. **Smoke Tests**
   - Basic functionality verification
   - Single virtual user
   - Short duration

2. **Load Tests**
   - Performance under expected load
   - Multiple virtual users
   - Extended duration

3. **Stress Tests**
   - System behavior under extreme conditions
   - High number of virtual users
   - Peak load simulation

## Best Practices

1. Start with smoke tests before running load tests
2. Monitor system resources during test execution
3. Use appropriate thresholds for different test types
4. Keep test data and environment variables separate
5. Review and update thresholds based on requirements 