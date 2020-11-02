import Todo from "./Todo";

export default interface TodoConnection {
	data: {
		listTodos: {
			items: Todo[];
			nextToken: String;
		};
	};
}
