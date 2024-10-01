import "./App.css";

import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";

import TodoApp from "./components/TodoApp.jsx";

function App() {
  return (
    <Container>
      <CssBaseline />
      <TodoApp />
    </Container>
  );
}

export default App;
