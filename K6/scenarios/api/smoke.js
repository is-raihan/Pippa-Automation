import http from 'k6/http';
import { check, sleep } from 'k6';
import { ENV, commonChecks } from '../../config/environment.js';

export const options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01']
  }
};

export default function() {
  // Health check
  const healthCheck = http.get(`${ENV.API_BASE_URL}/api/health`);
  commonChecks.statusIs200(healthCheck);
  sleep(1);

  // Login
  const loginPayload = JSON.stringify({
    username: ENV.TEST_USERNAME,
    password: ENV.TEST_PASSWORD
  });
  const loginResponse = http.post(`${ENV.API_BASE_URL}/api/login`, loginPayload, {
    headers: { 'Content-Type': 'application/json' }
  });
  commonChecks.statusIs200(loginResponse);
  sleep(1);

  // Get user profile
  const token = loginResponse.json('token');
  const profileResponse = http.get(`${ENV.API_BASE_URL}/api/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  commonChecks.statusIs200(profileResponse);
  sleep(1);
} 