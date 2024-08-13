import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TodoForm from "./TodoForm";

describe("TodoForm", () => {
  // Kollar om det finns en knapp och att det står save på den.
  it("should render an input with a submit button", () => {
    render(<TodoForm onSubmit={vi.fn()} />);

    expect(screen.getByRole("textbox")).toBeVisible();
    expect(screen.getByRole("button")).toHaveTextContent("Save");
  });

  // Kollar om det går att skriva i input-fältet.
  it("should submit the text that was entered in the input", () => {
    const handleSubmit = vi.fn();
    render(<TodoForm onSubmit={handleSubmit} />);

    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "Träna" },
    });
    fireEvent.click(screen.getByRole("button"));

    expect(handleSubmit).toBeCalledWith("Träna");
  });
});
