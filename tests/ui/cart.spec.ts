import { test, expect } from "@playwright/test";
import { CartPage } from "../../pages/CartPage";
import cartData from "../../test-data/cart.json";

test.describe("Cart UI Tests", () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await cartPage.gotoHomePage();
    await expect(page).toHaveTitle(/Automation Exercise/i);
  });

  test("Add products to cart", async () => {
    await cartPage.openProductsPage();

    await cartPage.hoverAndAddFirstProductToCart();
    await cartPage.clickContinueShopping();

    await cartPage.hoverAndAddSecondProductToCart();
    await cartPage.clickViewCartFromModal();

    await cartPage.verifyProductsAddedToCart(2);
    await cartPage.verifyCartRowHasData(0);
    await cartPage.verifyCartRowHasData(1);
  });

  test("Verify quantity in cart", async () => {
    await cartPage.openFirstProductDetail();
    await cartPage.setQuantity(cartData.expectedQuantity);
    await cartPage.addToCartFromDetailPage();
    await cartPage.clickViewCartFromModal();

    await cartPage.verifyProductsAddedToCart(1);
    await cartPage.verifyQuantityAtRow(0, cartData.expectedQuantity);
  });

  test("Remove product from cart", async () => {
    await cartPage.openProductsPage();

    await cartPage.hoverAndAddFirstProductToCart();
    await cartPage.clickViewCartFromModal();

    await cartPage.verifyProductsAddedToCart(1);

    await cartPage.removeFirstProductFromCart();
    await cartPage.verifyCartIsEmpty();
  });
});
