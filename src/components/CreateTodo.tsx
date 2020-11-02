import React, { useState, CSSProperties } from "react";
import TodoStore from "../store/TodoStore";
import Todo from "../types/Todo";

const initialState = { name: "", description: "" };

const CreateTodo = () => {
	const [formState, setFormState] = useState(initialState);
	const addTodo = TodoStore((state) => state.addTodo);

	function setInput(key: string, value: string) {
		setFormState({ ...formState, [key]: value });
	}

	async function onAddTodo() {
		if (!formState.name || !formState.description) return;
		const todo = { ...formState };

		await addTodo(todo as Todo);
		setFormState(initialState);
	}

	return (
		<div style={styles.container}>
			<input
				onChange={(event) => setInput("name", event.target.value)}
				style={styles.input}
				value={formState.name}
				data-test="create-todo-name-input"
				placeholder="Name"
			/>
			<input
				onChange={(event) => setInput("description", event.target.value)}
				style={styles.input}
				value={formState.description}
				data-test="create-todo-description-input"
				placeholder="Description"
			/>
			<button
				style={styles.button}
				onClick={onAddTodo}
				data-test="create-todo-submit-button"
			>
				Create Todo
			</button>
		</div>
	);
};

const styles: { [key: string]: CSSProperties } = {
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	input: {
		border: "none",
		backgroundColor: "#ddd",
		marginBottom: 10,
		padding: 8,
		fontSize: 18,
	},
	button: {
		backgroundColor: "black",
		color: "white",
		outline: "none",
		fontSize: 18,
		padding: "12px 0px",
		cursor: "pointer",
	},
};

export default CreateTodo;
