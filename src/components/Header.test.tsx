import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "./Header";

describe("Header", () => {
  // Kollar om h1-elementet innehåller texten "THINGS TO DO:".
  it("should be h1", () => {
    render(<Header />);

    expect(screen.getByRole("heading")).toHaveTextContent("THINGS TO DO:");
  });
});
