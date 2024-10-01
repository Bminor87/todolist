import "./App.css";

import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";

import TodoNav from "./components/TodoNav.jsx";

function App() {
  return (
    <Container>
      <CssBaseline />
      <TodoNav />
    </Container>
  );
}

export default App;
