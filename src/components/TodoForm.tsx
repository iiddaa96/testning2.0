import { FormEvent, useState } from "react";

// Props ger oss möjligheten att skapa integrationstester.
interface Props {
  onSubmit: (text: string) => void;
}

function TodoForm(props: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      // Kontrollera att input fältet inte är tom
      props.onSubmit(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="save-button">Save</button>
    </form>
  );
}

export default TodoForm;
