import { AppBar, Toolbar, Typography, Stack } from "@mui/material";

import { useState, useRef } from "react";

import TodoForm from "./TodoForm";
import TodoTable from "./TodoTable";

function TodoApp() {
  const [todos, setTodos] = useState([]);

  const gridRef = useRef();

  return (
    <Stack spacing={4} justifyContent={"center"} alignItems={"center"}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todo App</Typography>
        </Toolbar>
      </AppBar>
      <TodoForm todos={todos} setTodos={setTodos} gridRef={gridRef} />
      <TodoTable todos={todos} gridRef={gridRef} />
    </Stack>
  );
}

export default TodoApp;
