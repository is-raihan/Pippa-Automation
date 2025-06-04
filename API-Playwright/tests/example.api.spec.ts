import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  test('should return 200 OK for health check', async ({ request }) => {
    const response = await request.get('/health');
    expect(response.status()).toBe(200);
  });

  test('should handle authentication', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: {
        username: 'testuser',
        password: 'testpass'
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('token');
  });
}); 