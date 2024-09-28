import "./TodoTable.css";

function TodoTable({ todos, setTodos }) {
  console.log("TodoTable rerenders");

  const handleDelete = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

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
  );
}

export default TodoTable;
