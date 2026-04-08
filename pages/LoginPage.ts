import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  readonly signupLoginMenu: Locator;
  readonly loggedInAsText: Locator;
  readonly logoutButton: Locator;

  readonly loginTitle: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  readonly signupTitle: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly signupErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signupLoginMenu = page.getByRole("link", { name: "Signup / Login" });
    this.loggedInAsText = page.locator('a:has-text("Logged in as")');
    this.logoutButton = page.getByRole("link", { name: "Logout" });

    this.loginTitle = page.getByRole("heading", {
      name: "Login to your account",
    });
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMessage = page.getByText(
      "Your email or password is incorrect!",
    );

    this.signupTitle = page.getByRole("heading", { name: "New User Signup!" });
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.signupErrorMessage = page.getByText("Email Address already exist!");
  }

  async gotoHomePage() {
    await this.page.goto("https://automationexercise.com/", {
      waitUntil: "domcontentloaded",
    });
  }

  async openLoginPage() {
    await this.signupLoginMenu.click();
    await expect(this.page).toHaveURL(/.*login/);
    await expect(this.loginTitle).toBeVisible();
  }

  async verifyLoginPageLoaded() {
    await expect(this.loginTitle).toBeVisible();
    await expect(this.signupTitle).toBeVisible();
  }

  async login(email: string, password: string) {
    await expect(this.loginEmailInput).toBeVisible();
    await expect(this.loginPasswordInput).toBeVisible();

    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async signup(name: string, email: string) {
    await expect(this.signupNameInput).toBeVisible();
    await expect(this.signupEmailInput).toBeVisible();

    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async verifyLoggedIn() {
    await expect(this.loggedInAsText).toBeVisible();
    await expect(this.loggedInAsText).toContainText("Logged in as");
    await expect(this.logoutButton).toBeVisible();
  }

  async logout() {
    await expect(this.logoutButton).toBeVisible();
    await this.logoutButton.click();
  }

  async verifyInvalidLoginError() {
    await expect(this.loginErrorMessage).toBeVisible();
  }

  async verifyExistingEmailError() {
    await expect(this.signupErrorMessage).toBeVisible();
  }

  async verifyNavigatedToLoginPage() {
    await expect(this.loginTitle).toBeVisible();
    await expect(this.signupTitle).toBeVisible();
  }
}
