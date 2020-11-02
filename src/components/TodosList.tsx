import React, { useEffect, CSSProperties } from "react";
import TodoStore from "../store/TodoStore";
import TrashcanIcon from "../assets/icons/trashcan.svg";

const TodoList = () => {
	const [todos, fetchTodos, removeTodo] = TodoStore((state) => [
		state.todos,
		state.fetchTodos,
		state.removeTodo,
	]);

	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<div style={styles.container}>
			{todos.map((todo, index) => (
				<div key={todo.id ? todo.id : index} style={styles.todo}>
					<div style={styles.info}>
						<p style={styles.todoName}>{todo.name}</p>
						<p style={styles.todoDescription}>{todo.description}</p>
					</div>
					<img
						style={styles.trashcan}
						src={TrashcanIcon}
						alt="remove todo"
						onClick={() => removeTodo(todo.id)}
					/>
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
	todo: { marginBottom: 15, display: "flex" },
	info: { flex: 1 },
	todoName: { fontSize: 20, fontWeight: "bold" },
	todoDescription: { marginBottom: 0 },
	removeButton: {},
	trashcan: {
		cursor: "pointer",
	},
};

export default TodoList;
