import * as React from "react";
import { Todo, ToggleTodo } from "./types";
import "./TodoListItem.css";
import { RenderCounter } from "./RenderCounter";

interface TodoListItemProps {
  todo: Todo;
  toggleTodo: ToggleTodo;
}

export const TodoListItem: React.FC<TodoListItemProps> = React.memo(
  ({ todo, toggleTodo }) => {
    return (
      <li className="section">
        <RenderCounter name="TodoListItem" />
        <label className={todo.complete ? "complete" : undefined}>
          <input
            type="checkbox"
            checked={todo.complete}
            onChange={() => toggleTodo(todo.text)}
          />
          {todo.text}
        </label>
      </li>
    );
  }
);
