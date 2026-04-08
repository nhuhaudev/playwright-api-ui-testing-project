import { test, expect } from '@playwright/test';

test.describe('Search Product API Tests', () => {
  const baseUrl = 'https://automationexercise.com/api/searchProduct';

  test('POST /api/searchProduct with valid search_product should return 200', async ({ request }) => {
    const response = await request.post(baseUrl, {
      form: {
        search_product: 'top'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('responseCode', 200);
    expect(body).toHaveProperty('products');
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('POST /api/searchProduct without search_product should return 400', async ({ request }) => {
    const response = await request.post(baseUrl, {
      form: {}
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('responseCode', 400);
    expect(body).toHaveProperty(
      'message',
      'Bad request, search_product parameter is missing in POST request.'
    );
  });
});