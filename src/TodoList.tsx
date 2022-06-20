import * as React from "react";
import { TodoListItem } from "./TodoListItem";
import { RenderCounter } from "./RenderCounter";
import { useAppSelector } from "./store";
import { selectTodos } from "./store/todos/TodosSlice";

interface TodoListProps {}
export const TodoList: React.FC<TodoListProps> = () => {
  const todos = useAppSelector(selectTodos);

  return (
    <div className="section">
      <RenderCounter name="TodoList" />
      <ul>
        {todos.map((todo) => {
          return <TodoListItem key={todo.text} todoId={todo.text} />;
        })}
      </ul>
    </div>
  );
};
