/* src/App.js */
import React, { useEffect, useState, CSSProperties } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "./graphql/queries";

import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodosList";

import TodoConnection from "./types/TodoConnection";
import Todo from "./types/Todo";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		fetchTodos();
	}, []);

	async function fetchTodos() {
		try {
			const todoData = (await API.graphql(
				graphqlOperation(listTodos)
			)) as TodoConnection;

			const todos = todoData.data.listTodos.items;
			setTodos(todos);
		} catch (err) {
			console.log("error fetching todos");
		}
	}

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
