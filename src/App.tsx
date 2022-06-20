import * as React from "react";
import "./styles.css";
import { TodoList } from "./TodoList";
import { TodoStats } from "./TodoStats";
import { RenderCounter } from "./RenderCounter";
import { AddTodoForm } from "./AddTodoForm";
import { store } from "./store";
import { Provider } from "react-redux";

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
