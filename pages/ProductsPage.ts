import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;

  // Top navigation
  readonly productsMenu: Locator;

  // Products listing page
  readonly allProductsTitle: Locator;
  readonly productCards: Locator;
  readonly firstViewProductButton: Locator;

  // Search section
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsTitle: Locator;

  // Product detail page
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;

  constructor(page: Page) {
    this.page = page;

    // menu
    this.productsMenu = page.getByRole("link", { name: "Products" });

    // all products page
    this.allProductsTitle = page.getByText("All Products");
    this.productCards = page.locator(".features_items .product-image-wrapper");
    this.firstViewProductButton = page
      .locator('a[href*="/product_details/"]')
      .first();

    // search area
    this.searchInput = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");
    this.searchedProductsTitle = page.getByText("Searched Products");

    // product detail page
    this.productName = page.locator(".product-information h2");
    this.productCategory = page.locator(".product-information p").first();
    this.productPrice = page.locator(".product-information span span");
    this.productAvailability = page.getByText(/Availability:/i);
    this.productCondition = page.getByText(/Condition:/i);
    this.productBrand = page.getByText(/Brand:/i);
  }

  async gotoHomePage() {
    await this.page.goto("https://automationexercise.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
  }

  async openProductsPage() {
    await this.productsMenu.click();
  }

  async verifyAllProductsPageLoaded() {
    await expect(this.page).toHaveURL(/.*products/);
    await expect(this.allProductsTitle).toBeVisible();
  }

  async verifyProductsListVisible() {
    await expect(this.productCards.first()).toBeVisible();
    await expect(this.productCards).toHaveCount(
      await this.productCards.count(),
    );
  }

  async openFirstProductDetail() {
    await this.firstViewProductButton.click();
  }

  async verifyProductDetailPageLoaded() {
    await expect(this.page).toHaveURL(/.*product_details.*/);
    await expect(this.productName).toBeVisible();
    await expect(this.productCategory).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();
  }

  async searchProduct(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }

  async verifySearchedProductsVisible() {
    await expect(this.searchedProductsTitle).toBeVisible();
  }

  async verifySearchResultsContainKeyword(keyword: string) {
    const totalProducts = await this.productCards.count();
    expect(totalProducts).toBeGreaterThan(0);

    let found = false;

    for (let i = 0; i < totalProducts; i++) {
      const text = (await this.productCards.nth(i).innerText()).toLowerCase();
      if (text.includes(keyword.toLowerCase())) {
        found = true;
        break;
      }
    }

    expect(found).toBeTruthy();
  }

  async verifyNoSearchResultsOrEmptyState() {
    const totalProducts = await this.productCards.count();
    expect(totalProducts).toBe(0);
  }
}
