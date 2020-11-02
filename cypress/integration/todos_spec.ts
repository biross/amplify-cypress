/// <reference types="cypress" />

export const selectors = {
	todoName: '[data-test="todo-name"]',
	todoDescription: '[data-test="todo-description"]',
	todoRemoveButton: '[data-test="todo-remove-button"]',
};

describe("Todos:", function() {
	beforeEach(function() {
		// Login to application
		cy.login();

		// Navigate to todos page
		cy.visit("/");
	});

	it("allows user to view list of todos", () => {
		cy.get(selectors.todoName).should("have.length", 2);
	});
});
