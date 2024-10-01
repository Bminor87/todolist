import { Tab, Box } from "@mui/material";

import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";

import { useState } from "react";

import TodoHome from "./TodoHome";
import TodoApp from "./TodoApp";

function TodoNav() {
  const [tab, setTab] = useState("1");

  const changeTab = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          value={tab}
          onChange={changeTab}
          aria-label="basic tabs example"
        >
          <Tab label="Home" value="1" />
          <Tab label="Todos" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <TodoHome />
      </TabPanel>
      <TabPanel value="2">
        <TodoApp />
      </TabPanel>
    </TabContext>
  );
}

export default TodoNav;
