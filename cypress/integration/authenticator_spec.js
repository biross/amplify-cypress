export const selectors = {
	// Auth component classes
	usernameInput: '[data-test="username-input"]',
	signInPasswordInput: '[data-test="sign-in-password-input"]',
	signInSignInButton: '[data-test="sign-in-sign-in-button"]',
	signOutButton: '[data-test="sign-out-button"]',
};

describe("Authenticator:", function() {
	const test_username = "test1";
	const test_password = "password13!";

	// Step 1: setup the application state
	beforeEach(function() {
		cy.visit("/");
	});

	describe("Sign In:", () => {
		it("allows a user to signin", () => {
			// Step 2: Take an action (Sign in)
			cy.get(selectors.usernameInput).type(test_username);
			cy.get(selectors.signInPasswordInput).type(test_password);
			cy.get(selectors.signInSignInButton)
				.contains("Sign In")
				.click();

			// Step 3: Make an assertion (Check for sign-out text)
			cy.get(selectors.signOutButton).contains("Sign Out");
		});
	});
});
