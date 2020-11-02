// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import Amplify, { Auth } from "aws-amplify";
import awsExports from "../../src/aws-exports";

Amplify.configure(awsExports);

Cypress.Commands.add("login", async () => {
	try {
		await Auth.signIn(Cypress.env("username"), Cypress.env("password"));
	} catch (error) {
		console.log("error signing in", error);
	}
});
