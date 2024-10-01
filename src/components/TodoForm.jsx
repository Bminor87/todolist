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

import Delete from "@mui/icons-material/Delete";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/fi";

import { useEffect, useState } from "react";

function TodoForm({ todos, setTodos, gridRef }) {
  const [locale, setLocale] = useState("fi");

  const [newTodo, setNewTodo] = useState({
    description: "",
    priority: "",
    date: null,
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
    setNewTodo({ description: "", priority: "", date: dayjs(currentDate) });
    setErrors({ description: false, priority: false, date: false });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <Stack spacing={2} direction="row">
        <FormControl fullWidth>
          <DatePicker
            value={newTodo.date}
            name="date"
            onChange={(newValue) => setNewTodo({ ...newTodo, date: newValue })}
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

        <Button variant="outlined" color="error" onClick={handleDelete}>
          <Delete />
        </Button>
      </Stack>
    </LocalizationProvider>
  );
}

export default TodoForm;
