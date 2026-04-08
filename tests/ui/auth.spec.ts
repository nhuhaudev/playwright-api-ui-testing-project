import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../test-data/users.json';

test.describe('Authentication UI Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoHomePage();
    await expect(page).toHaveTitle(/Automation Exercise/i);
    await loginPage.openLoginPage();
    await loginPage.verifyLoginPageLoaded();
  });

  test('Login user with correct email and password', async ({ page }) => {
    await loginPage.login(users.validUser.email, users.validUser.password);

    await loginPage.verifyLoggedIn();
    await expect(page.locator('a:has-text("Logged in as")')).toContainText('Logged in as');
  });

  test('Login user with incorrect email and password', async () => {
    await loginPage.login(users.invalidUser.email, users.invalidUser.password);

    await loginPage.verifyInvalidLoginError();
  });

  test('Logout user successfully', async () => {
    await loginPage.login(users.validUser.email, users.validUser.password);
    await loginPage.verifyLoggedIn();

    await loginPage.logout();
    await loginPage.verifyNavigatedToLoginPage();
  });

  test('Register user with existing email', async () => {
    await loginPage.signup(
      users.existingSignupUser.name,
      users.existingSignupUser.email
    );

    await loginPage.verifyExistingEmailError();
  });
});