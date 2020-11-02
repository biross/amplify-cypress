/// <reference types="cypress" />

export const selectors = {
	// Auth component classes
	signInHeader: '[data-test="sign-in-header-section"]',
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

	it("allows a user to signin and out", () => {
		// Step 2: Take an action (Sign in)
		cy.get(selectors.usernameInput).type(test_username);
		cy.get(selectors.signInPasswordInput).type(test_password);
		cy.get(selectors.signInSignInButton)
			.contains("Sign In")
			.click();

		// Step 3: Make an assertion (Check for sign-out text)
		cy.get(selectors.signOutButton).contains("Sign Out");

		// Step 4: Take an action (Sign Out) and make an assertion
		cy.get(selectors.signOutButton).click();
		cy.get(selectors.signInHeader).contains("Sign in");
	});
});
