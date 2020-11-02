/// <reference types="cypress" />

export const selectors = {
	todoName: '[data-test="todo-name"]',
	todoDescription: '[data-test="todo-description"]',
	todoRemoveButton: '[data-test="todo-remove-button"]',
	createTodoNameInput: '[data-test="create-todo-name-input"]',
	createTodoDescriptionInput: '[data-test="create-todo-description-input"]',
	createTodoSubmitButton: '[data-test="create-todo-submit-button"]',
};

describe("Todos:", function() {
	beforeEach(function() {
		cy.route2("/graphql", (req) => {
			if (req.body.includes("listTodos")) {
				req.reply({ fixture: "graphql/todos.json" });
			}
		});

		cy.login();
		cy.visit("/");
	});

	it("allows user to view list of todos", () => {
		cy.get(selectors.todoName).should("have.length", 2);
		cy.get(selectors.todoName)
			.first()
			.contains("todo 1");
		cy.get(selectors.todoDescription)
			.first()
			.contains("some todo");
	});

	it("allows user to create a new todo", () => {
		cy.get(selectors.todoName).should("have.length", 2);

		const name = "new todo";
		const description = "new todo description";
		cy.get(selectors.createTodoNameInput).type(name);
		cy.get(selectors.createTodoDescriptionInput).type(description);
		cy.get(selectors.createTodoSubmitButton).click();

		cy.get(selectors.todoName).should("have.length", 3);
		cy.get(selectors.todoName)
			.eq(2)
			.contains(name);
		cy.get(selectors.todoDescription)
			.eq(2)
			.contains(description);
	});

	it("allows user to remove a todo", () => {
		cy.get(selectors.todoName).should("have.length", 2);
		cy.get(selectors.todoName)
			.first()
			.contains("todo 1");

		cy.get(selectors.todoRemoveButton)
			.first()
			.click();

		cy.get(selectors.todoName).should("have.length", 1);
		cy.get(selectors.todoName)
			.first()
			.contains("todo 2");
	});
});
