import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import { createTodo, deleteTodo } from "../graphql/mutations";
import create, { SetState, GetState } from "zustand";

import Todo from "../types/Todo";
import TodoConnection from "../types/TodoConnection";
import CreateTodoConnection from "../types/CreateTodoConnection";

type TodoStore = {
	todos: Todo[];
	setTodos: (todos: Todo[]) => void;
	fetchTodos: () => void;
	addTodo: (todo: Todo) => void;
	removeTodo: (id: string) => void;
};

const useTodoStore = create<TodoStore>(
	(set: SetState<TodoStore>, get: GetState<TodoStore>) => ({
		todos: [],
		setTodos: (todos: Todo[]) => set({ todos }),
		fetchTodos: async () => {
			try {
				const todoData = (await API.graphql(
					graphqlOperation(listTodos)
				)) as TodoConnection;
				const todos = todoData.data.listTodos.items;

				set({ todos });
			} catch (err) {
				console.log("error fetching todos");
			}
		},
		addTodo: async (todo: Todo) => {
			try {
				const newTodoData = (await API.graphql(
					graphqlOperation(createTodo, { input: todo })
				)) as CreateTodoConnection;
				const newTodo = newTodoData.data.createTodo;

				const { todos } = get();
				set({ todos: [...todos, newTodo] });
			} catch (err) {
				console.log("error creating todo:", err);
			}
		},
		removeTodo: async (id: string) => {
			try {
				await API.graphql(graphqlOperation(deleteTodo, { input: { id } }));

				const { todos } = get();
				set({ todos: todos.filter((todo) => todo.id !== id) });
			} catch (err) {
				console.log("error removing todo:", err);
			}
		},
	})
);

export default useTodoStore;
