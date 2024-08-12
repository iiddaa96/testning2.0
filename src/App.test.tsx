import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("should be possible to add a todo", () => {
    render(<App />);

    // Testar att skriva in Diska i input-fältet.
    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "Diska" },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(screen.getByText("Diska"));
  });

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
});
