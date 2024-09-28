import "./TodoTable.css";

function TodoTable({ todos }) {
  console.log("TodoTable rerenders");

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fi");
  };

  return (
    <table>
      {todos.length === 0 ? (
        <caption>No todos added yet</caption>
      ) : (
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
      )}
      <tbody>
        {todos.map((todo, index) => (
          <tr key={index}>
            <td>{formatDate(todo.date)}</td>
            <td>{todo.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoTable;
