import { test, expect } from '@playwright/test';

test.describe('Products API Tests', () => {
  const baseUrl = 'https://automationexercise.com/api/productsList';

  test('GET /api/productsList should return 200 and products list', async ({ request }) => {
    const response = await request.get(baseUrl);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('responseCode', 200);
    expect(body).toHaveProperty('products');
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);

    const firstProduct = body.products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
  });

  test('POST /api/productsList should return 405', async ({ request }) => {
    const response = await request.post(baseUrl);

    expect(response.status()).toBe(200); // HTTP layer may still be 200 on this demo site

    const body = await response.json();

    expect(body).toHaveProperty('responseCode', 405);
    expect(body).toHaveProperty('message', 'This request method is not supported.');
  });
});