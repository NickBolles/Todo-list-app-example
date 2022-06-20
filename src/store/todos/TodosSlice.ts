import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../RootStore";

// Define types directly in the store, there's no need
// to reference them anywhere because of type inference
// does need to be exported to be "public" though
export type Todo = {
  text: string;
  complete: boolean;
};

// Define a type for the slice state
interface TODOState {
  todos: Todo[];
}

// Define the initial state using that type
const initialState: TODOState = {
  todos: [
    { text: "first todo", complete: true },
    { text: "two", complete: false },
    { text: "three", complete: false }
  ]
};

const findTodo = (todos: TODOState["todos"], text: string) =>
  todos.findIndex((v) => v.text === text);

export const todosSlice = createSlice({
  name: "TODO",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleAllTodos: (state) => {
      for (const todo of state.todos) {
        todo.complete = !todo.complete;
      }
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const i = findTodo(state.todos, action.payload);
      state.todos[i].complete = !state.todos[i].complete;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    }
  }
});

export const { addTodo, toggleTodo, toggleAllTodos } = todosSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodos = (state: RootState) => state.todos.todos;
export const selectTodo = (text: string) => (state: RootState) => {
  const index = findTodo(state.todos.todos, text);
  if (index < 0) return null;
  return state.todos.todos[index];
};

export default todosSlice.reducer;
