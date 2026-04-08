import { test, expect } from '@playwright/test';

test.describe('Brands API Tests', () => {
  const baseUrl = 'https://automationexercise.com/api/brandsList';

  test('GET /api/brandsList should return 200 and brands list', async ({ request }) => {
    const response = await request.get(baseUrl);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('responseCode', 200);
    expect(body).toHaveProperty('brands');
    expect(Array.isArray(body.brands)).toBeTruthy();
    expect(body.brands.length).toBeGreaterThan(0);

    const firstBrand = body.brands[0];
    expect(firstBrand).toHaveProperty('id');
    expect(firstBrand).toHaveProperty('brand');
  });

  test('PUT /api/brandsList should return 405', async ({ request }) => {
    const response = await request.put(baseUrl);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('responseCode', 405);
    expect(body).toHaveProperty('message', 'This request method is not supported.');
  });
});