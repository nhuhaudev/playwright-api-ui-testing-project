import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  readonly productsMenu: Locator;
  readonly cartMenu: Locator;

  readonly allProductsTitle: Locator;
  readonly productsContainer: Locator;

  readonly productCards: Locator;
  readonly firstProductCard: Locator;
  readonly secondProductCard: Locator;

  readonly firstAddToCartButton: Locator;
  readonly secondAddToCartButton: Locator;
  readonly firstViewProductButton: Locator;

  readonly addedModal: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLinkInModal: Locator;

  readonly quantityInput: Locator;
  readonly addToCartOnDetailButton: Locator;

  readonly cartTableRows: Locator;
  readonly deleteItemButtons: Locator;
  readonly emptyCartText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productsMenu = page.getByRole("link", { name: "Products" });
    this.cartMenu = page.getByRole("link", { name: "Cart" });

    this.allProductsTitle = page.getByText("All Products");
    this.productsContainer = page.locator(".features_items");

    this.productCards = page.locator(".product-image-wrapper");
    this.firstProductCard = this.productCards.nth(0);
    this.secondProductCard = this.productCards.nth(1);

    this.firstAddToCartButton = this.firstProductCard.locator(
      ".overlay-content a.add-to-cart",
    );
    this.secondAddToCartButton = this.secondProductCard.locator(
      ".overlay-content a.add-to-cart",
    );

    this.firstViewProductButton = page
      .locator('a[href*="/product_details/"]')
      .first();

    this.addedModal = page.locator("#cartModal");
    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.viewCartLinkInModal = this.addedModal.getByRole("link", {
      name: "View Cart",
    });

    this.quantityInput = page.locator("#quantity");
    this.addToCartOnDetailButton = page.getByRole("button", {
      name: /add to cart/i,
    });

    this.cartTableRows = page.locator("#cart_info_table tbody tr");
    this.deleteItemButtons = page.locator(".cart_quantity_delete");
    this.emptyCartText = page.getByText("Cart is empty!");
  }

  async gotoHomePage() {
    await this.page.goto("https://automationexercise.com/", {
      waitUntil: "domcontentloaded",
    });
  }

  async openProductsPage() {
    await this.productsMenu.click();
    await expect(this.page).toHaveURL(/.*products/);
    await expect(this.allProductsTitle).toBeVisible();
    await expect(this.productsContainer).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }

  async openCartPage() {
    await this.cartMenu.click();
    await expect(this.page).toHaveURL(/.*view_cart/);
  }

  async hoverAndAddFirstProductToCart() {
    await this.firstProductCard.scrollIntoViewIfNeeded();
    await expect(this.firstProductCard).toBeVisible();

    await this.firstProductCard.hover();

    await expect(this.firstAddToCartButton).toBeVisible();

    await this.firstAddToCartButton.click();

    await expect(this.addedModal).toBeVisible();
  }

  async hoverAndAddSecondProductToCart() {
    await this.secondProductCard.scrollIntoViewIfNeeded();
    await expect(this.secondProductCard).toBeVisible();

    await this.secondProductCard.hover();
    await expect(this.secondAddToCartButton).toBeVisible();

    await this.secondAddToCartButton.click();
    await expect(this.addedModal).toBeVisible();
  }

  async clickContinueShopping() {
    await expect(this.continueShoppingButton).toBeVisible();
    await this.continueShoppingButton.click();

    await expect(this.addedModal).toBeHidden();
  }

  async clickViewCartFromModal() {
    await expect(this.viewCartLinkInModal).toBeVisible();
    await this.viewCartLinkInModal.click();

    await expect(this.page).toHaveURL(/.*view_cart/);
    await expect(this.cartTableRows.first()).toBeVisible();
  }

  async verifyProductsAddedToCart(count: number) {
    await expect(this.cartTableRows).toHaveCount(count);
  }

  async verifyCartRowHasData(rowIndex: number) {
    const row = this.cartTableRows.nth(rowIndex);

    await expect(row.locator(".cart_description")).toBeVisible();
    await expect(row.locator(".cart_price")).toBeVisible();
    await expect(row.locator(".cart_quantity")).toBeVisible();
    await expect(row.locator(".cart_total")).toBeVisible();
  }

  async verifyQuantityAtRow(rowIndex: number, expectedQuantity: string) {
    const row = this.cartTableRows.nth(rowIndex);

    await expect(row.locator(".cart_quantity button")).toHaveText(
      expectedQuantity,
    );
  }

  async openFirstProductDetail() {
    await this.firstViewProductButton.scrollIntoViewIfNeeded();
    await expect(this.firstViewProductButton).toBeVisible();

    await this.firstViewProductButton.click();
    await expect(this.page).toHaveURL(/.*product_details/);
  }

  async setQuantity(quantity: string) {
    await expect(this.quantityInput).toBeVisible();
    await this.quantityInput.fill(quantity);
  }

  async addToCartFromDetailPage() {
    await expect(this.addToCartOnDetailButton).toBeVisible();
    await this.addToCartOnDetailButton.click();

    await expect(this.addedModal).toBeVisible();
  }

  async removeFirstProductFromCart() {
    const firstRow = this.cartTableRows.first();

    await expect(firstRow).toBeVisible();
    await expect(this.deleteItemButtons.first()).toBeVisible();

    await this.deleteItemButtons.first().click();

    await expect(firstRow).toBeHidden();
  }

  async verifyCartIsEmpty() {
    await expect(this.emptyCartText).toBeVisible();
  }
}
