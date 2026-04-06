# Test Cases - Automation Exercise QA Project

## Test Case List

| TC ID | Module | Test Scenario | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|------|--------|---------------|---------------|------------|-----------|-----------------|----------|
| TC_AUTH_01 | Authentication | Register new user successfully | User is on homepage | 1. Open homepage 2. Click `Signup / Login` 3. Enter name and new email 4. Click `Signup` 5. Fill required account information 6. Submit account creation | Name: Test User, Email: new random email | Account is created successfully and user is logged in | High |
| TC_AUTH_02 | Authentication | Login with correct email and password | Valid account already exists | 1. Open homepage 2. Click `Signup / Login` 3. Enter valid email and password 4. Click `Login` | Valid email / valid password | User logs in successfully and `Logged in as username` is visible | High |
| TC_AUTH_03 | Authentication | Login with incorrect email and password | User is on login page | 1. Open homepage 2. Click `Signup / Login` 3. Enter invalid email and password 4. Click `Login` | Invalid email / invalid password | Error message is displayed and login is not successful | High |
| TC_AUTH_04 | Authentication | Logout successfully | User is logged in | 1. Click `Logout` | N/A | User is redirected to login page | High |
| TC_AUTH_05 | Authentication | Register with existing email | Existing account email is available | 1. Open homepage 2. Click `Signup / Login` 3. Enter name and existing email 4. Click `Signup` | Existing email | Error message is displayed for already registered email | High |
| TC_PROD_01 | Products | Open All Products page | User is on homepage | 1. Click `Products` | N/A | User is navigated to `All Products` page and products list is visible | High |
| TC_PROD_02 | Products | Open first product detail page | Products page is opened | 1. Click `View Product` for first product | N/A | Product detail page is displayed with product information | High |
| TC_SEARCH_01 | Search | Search existing product | Products page is opened | 1. Enter product keyword into search input 2. Click search button | `top` | `SEARCHED PRODUCTS` is displayed and related products are shown | High |
| TC_SEARCH_02 | Search | Search non-existing product | Products page is opened | 1. Enter non-existing keyword 2. Click search button | `abcxyz999` | No related products are displayed | Medium |
| TC_SEARCH_03 | Search | Search with empty keyword | Products page is opened | 1. Leave search input empty 2. Click search button | Empty | System handles empty input without crash; result behavior is captured | Low |
| TC_CART_01 | Cart | Add one product to cart | User is on homepage or products page | 1. Hover over a product 2. Click `Add to cart` 3. Click `View Cart` | Any available product | Product is added and visible in cart | High |
| TC_CART_02 | Cart | Add two products to cart | User is on products page | 1. Add first product 2. Click `Continue Shopping` 3. Add second product 4. Click `View Cart` | Any 2 available products | Both products are displayed in cart | High |
| TC_CART_03 | Cart | Verify product quantity in cart | Product detail page is opened | 1. Increase quantity to 4 2. Click `Add to cart` 3. Open cart | Quantity = 4 | Product is displayed in cart with exact quantity | High |
| TC_CART_04 | Cart | Remove product from cart | Cart contains at least one product | 1. Open cart page 2. Click remove (`X`) button for a product | N/A | Selected product is removed from cart | High |
| TC_CHECKOUT_01 | Checkout | Proceed to checkout after adding product | Cart contains at least one product | 1. Open cart page 2. Click `Proceed To Checkout` | N/A | User is navigated to checkout flow or prompted to register/login depending on state | High |
| TC_API_01 | API | Get all products list | API endpoint is accessible | 1. Send GET request to `/api/productsList` | N/A | Response code is `200` and products list is returned | High |
| TC_API_02 | API | POST to all products list | API endpoint is accessible | 1. Send POST request to `/api/productsList` | N/A | Response code is `405` and unsupported method message is returned | Medium |
| TC_API_03 | API | Get all brands list | API endpoint is accessible | 1. Send GET request to `/api/brandsList` | N/A | Response code is `200` and brands list is returned | High |
| TC_API_04 | API | Search product API with valid keyword | API endpoint is accessible | 1. Send POST request to `/api/searchProduct` with `search_product` | `top` | Response code is `200` and searched products list is returned | High |
| TC_API_05 | API | Search product API without required parameter | API endpoint is accessible | 1. Send POST request to `/api/searchProduct` without `search_product` | Missing parameter | Response code is `400` and bad request message is returned | High |
| TC_API_06 | API | Verify login API with valid credentials | Valid account exists | 1. Send POST request to `/api/verifyLogin` with email and password | Valid email / password | Response code is `200` and message indicates user exists | High |
| TC_API_07 | API | Verify login API with invalid credentials | API endpoint is accessible | 1. Send POST request to `/api/verifyLogin` with invalid email/password | Invalid email / password | Response code is `404` and user not found message is returned | High |
| TC_API_08 | API | Delete request to verify login endpoint | API endpoint is accessible | 1. Send DELETE request to `/api/verifyLogin` | N/A | Response code is `405` and unsupported method message is returned | Medium |

---

## Notes
- Test data for valid login should be prepared in advance.
- For register test cases, use a random email to avoid duplication.
- For API tests involving account creation or deletion, use dedicated test data to avoid conflicts.