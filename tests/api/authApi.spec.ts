import { test, expect } from '@playwright/test';
import users from '../../test-data/apiUsers.json';

test.describe('Auth API Tests', () => {
  const baseUrl = 'https://automationexercise.com/api/verifyLogin';

  test('POST /api/verifyLogin with valid details should return 200', async ({ request }) => {
    const response = await request.post(baseUrl, {
      form: {
        email: users.validUser.email,
        password: users.validUser.password
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('responseCode', 200);
    expect(body).toHaveProperty('message', 'User exists!');
  });

  test('POST /api/verifyLogin with invalid details should return 404', async ({ request }) => {
    const response = await request.post(baseUrl, {
      form: {
        email: users.invalidUser.email,
        password: users.invalidUser.password
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('responseCode', 404);
    expect(body).toHaveProperty('message', 'User not found!');
  });

  test('DELETE /api/verifyLogin should return 405', async ({ request }) => {
    const response = await request.delete(baseUrl);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('responseCode', 405);
    expect(body).toHaveProperty('message', 'This request method is not supported.');
  });

  test('POST /api/verifyLogin without email should return 400', async ({ request }) => {
    const response = await request.post(baseUrl, {
      form: {
        password: '123456'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('responseCode', 400);
    expect(body).toHaveProperty(
      'message',
      'Bad request, email or password parameter is missing in POST request.'
    );
  });
});