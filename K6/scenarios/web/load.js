import http from 'k6/http';
import { check, sleep } from 'k6';
import { ENV, commonChecks } from '../../config/environment.js';

export const options = {
  scenarios: {
    load_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 50 },  // Ramp up to 50 users
        { duration: '3m', target: 50 },  // Stay at 50 users
        { duration: '1m', target: 0 }    // Ramp down to 0 users
      ],
      gracefulRampDown: '30s'
    }
  },
  thresholds: {
    http_req_duration: ['p(95)<1000'],  // 95% of requests should be below 1s
    http_req_failed: ['rate<0.01'],     // Less than 1% of requests should fail
    'http_req_duration{page:home}': ['p(95)<800'],
    'http_req_duration{page:login}': ['p(95)<1000'],
    'http_req_duration{page:dashboard}': ['p(95)<1200']
  }
};

export default function() {
  // Homepage
  const homeResponse = http.get(`${ENV.WEB_BASE_URL}/`, {
    tags: { page: 'home' }
  });
  commonChecks.statusIs200(homeResponse);
  sleep(2);

  // Login page
  const loginResponse = http.get(`${ENV.WEB_BASE_URL}/login`, {
    tags: { page: 'login' }
  });
  commonChecks.statusIs200(loginResponse);
  sleep(1);

  // Login action
  const loginPayload = JSON.stringify({
    username: ENV.TEST_USERNAME,
    password: ENV.TEST_PASSWORD
  });
  const loginActionResponse = http.post(`${ENV.WEB_BASE_URL}/api/login`, loginPayload, {
    headers: { 'Content-Type': 'application/json' },
    tags: { page: 'login' }
  });
  commonChecks.statusIs200(loginActionResponse);
  sleep(1);

  // Dashboard
  const token = loginActionResponse.json('token');
  const dashboardResponse = http.get(`${ENV.WEB_BASE_URL}/dashboard`, {
    headers: { 'Authorization': `Bearer ${token}` },
    tags: { page: 'dashboard' }
  });
  commonChecks.statusIs200(dashboardResponse);
  sleep(2);
} 