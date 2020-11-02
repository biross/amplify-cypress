/* src/App.js */
import React, { useEffect, useState, CSSProperties } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "./graphql/queries";

import CreateTodo from "./components/CreateTodo";

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
			{/* <input
				onChange={(event) => setInput("name", event.target.value)}
				style={styles.input}
				value={formState.name}
				placeholder="Name"
			/>
			<input
				onChange={(event) => setInput("description", event.target.value)}
				style={styles.input}
				value={formState.description}
				placeholder="Description"
			/>
			<button style={styles.button} onClick={addTodo}>
				Create Todo
			</button> */}
			<CreateTodo />

			{todos.map((todo, index) => (
				<div key={todo.id ? todo.id : index} style={styles.todo}>
					<p style={styles.todoName}>{todo.name}</p>
					<p style={styles.todoDescription}>{todo.description}</p>
				</div>
			))}
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
	todo: { marginBottom: 15 },
	todoName: { fontSize: 20, fontWeight: "bold" },
	todoDescription: { marginBottom: 0 },
};

export default App;
