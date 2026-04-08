import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  // Top navigation
  readonly productsMenu: Locator;
  readonly cartMenu: Locator;

  // Product list / home / products page
  readonly productCards: Locator;
  readonly firstProductCard: Locator;
  readonly secondProductCard: Locator;
  readonly firstAddToCartButton: Locator;
  readonly secondAddToCartButton: Locator;
  readonly firstViewProductButton: Locator;

  // Modal after add to cart
  readonly continueShoppingButton: Locator;
  readonly viewCartLinkInModal: Locator;
  readonly addedModal: Locator;

  // Product detail page
  readonly quantityInput: Locator;
  readonly addToCartOnDetailButton: Locator;

  // Cart page
  readonly cartTableRows: Locator;
  readonly deleteItemButtons: Locator;
  readonly emptyCartText: Locator;

  constructor(page: Page) {
    this.page = page;

    // navigation
    this.productsMenu = page.getByRole('link', { name: 'Products' });
    this.cartMenu = page.getByRole('link', { name: 'Cart' });

    // product listing
    this.productCards = page.locator('.features_items .product-image-wrapper');
    this.firstProductCard = this.productCards.nth(0);
    this.secondProductCard = this.productCards.nth(1);

    // add to cart buttons in overlay after hover
    this.firstAddToCartButton = this.firstProductCard.locator('.overlay-content a.add-to-cart');
    this.secondAddToCartButton = this.secondProductCard.locator('.overlay-content a.add-to-cart');

    // view product
    this.firstViewProductButton = page.locator('a[href*="/product_details/"]').first();

    // modal
    this.addedModal = page.locator('#cartModal');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartLinkInModal = this.addedModal.getByRole('link', { name: 'View Cart' });

    // detail page
    this.quantityInput = page.locator('#quantity');
    this.addToCartOnDetailButton = page.getByRole('button', { name: /add to cart/i });

    // cart page
    this.cartTableRows = page.locator('#cart_info_table tbody tr');
    this.deleteItemButtons = page.locator('.cart_quantity_delete');
    this.emptyCartText = page.getByText('Cart is empty!');
  }

  async gotoHomePage() {
    await this.page.goto('https://automationexercise.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async openProductsPage() {
    await this.productsMenu.click();
    await expect(this.page).toHaveURL(/.*products/, { timeout: 10000 });
    await expect(this.productCards.first()).toBeVisible({ timeout: 10000 });
  }

  async openCartPage() {
    await this.cartMenu.click();
    await expect(this.page).toHaveURL(/.*view_cart/, { timeout: 10000 });
  }

  async hoverAndAddFirstProductToCart() {
    await this.firstProductCard.scrollIntoViewIfNeeded();
    await expect(this.firstProductCard).toBeVisible({ timeout: 10000 });

    await this.firstProductCard.hover();
    await expect(this.firstAddToCartButton).toBeVisible({ timeout: 10000 });

    await this.firstAddToCartButton.click();
    await expect(this.addedModal).toBeVisible({ timeout: 10000 });
  }

  async hoverAndAddSecondProductToCart() {
    await this.secondProductCard.scrollIntoViewIfNeeded();
    await expect(this.secondProductCard).toBeVisible({ timeout: 10000 });

    await this.secondProductCard.hover();
    await expect(this.secondAddToCartButton).toBeVisible({ timeout: 10000 });

    await this.secondAddToCartButton.click();
    await expect(this.addedModal).toBeVisible({ timeout: 10000 });
  }

  async clickContinueShopping() {
    await expect(this.continueShoppingButton).toBeVisible({ timeout: 10000 });
    await this.continueShoppingButton.click();
    await expect(this.addedModal).toBeHidden({ timeout: 10000 });
  }

  async clickViewCartFromModal() {
    await expect(this.viewCartLinkInModal).toBeVisible({ timeout: 10000 });
    await this.viewCartLinkInModal.click();
    await expect(this.page).toHaveURL(/.*view_cart/, { timeout: 10000 });
  }

  async verifyProductsAddedToCart(count: number) {
    await expect(this.cartTableRows).toHaveCount(count, { timeout: 10000 });
  }

  async verifyCartRowHasData(rowIndex: number) {
    const row = this.cartTableRows.nth(rowIndex);

    await expect(row.locator('.cart_description')).toBeVisible({ timeout: 10000 });
    await expect(row.locator('.cart_price')).toBeVisible({ timeout: 10000 });
    await expect(row.locator('.cart_quantity')).toBeVisible({ timeout: 10000 });
    await expect(row.locator('.cart_total')).toBeVisible({ timeout: 10000 });
  }

  async verifyQuantityAtRow(rowIndex: number, expectedQuantity: string) {
    const row = this.cartTableRows.nth(rowIndex);
    await expect(row.locator('.cart_quantity button')).toHaveText(expectedQuantity, {
      timeout: 10000
    });
  }

  async openFirstProductDetail() {
    await this.firstViewProductButton.scrollIntoViewIfNeeded();
    await expect(this.firstViewProductButton).toBeVisible({ timeout: 10000 });
    await this.firstViewProductButton.click();
    await expect(this.page).toHaveURL(/.*product_details.*/, { timeout: 10000 });
  }

  async setQuantity(quantity: string) {
    await expect(this.quantityInput).toBeVisible({ timeout: 10000 });
    await this.quantityInput.fill(quantity);
  }

  async addToCartFromDetailPage() {
    await expect(this.addToCartOnDetailButton).toBeVisible({ timeout: 10000 });
    await this.addToCartOnDetailButton.click();
    await expect(this.addedModal).toBeVisible({ timeout: 10000 });
  }

  async removeFirstProductFromCart() {
    await expect(this.deleteItemButtons.first()).toBeVisible({ timeout: 10000 });
    await this.deleteItemButtons.first().click();
  }

  async verifyCartHasFewerItemsThan(previousCount: number) {
    await expect(this.cartTableRows).toHaveCount(previousCount - 1, { timeout: 10000 });
  }

  async verifyCartIsEmpty() {
    await expect(this.emptyCartText).toBeVisible({ timeout: 10000 });
  }
}