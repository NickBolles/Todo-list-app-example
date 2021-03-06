import * as React from "react";
import { TodoListItem } from "./TodoListItem";
import { RenderCounter } from "./RenderCounter";
import { Todo, ToggleTodo } from "./types";

interface TodoListProps {
  todos: Array<Todo>;
  toggleTodo: ToggleTodo;
}
export const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => {
  return (
    <div className="section">
      <RenderCounter name="TodoList" />
      <ul>
        {todos.map((todo) => {
          return (
            <TodoListItem key={todo.text} todo={todo} toggleTodo={toggleTodo} />
          );
        })}
      </ul>
    </div>
  );
};
