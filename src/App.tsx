/* src/App.js */
import React, { CSSProperties } from "react";
import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";

import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodosList";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = () => {
	return (
		<div style={styles.container}>
			<h2 style={styles.title}>Add a Todo!</h2>
			<CreateTodo />

			<div style={styles.divider}></div>

			<h2 style={styles.title}>Your Todos</h2>
			<TodoList />
		</div>
	);
};

const styles: { [key: string]: CSSProperties } = {
	container: {
		width: 400,
		margin: "0 auto",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		marginTop: 0,
		marginBottom: 15,
	},
	divider: {
		borderBottom: "1px solid grey",
		margin: "40px 0px",
	},
};

export default withAuthenticator(App, true);
