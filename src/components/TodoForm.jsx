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
    if (!newTodo.description) {
      setErrors({ ...errors, description: true });
      return;
    }

    if (!newTodo.priority) {
      setErrors({ ...errors, priority: true });
      return;
    }

    if (!newTodo.date) {
      setErrors({ ...errors, date: true });
      return;
    }

    setTodos([...todos, newTodo]);

    resetTodo();
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
          label="Date"
          onChange={(event) =>
            setNewTodo({ ...newTodo, date: event.target.value })
          }
          value={newTodo.date}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Priority</InputLabel>
        <Select
          error={errors.priority}
          label="Priority"
          value={newTodo.priority}
          onChange={(event) =>
            setNewTodo({ ...newTodo, priority: event.target.value })
          }
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
          onChange={(event) =>
            setNewTodo({ ...newTodo, description: event.target.value })
          }
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
