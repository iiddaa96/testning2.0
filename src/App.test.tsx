import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  // Kollar om h1-elementet finns.
  it("should have h1-title", () => {
    render(<App />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  // Kan inte lägga till en tom todo.
  it("Can´t add an empty todo", () => {
    render(<App />);

    fireEvent.click(screen.getByText("Save"));

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  // Kollar om man kan skriva in en todo och spara den.
  it("should be possible to add a todo", () => {
    render(<App />);

    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "Diska" },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(screen.getByText("Diska"));
  });

  // Kollar om man kan lägga in flera todos.
  it("should be possible to add multiple todos", () => {
    render(<App />);

    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "Handla" },
    });
    fireEvent.click(screen.getByText("Save"));

    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "Träna" },
    });
    fireEvent.click(screen.getByText("Save"));

    expect(screen.getByText("Handla"));
    expect(screen.getByText("Träna"));
  });

  // Kollar om den senaste todo:n hamnar överst i listan.
  it("The latest todo should be at the top of the list", () => {
    render(<App />);

    // Lägger till tre todo i listan
    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "Laga mat" },
    });
    fireEvent.click(screen.getByText("Save"));

    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "Diska" },
    });
    fireEvent.click(screen.getByText("Save"));

    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "Handla" },
    });
    fireEvent.click(screen.getByText("Save"));

    // Kontrollera att den senaste todo:n är överst i listan
    const todos = screen.getAllByRole("listitem");
    expect(todos[0]).toHaveTextContent("Handla");
    expect(todos[1]).toHaveTextContent("Diska");
    expect(todos[2]).toHaveTextContent("Laga mat");
  });

  // Kollar om en todo är färdig
  it("should check if the todo is completed", () => {
    render(<App />);

    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "Laga mat" },
    });
    fireEvent.click(screen.getByText("Save"));

    const todoElement = screen.getByText("Laga mat");
    expect(todoElement).toBeInTheDocument();

    // Markera todo:n som klar genom att klicka på checkboxen
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    // Verifiera att todo:n är markerad som klar
    expect(todoElement).toHaveStyle({ textDecoration: "line-through" });
  });

  // Kollar om man kan radera en todo.
  it("should be possible to delete a todo", () => {
    render(<App />);

    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "Städa" },
    });
    fireEvent.click(screen.getByText("Save"));

    expect(screen.getByText("Städa")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Delete"));

    expect(screen.queryByText("Städa")).not.toBeInTheDocument();
  });
});
