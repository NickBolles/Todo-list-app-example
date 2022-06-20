import * as React from "react";
// import { ToggleTodo } from "./types";
import "./TodoListItem.css";
import { RenderCounter } from "./RenderCounter";
import { useAppDispatch, useAppSelector } from "./store";
import { selectTodo, toggleTodo } from "./store/todos/TodosSlice";

interface TodoListItemProps {
  todoId: string;
}

export const TodoListItem: React.FC<TodoListItemProps> = React.memo(
  ({ todoId }) => {
    const todo = useAppSelector(selectTodo(todoId));

    const dispatch = useAppDispatch();
    const handleToggleTodo = React.useCallback(() => {
      dispatch(toggleTodo(todo.text));
    }, [dispatch, todo]);

    return (
      <li className="section">
        <RenderCounter name="TodoListItem" />
        <label className={todo.complete ? "complete" : undefined}>
          <input
            type="checkbox"
            checked={todo.complete}
            onChange={() => handleToggleTodo()}
          />
          {todo.text}
        </label>
      </li>
    );
  }
);
