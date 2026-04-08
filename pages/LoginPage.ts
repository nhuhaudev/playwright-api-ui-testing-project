import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // Navigation / common
  readonly signupLoginMenu: Locator;
  readonly loggedInAsText: Locator;
  readonly logoutButton: Locator;

  // Login section
  readonly loginTitle: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  // Signup section
  readonly signupTitle: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly signupErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // top menu
    this.signupLoginMenu = page.getByRole('link', { name: 'Signup / Login' });
    this.loggedInAsText = page.locator('a:has-text("Logged in as")');
    this.logoutButton = page.getByRole('link', { name: 'Logout' });

    // login section
    this.loginTitle = page.getByText('Login to your account');
    this.loginEmailInput = page.locator('form').filter({ hasText: 'Login' }).locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMessage = page.getByText('Your email or password is incorrect!');

    // signup section
    this.signupTitle = page.getByText('New User Signup!');
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.signupErrorMessage = page.getByText('Email Address already exist!');
  }

async gotoHomePage() {
  await this.page.goto('https://automationexercise.com/', {
    waitUntil: 'domcontentloaded'
  });
}

  async openLoginPage() {
    await this.signupLoginMenu.click();
  }

  async verifyLoginPageLoaded() {
    await expect(this.loginTitle).toBeVisible();
    await expect(this.signupTitle).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async signup(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async verifyLoggedIn() {
    await expect(this.loggedInAsText).toBeVisible();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async verifyInvalidLoginError() {
    await expect(this.loginErrorMessage).toBeVisible();
  }

  async verifyExistingEmailError() {
    await expect(this.signupErrorMessage).toBeVisible();
  }

  async verifyNavigatedToLoginPage() {
    await expect(this.page).toHaveURL(/.*login/);
    await expect(this.loginTitle).toBeVisible();
  }
}