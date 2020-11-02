/* src/App.js */
import React, { CSSProperties } from "react";
import Amplify from "aws-amplify";

import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodosList";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = () => {
	return (
		<div style={styles.container}>
			<h2>Amplify Todos</h2>
			<CreateTodo />
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
};

export default App;
