import * as React from "react";
import { Todo } from "./types";
import { RenderCounter } from "./RenderCounter";

interface TodoStatsProps {
  todos: Array<Todo>;
}
export const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
  const completed = todos.filter((v) => v.complete).length;
  const completePct = Math.floor((completed / todos.length) * 100);
  return (
    <div className="section">
      <RenderCounter name="todoStats" />
      <p>Total: {todos.length}</p>
      <p>
        Completed: {completed} ({completePct}%)
      </p>
    </div>
  );
};
