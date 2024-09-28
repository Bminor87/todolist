import { useEffect, useState, useRef } from "react";
import TodoTable from "./TodoTable";
import "./TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ description: "", date: "" });
  const descriptionRef = useRef();

  useEffect(() => {
    resetTodo();
  }, []);

  const addTodo = () => {
    if (!newTodo.description) {
      descriptionRef.current.focus();
      return;
    }
    setTodos([...todos, newTodo]);
    resetTodo();
  };

  const handleChange = (event) => {
    setNewTodo({ ...newTodo, description: event.target.value });
  };

  const resetTodo = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    setNewTodo({ description: "", date: currentDate });
  };

  return (
    <div className="TodoList">
      <input
        className="date"
        type="date"
        placeholder="Date"
        onChange={(event) =>
          setNewTodo({ ...newTodo, date: event.target.value })
        }
        value={newTodo.date}
      />
      <textarea
        ref={descriptionRef}
        className="description"
        placeholder="Description"
        onChange={handleChange}
        value={newTodo.description}
      />

      <button className="button" onClick={addTodo}>
        Add
      </button>
      <TodoTable todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default TodoList;
