import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DeleteButton from "./DeleteButton";

describe("DeleteButton", () => {
  // Kollar om man kan radera en todo.
  it("calls onDelete when the button is clicked", () => {
    // Mockad onDelete-funktion.
    const onDeleteMock = vi.fn();
    render(<DeleteButton onDelete={onDeleteMock} />);

    // Hitta knappen och klicka på den
    const button = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(button);

    // Kolla att onDelete-funktionen har kallats.
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
});
