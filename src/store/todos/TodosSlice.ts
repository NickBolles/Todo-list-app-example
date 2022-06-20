import {
  createSlice,
  PayloadAction,
  createEntityAdapter
} from "@reduxjs/toolkit";
import type { RootState } from "../RootStore";

// Define types directly in the store, there's no need
// to reference them anywhere because of type inference
// does need to be exported to be "public" though
export type Todo = {
  text: string;
  complete: boolean;
};

const todosAdapter = createEntityAdapter<Todo>({
  // Assume IDs are stored in a field other than `id`
  selectId: (todo) => todo.text,
  // Keep the "all IDs" array sorted based on text
  sortComparer: (a, b) => a.text.localeCompare(b.text)
});

// This is for use within reducers in this slice
const localSelectors = todosAdapter.getSelectors();

// Other code such as selectors can use the imported `RootState` type
export const todosSelectors = todosAdapter.getSelectors<RootState>(
  (state) => state.todos
);

export const selectTodos = (state: RootState) =>
  todosSelectors.selectAll(state);
export const selectTodo = (text: string) => (state: RootState) =>
  todosSelectors.selectById(state, text);

// This part is only for demonstration purposes to initialize the list with some todos
const entityState = todosAdapter.getInitialState();
const initialState = todosAdapter.addMany(entityState, [
  { text: "first todo", complete: true },
  { text: "two", complete: false },
  { text: "three", complete: false }
]);

const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    // bookAdded: todosAdapter.addOne,
    // booksReceived(state, action) {
    //   // Or, call them as "mutating" helpers in a case reducer
    //   todosAdapter.setAll(state, action.payload.books)
    // },

    toggleAllTodos: (state) => {
      const allTodos = localSelectors.selectAll(state);
      const updates = allTodos.map((todo) => ({
        id: todo.text,
        changes: { complete: !todo.complete }
      }));

      todosAdapter.updateMany(state, updates);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = localSelectors.selectById(state, action.payload);
      todosAdapter.updateOne(state, {
        id: action.payload,
        changes: { complete: !todo.complete }
      });
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // addTodo: (state, action: PayloadAction<Todo>) => {
    //   todosAdapter.setOne(state, action.payload);
    // }
    addTodo: todosAdapter.addOne
  }
});

export const { addTodo, toggleTodo, toggleAllTodos } = todosSlice.actions;

export default todosSlice.reducer;
