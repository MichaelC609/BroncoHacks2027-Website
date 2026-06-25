import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../../app/page";

describe("Home Page", () => {
  it("renders the title", () => {
    render(<HomePage />);

    expect(
      screen.getByText("BroncoHacks 2027 Portal")
    ).toBeInTheDocument();
  });
});