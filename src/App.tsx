import { useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";

interface Todo {
  text: string;
  isCompleted: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo = { text, isCompleted: false };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

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
            <button
              onClick={() => deleteTodo(index)}
              style={{ marginLeft: "5px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
