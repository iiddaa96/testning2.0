import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "./Header";

describe("Header", () => {
  // Kollar om h1-elementet innehåller texten "THINGS TO DO:".
  it("should have h1-title", () => {
    render(<Header />);

    expect(screen.getByRole("heading")).toHaveTextContent("THINGS TO DO:");
  });
  // Kollar om h1 har specifika färgen pastell rosa
  it("should have color pastel pink", () => {
    render(<Header />);

    // Hämta h1-elementet
    const header = screen.getByRole("heading");

    // Hämta den beräknade stilen
    const style = window.getComputedStyle(header);

    // Kontrollera att färgen är pastel pink (#ffadad)
    expect(style.color).toBe("rgb(255, 173, 173)");
  });
});
