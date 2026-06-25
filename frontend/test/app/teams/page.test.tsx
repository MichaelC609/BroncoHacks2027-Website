import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import TeamsPage from "../../../app/teams/page";

describe("Teams Page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the teams page", () => {
    render(<TeamsPage />);

    expect(screen.getByRole("heading", { name: "Teams" })).toBeInTheDocument();
    expect(screen.getByText("Code Broncos")).toBeInTheDocument();
    expect(screen.getByText("Stack Sprinters")).toBeInTheDocument();
  });

  it("updates team member count from localStorage", () => {
    localStorage.setItem(
      "team-2-members",
      JSON.stringify([
        { id: "5", name: "Chris Park" },
        { id: "6", name: "Morgan Diaz" },
        { id: "7", name: "Jamie Tran" },
        { id: "999", name: "Ahmad" },
      ])
    );

    render(<TeamsPage />);

    const teamCard = screen
      .getByRole("heading", { name: "Stack Sprinters" })
      .closest("article");

    expect(teamCard).not.toBeNull();
    expect(teamCard).toHaveTextContent("Members:");
    expect(teamCard).toHaveTextContent("4 / 4");
    expect(teamCard).toHaveTextContent("Full");
  });
});