# Bug Report / Observation Report - Automation Exercise QA Project

## Report Overview
This file records defects, observations, and possible improvement points found during manual exploration of the Automation Exercise website.

---

## BUG-001
**Title:** Empty search input does not provide clear validation feedback  
**Module:** Search  
**Severity:** Low  
**Priority:** Medium  
**Type:** Observation / UX Improvement  
**Environment:** Windows, Chromium, https://automationexercise.com/

### Preconditions
- User is on the `Products` page.

### Steps to Reproduce
1. Open homepage.
2. Click `Products`.
3. Leave the search input empty.
4. Click the search button.

### Actual Result
The system allows the action without a clear validation message for empty input.

### Expected Result
The system should display a clear validation message such as:
- `Please enter a product keyword`
or
- prevent the action when the input is empty.

### Status
Open

---

## BUG-002
**Title:** Invalid login error handling could be more user-friendly  
**Module:** Authentication  
**Severity:** Low  
**Priority:** Low  
**Type:** Improvement Suggestion  
**Environment:** Windows, Chromium, https://automationexercise.com/

### Preconditions
- User is on the `Signup / Login` page.

### Steps to Reproduce
1. Open homepage.
2. Click `Signup / Login`.
3. Enter invalid email and/or password.
4. Click `Login`.

### Actual Result
An error message is shown, but the feedback can still be improved in terms of wording and emphasis.

### Expected Result
The system should provide clearer, more user-friendly, and more visually noticeable feedback for login failure.

### Status
Open

---

## BUG-003
**Title:** Cart item removal flow provides limited visual confirmation  
**Module:** Cart  
**Severity:** Low  
**Priority:** Low  
**Type:** UX Improvement  
**Environment:** Windows, Chromium, https://automationexercise.com/

### Preconditions
- Cart contains at least one product.

### Steps to Reproduce
1. Add a product to cart.
2. Open cart page.
3. Click the remove (`X`) button.

### Actual Result
The product is removed, but the system provides minimal confirmation feedback.

### Expected Result
The system should provide clearer user feedback after removal, such as:
- a toast message,
- a short success confirmation,
- or stronger cart update indication.

### Status
Open

---

## BUG-004
**Title:** Demo site data dependency may affect repeatability of account-related tests  
**Module:** Authentication / Test Data  
**Severity:** Medium  
**Priority:** Medium  
**Type:** Test Execution Risk  
**Environment:** Windows, Chromium, https://automationexercise.com/

### Preconditions
- User attempts repeated registration/login test with reused credentials.

### Steps to Reproduce
1. Register with an email address.
2. Re-run the same registration test with the same email.

### Actual Result
The test may fail because the email already exists from a previous run.

### Expected Result
Test execution should use controlled test data, such as:
- random emails for registration,
- dedicated static credentials for login,
- cleanup flow after account creation.

### Status
Open / Testing Note

---

## Summary
Most findings in this project are low-severity usability or test-data observations.  
These findings are still useful because they demonstrate:
- bug reporting structure,
- expected vs actual result thinking,
- tester attention to UX and repeatability.