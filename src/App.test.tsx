import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  // Kollar om h1-elementet innehåller texten "THINGS TO DO:".
  it("should be h1", () => {
    render(<App />);

    expect(screen.getByRole("heading")).toHaveTextContent("THINGS TO DO:");
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
