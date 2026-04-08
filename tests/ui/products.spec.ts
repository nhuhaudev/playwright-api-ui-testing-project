import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import productData from '../../test-data/products.json';

test.describe('Products and Search UI Tests', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.gotoHomePage();
    await expect(page).toHaveTitle(/Automation Exercise/i);
    await productsPage.openProductsPage();
    await productsPage.verifyAllProductsPageLoaded();
  });

  test('Verify all products page opens', async () => {
    await productsPage.verifyProductsListVisible();
  });

  test('Verify first product detail page', async () => {
    await productsPage.verifyProductsListVisible();
    await productsPage.openFirstProductDetail();
    await productsPage.verifyProductDetailPageLoaded();
  });

  test('Search existing product', async () => {
    await productsPage.searchProduct(productData.existingKeyword);
    await productsPage.verifySearchedProductsVisible();
    await productsPage.verifySearchResultsContainKeyword(productData.existingKeyword);
  });

  test('Search non-existing product', async () => {
    await productsPage.searchProduct(productData.nonExistingKeyword);
    await productsPage.verifySearchedProductsVisible();
    await productsPage.verifyNoSearchResultsOrEmptyState();
  });
});