import * as React from "react";
import { RenderCounter } from "./RenderCounter";
import { useAppSelector } from "./store";
import { selectTodos } from "./store/todos/TodosSlice";

// This hook is an example of creating derived state
// this should be in a central or re-usable spot, maybe
// in a `hooks.ts` in the `todos` feature folder?
const useTodoStats = () => {
  const todos = useAppSelector(selectTodos);

  const total = todos.length;
  const completed = todos.filter((v) => v.complete).length; //reduce((v, todo) => (todo.complete ? v++ : v), 0);
  const percentComplete = Math.floor((completed / todos.length) * 100);
  return {
    total,
    completed,
    percentComplete
  };
};

interface TodoStatsProps {}
export const TodoStats: React.FC<TodoStatsProps> = () => {
  const { total, completed, percentComplete } = useTodoStats();
  return (
    <div className="section">
      <RenderCounter name="todoStats" />
      <p>Total: {total}</p>
      <p>
        Completed: {completed} ({percentComplete}%)
      </p>
    </div>
  );
};
