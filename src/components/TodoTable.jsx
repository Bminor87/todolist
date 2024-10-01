import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

function TodoTable({ todos, setTodos, gridRef }) {
  console.log("TodoTable rerenders");

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "description",
      filter: true,
    },
    {
      field: "priority",
      filter: true,
      cellStyle: (params) =>
        params.value === "high" ? { color: "red" } : { color: "black" },
    },
    {
      field: "date",
      filter: true,
    },
  ]);

  const handleDelete = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fi");
  };

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={todos}
          domLayout="autoHeight"
          rowSelection={{ mode: "singleRow" }}
          onGridReady={(params) => (gridRef.current = params.api)}
        ></AgGridReact>
      </div>

      <table>
        {todos.length === 0 ? (
          <caption>No todos added yet</caption>
        ) : (
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
        )}
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{formatDate(todo.date)}</td>
              <td>{todo.description}</td>
              <td>
                <button
                  className="button red"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TodoTable;
