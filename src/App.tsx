import * as React from "react";
import "./styles.css";
import { TodoList } from "./TodoList";
import { TodoStats } from "./TodoStats";
import { AddTodo, Todo, ToggleTodo } from "./types";
import { RenderCounter } from "./RenderCounter";
import { AddTodoForm } from "./AddTodoForm";
import { onMessage, removeHandler, sendMessage } from "./messageAggregator";
import { store, useAppDispatch } from "./store";
import { toggleTodo, addTodo } from "./store/todos/TodosSlice";
import { Provider } from "react-redux";

const useTodos = () => {
  const dispatch = useAppDispatch();
  const toggleTodoFn = (text: string) => dispatch(toggleTodo());
  const addTodoFn = (newTodo: Todo) => {
    dispatch(addTodo(newTodo));
    sendMessage("todo:add", newTodo);
  };

  // Sync todo toggle state
  React.useEffect(() => {
    const handleToggleAllTodos = (data) => {
      setTodos(todos.map((v) => ({ complete: !v.complete, text: v.text })));
    };
    onMessage("todo:toggleAll", handleToggleAllTodos);
    return () => {
      removeHandler("todo:toggleAll", handleToggleAllTodos);
    };
  }, [toggleTodo, setTodos, todos]);

  return { addTodo: addTodoFn, toggleTodo: toggleTodoFn };
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Todo list</h1>
        <RenderCounter name="App" />
        <AddTodoForm />
        <br />
        <TodoList />
        <br />
        <TodoStats />
      </div>
    </Provider>
  );
};

export default App;
