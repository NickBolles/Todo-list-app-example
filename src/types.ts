export type Todo = {
  text: string;
  complete: boolean;
};

export type ToggleTodo = (selectedTodo: string) => void;

export type AddTodo = (newTodo: Todo) => void;
