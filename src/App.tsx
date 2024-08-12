import { useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";

interface Todo {
  text: string;
  isCompleted: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Kollar om en todo är klar eller inte.
  const addTodo = (text: string) => {
    const newTodo = { text, isCompleted: false };
    setTodos([...todos, newTodo]);
  };

  // Ändrar status på en todo.
  const toggleComplete = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  // Tar bort en todo.
  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1 style={{ marginTop: "-8rem" }}>THINGS TO DO:</h1>

      <TodoForm onSubmit={addTodo} />

      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleComplete(index)}
            />
            <span
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
                flex: 1,
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(index)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
