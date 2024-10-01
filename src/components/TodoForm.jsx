import "./TodoList.css";

import {
  Button,
  TextField,
  Select,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
} from "@mui/material";

import { useEffect, useState, useRef } from "react";

function TodoForm({ todos, setTodos, gridRef }) {
  const [newTodo, setNewTodo] = useState({
    description: "",
    priority: "",
    date: "",
  });

  const [errors, setErrors] = useState({
    description: false,
    priority: false,
    date: false,
  });

  useEffect(() => {
    resetTodo();
  }, []);

  const addTodo = () => {
    if (!newTodo.description || !newTodo.priority || !newTodo.date) {
      setErrors({
        description: !newTodo.description,
        priority: !newTodo.priority,
        date: !newTodo.date,
      });
      return;
    }

    setTodos([...todos, newTodo]);

    resetTodo();
  };

  const handleChange = (e) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: false,
    });
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
    setErrors({ description: false, priority: false, date: false });
  };

  return (
    <Stack spacing={2} direction="row">
      <FormControl fullWidth>
        <TextField
          error={errors.date}
          type="date"
          name="date"
          label="Date"
          onChange={handleChange}
          value={newTodo.date}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Priority</InputLabel>
        <Select
          error={errors.priority}
          label="Priority"
          name="priority"
          value={newTodo.priority}
          onChange={handleChange}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <TextField
          error={errors.description}
          label="Description"
          name="description"
          onChange={handleChange}
          value={newTodo.description}
        />
      </FormControl>

      <Button variant="contained" onClick={addTodo}>
        Add
      </Button>

      <Button variant="outlined" onClick={handleDelete}>
        Delete
      </Button>
    </Stack>
  );
}

export default TodoForm;
