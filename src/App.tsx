import * as React from "react";
import "./styles.css";
import { TodoList } from "./TodoList";
import { TodoStats } from "./TodoStats";
import { AddTodo, Todo, ToggleTodo } from "./types";
import { RenderCounter } from "./RenderCounter";
import { AddTodoForm } from "./AddTodoForm";
import { onMessage, removeHandler, sendMessage } from "./messageAggregator";

const initialTodos: Array<Todo> = [
  { text: "first todo", complete: true },
  { text: "two", complete: false },
  { text: "three", complete: false }
];

const useTodos = () => {
  const [todos, setTodos] = React.useState(initialTodos);

  const toggleTodo: ToggleTodo = React.useCallback(
    (text) => {
      const newTodos = todos.map((todo) => {
        if (todo.text === text) {
          sendMessage("todo:toggle", todo);
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
      setTodos(newTodos);
    },
    [todos, setTodos]
  );
  const addTodo: AddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
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

  return { todos, addTodo, toggleTodo };
};

const App: React.FC = () => {
  const { todos, addTodo, toggleTodo } = useTodos();
  return (
    <div className="App">
      <h1>Todo list</h1>
      <RenderCounter name="App" />
      <AddTodoForm onAddTodo={addTodo} />
      <br />
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <br />
      <TodoStats todos={todos} />
    </div>
  );
};

export default App;
