import { check } from 'k6';
import { SharedArray } from 'k6/data';

export const ENV = {
  API_BASE_URL: __ENV.API_BASE_URL || 'http://localhost:3000',
  WEB_BASE_URL: __ENV.WEB_BASE_URL || 'http://localhost:8080',
  TEST_USERNAME: __ENV.TEST_USERNAME || 'testuser',
  TEST_PASSWORD: __ENV.TEST_PASSWORD || 'testpass',
  API_KEY: __ENV.API_KEY || 'your-api-key'
};

export const THRESHOLDS = {
  http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
  http_req_failed: ['rate<0.01'],   // Less than 1% of requests should fail
  iteration_duration: ['p(95)<1000'] // 95% of iterations should be below 1s
};

export const OPTIONS = {
  scenarios: {
    default: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 20 },  // Ramp up to 20 users
        { duration: '1m', target: 20 },   // Stay at 20 users
        { duration: '30s', target: 0 }    // Ramp down to 0 users
      ],
      gracefulRampDown: '30s'
    }
  },
  thresholds: THRESHOLDS
};

// Common check functions
export const commonChecks = {
  statusIs200: (response) => check(response, {
    'status is 200': (r) => r.status === 200
  }),
  responseTimeOk: (response) => check(response, {
    'response time < 500ms': (r) => r.timings.duration < 500
  })
}; 