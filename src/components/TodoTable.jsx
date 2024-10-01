import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { useState } from "react";
import { AgGridReact } from "ag-grid-react";

function TodoTable({ todos, gridRef }) {
  console.log("TodoTable rerenders");

  const [columnDefs, setColumnDefs] = useState([
    {
      colId: "desc",
      field: "description",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "priority",
      filter: true,
      floatingFilter: true,
      cellStyle: (params) => {
        const color = params.value === "High" ? "red" : "black";
        return { color: color };
      },
    },
    {
      field: "date",
      filter: true,
      floatingFilter: true,
      valueFormatter: (params) => formatDate(params.value),
    },
  ]);

  const autoSizeStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 100,
    columnLimits: [
      {
        colId: "desc",
        minWidth: 900,
      },
    ],
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fi");
  };

  return (
    <div className="ag-theme-quartz" style={{ height: "100%", width: "100%" }}>
      <AgGridReact
        autoSizeColumns={autoSizeStrategy}
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={todos}
        domLayout="autoHeight"
        rowSelection={{ mode: "singleRow" }}
        onGridReady={(params) => (gridRef.current = params.api)}
      ></AgGridReact>
    </div>
  );
}

export default TodoTable;
