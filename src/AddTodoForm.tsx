import * as React from "react";
import { AddTodo } from "./types";
import { RenderCounter } from "./RenderCounter";

interface AddTodoFormProps {
  onAddTodo: AddTodo;
}
export const AddTodoForm: React.FC<AddTodoFormProps> = React.memo(
  ({ onAddTodo }) => {
    const [name, setName] = React.useState("");

    const addTodoItem = () => {
      onAddTodo({ complete: false, text: name });
      setName("");
    };

    return (
      <div className="section">
        <RenderCounter name="todoStats" />
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={addTodoItem}>Add Todo Item</button>
      </div>
    );
  }
);
