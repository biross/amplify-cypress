import React, { useState, useEffect, CSSProperties } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../graphql/queries";

import TodoConnection from "../types/TodoConnection";
import Todo from "../types/Todo";

const TodoList = () => {
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
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	todo: { marginBottom: 15 },
	todoName: { fontSize: 20, fontWeight: "bold" },
	todoDescription: { marginBottom: 0 },
};

export default TodoList;
