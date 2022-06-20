import * as React from "react";
import { RenderCounter } from "./RenderCounter";
import { addTodo } from "./store/todos/TodosSlice";
import { useAppDispatch } from "./store";

interface AddTodoFormProps {}
export const AddTodoForm: React.FC<AddTodoFormProps> = React.memo(() => {
  const [name, setName] = React.useState("");

  const dispatch = useAppDispatch();

  const addTodoItem = () => {
    const newTodo = { complete: false, text: name };
    dispatch(addTodo(newTodo));
    setName("");
  };

  return (
    <div className="section">
      <RenderCounter name="todoStats" />
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={addTodoItem}>Add Todo Item</button>
    </div>
  );
});
