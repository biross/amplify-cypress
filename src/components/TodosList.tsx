import React, { useEffect, CSSProperties } from "react";
import TodoStore from "../store/TodoStore";

const TodoList = () => {
	const [todos, fetchTodos] = TodoStore((state) => [
		state.todos,
		state.fetchTodos,
	]);

	useEffect(() => {
		fetchTodos();
	}, []);

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
