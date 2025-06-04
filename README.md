# Pippa Automation Framework

A comprehensive test automation framework for the Pippa project, including multiple testing suites for different purposes.

## Project Structure

```
Pippa-Automation/
├── Artirally-Load/                 # Load Testing Suite
│   ├── README.md
│   ├── package.json
│   ├── config/
│   │   └── environment.js
│   └── scenarios/
│       ├── api/
│       │   └── smoke.js
│       └── web/
│           └── load.js
│
├── K6/                            # K6 Performance Testing Suite
│   ├── README.md
│   ├── package.json
│   ├── config/
│   │   └── environment.js
│   └── scenarios/
│       ├── api/
│       │   └── smoke.js
│       └── web/
│           └── load.js
│
├── GUI-Regression/                # GUI Regression Testing Suite
│   ├── README.md
│   ├── package.json
│   ├── playwright.config.ts
│   └── tests/
│       ├── pages/
│       │   ├── BasePage.ts
│       │   └── components/
│       ├── regression/
│       └── utils/
│           └── visualComparison.ts
│
├── API-Playwright/               # API Testing Suite
│   ├── README.md
│   ├── package.json
│   ├── cucumber.js
│   └── features/
│       ├── api/
│       │   └── user-api.feature
│       ├── step-definitions/
│       │   └── api.steps.ts
│       └── support/
│           ├── world.ts
│           └── hooks.ts
│
├── Sanity/                       # Sanity Testing Suite
│   ├── README.md
│   ├── package.json
│   ├── cucumber.js
│   └── features/
│       ├── step-definitions/
│       │   └── login.steps.ts
│       └── support/
│           ├── world.ts
│           └── hooks.ts
│
└── Smoke-Journey/               # Smoke Testing Suite
    ├── README.md
    ├── package.json
    ├── playwright.config.ts
    └── tests/
        ├── pages/
        │   ├── BasePage.ts
        │   └── LoginPage.ts
        └── smoke/
            └── login.spec.ts
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Java JDK (for any Java-based tests)
- Python (if required by specific test suites)
- Docker (for containerized testing)

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd Pippa-Automation
```

2. Install dependencies for each test suite:
```bash
# For API-Playwright
cd API-Playwright
npm install

# For GUI-Regression
cd ../GUI-Regression
npm install

# For Smoke-Journey
cd ../Smoke-Journey
npm install

# For Sanity
cd ../Sanity
npm install

# For Artirally-Load
cd ../Artirally-Load
npm install

# For K6
cd ../K6
npm install
```

3. Install required browsers and tools:
```bash
# Install Playwright browsers
npx playwright install

# Install K6 (macOS)
brew install k6

# Install K6 (Windows)
choco install k6

# Or using Docker for K6
docker pull grafana/k6
```

4. Create environment files:
```bash
# Create .env files in each test suite directory
cp .env.example .env
```

## Running Tests

Each test suite has its own configuration and execution instructions. Please refer to the README files within each directory for specific instructions.

### Common Commands

```bash
# API Tests
cd API-Playwright
npm test

# GUI Regression Tests
cd GUI-Regression
npm test

# Smoke Tests
cd Smoke-Journey
npm test

# Sanity Tests
cd Sanity
npm test

# Load Tests
cd Artirally-Load
npm test

# Performance Tests
cd K6
npm test
```

## Test Suite Details

### 1. API-Playwright
- API testing using Playwright and Cucumber
- BDD approach with Gherkin syntax
- Support for parallel execution
- HTML and JSON reporting

### 2. GUI-Regression
- UI testing using Playwright
- Visual regression testing
- Page Object Model pattern
- Cross-browser testing

### 3. Smoke-Journey
- Critical path testing
- Quick validation of core features
- TypeScript implementation
- Page Object Model pattern

### 4. Sanity
- Basic functionality testing
- Cucumber BDD implementation
- Step definitions for common actions
- Environment-specific configurations

### 5. Artirally-Load
- Load testing scenarios
- API and web application testing
- Configurable user loads
- Performance metrics collection

### 6. K6
- Performance testing suite
- API and web load testing
- Custom metrics and thresholds
- Docker support

## Best Practices

1. Use appropriate test suite for each testing need
2. Follow the Page Object Model pattern
3. Keep tests independent and atomic
4. Use environment variables for configuration
5. Implement proper cleanup after tests
6. Use meaningful test descriptions
7. Tag tests appropriately
8. Maintain test documentation
9. Regular test maintenance
10. Version control best practices

## Contributing

1. Create a new branch for your feature
2. Follow the existing code structure
3. Add appropriate documentation
4. Submit a pull request

## License

[Add appropriate license information] 

## K6 Installation

# For macOS
brew install k6

# For Windows
choco install k6

# Or using Docker
docker pull grafana/k6 

K6/
├── README.md
├── package.json
├── config/
│   └── environment.js
└── scenarios/
    ├── api/
    │   └── smoke.js
    └── web/
        └── load.js 