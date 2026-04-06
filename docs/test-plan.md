# Test Plan - Automation Exercise QA Project

## 1. Objective
This project aims to test the main functionalities of the Automation Exercise website for learning and portfolio purposes.

The project demonstrates:
- Manual testing
- UI automation testing
- API testing

## 2. Application Under Test
- Website: https://automationexercise.com/
- Domain type: E-commerce practice website for automation engineers

## 3. Scope
The testing scope includes the following modules:

### 3.1 Authentication
- Register user
- Login with valid credentials
- Login with invalid credentials
- Logout
- Register with existing email

### 3.2 Products
- View all products
- View product detail page

### 3.3 Search
- Search existing product
- Search with invalid keyword
- Search with empty keyword

### 3.4 Cart
- Add product to cart
- Add multiple products to cart
- Verify quantity in cart
- Remove product from cart

### 3.5 Checkout
- Proceed to checkout
- Verify user flow before checkout

### 3.6 API Testing
- Get all products list
- Get all brands list
- Search product API
- Verify login API
- Create account API
- Delete account API

## 4. Out of Scope
The following items are not covered in this mini project:
- Performance testing
- Security testing
- Cross-browser deep compatibility testing
- Database validation
- Mobile app testing
- Payment gateway real transaction validation

## 5. Features to Be Tested
The following features are planned to be tested:

- User can open homepage successfully
- User can navigate to Signup / Login page
- User can log in with correct email and password
- User sees error message with incorrect credentials
- User can log out successfully
- User can open Products page
- User can open product detail page
- User can search products
- User can add product(s) to cart
- User can verify quantity and total in cart
- User can remove product from cart
- API endpoints return expected status codes and messages

## 6. Test Types
This project covers:
- Manual Testing
- Functional Testing
- Positive Testing
- Negative Testing
- UI Automation Testing
- API Testing

## 7. Test Environment
- Website URL: https://automationexercise.com/
- Browser for automation: Chromium
- Tool: Playwright
- Language: TypeScript
- IDE: Visual Studio Code
- Operating System: Windows

## 8. Entry Criteria
Testing can start when:
- The website is accessible
- The test environment is ready
- Playwright is installed successfully
- Test data is available
- Required project folders and files are created

## 9. Exit Criteria
Testing can be considered complete when:
- Planned manual test cases are documented
- Core UI automation scripts are implemented
- Core API test scripts are implemented
- Test execution results are reviewed
- Bugs / observations are documented
- README is updated

## 10. Risks
Potential risks in this project:
- Demo website data may change
- Existing account data may already be used
- UI locators may change and break automation scripts
- Network issues may affect test execution
- Some demo behaviors may not be fully stable

## 11. Deliverables
The final project deliverables include:
- Test plan
- Test cases
- Bug report / observation report
- UI automation scripts
- API test scripts
- Test data files
- README documentation