import { useEffect, useState, useRef } from "react";
import TodoTable from "./TodoTable";
import "./TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    description: "",
    priority: "",
    date: "",
  });
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const gridRef = useRef();

  useEffect(() => {
    resetTodo();
  }, []);

  const addTodo = () => {
    if (!newTodo.description) {
      descriptionRef.current.focus();
      return;
    }
    if (!newTodo.priority) {
      priorityRef.current.focus();
      return;
    }
    setTodos([...todos, newTodo]);
    resetTodo();
  };

  const handleChange = (event) => {
    setNewTodo({ ...newTodo, description: event.target.value });
  };

  const handleDelete = () => {
    const nodes = gridRef.current.getSelectedNodes();
    console.log(nodes);

    if (nodes.length === 0) {
      return;
    }

    setTodos(todos.filter((todo, i) => i != nodes[0].id));
  };

  const resetTodo = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    setNewTodo({ description: "", priority: "", date: currentDate });
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
      <select
        ref={priorityRef}
        className="priority"
        onChange={(event) =>
          setNewTodo({ ...newTodo, priority: event.target.value })
        }
        value={newTodo.priority}
      >
        <option value="">Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
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
      <button className="button" onClick={handleDelete}>
        Delete
      </button>
      <TodoTable todos={todos} setTodos={setTodos} gridRef={gridRef} />
    </div>
  );
}

export default TodoList;
