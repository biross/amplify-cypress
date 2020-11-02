import React, { useState, CSSProperties } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";

import Todo from "../types/Todo";

const initialState = { name: "", description: "" };

const CreateTodo = () => {
	const [formState, setFormState] = useState<Todo>(initialState);

	function setInput(key: string, value: string) {
		setFormState({ ...formState, [key]: value });
	}

	async function addTodo() {
		try {
			if (!formState.name || !formState.description) return;
			const todo = { ...formState };
			setFormState(initialState);
			await API.graphql(graphqlOperation(createTodo, { input: todo }));
		} catch (err) {
			console.log("error creating todo:", err);
		}
	}

	return (
		<div style={styles.container}>
			<input
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
	},
};

export default CreateTodo;
