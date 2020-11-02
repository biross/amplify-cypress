import Todo from "./Todo";

export default interface TodoConnection {
	data: {
		createTodo: Todo;
	};
}
