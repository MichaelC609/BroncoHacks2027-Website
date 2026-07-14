import { describe, expect, it, beforeEach, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

let mockTeamId = "2";

vi.mock("next/navigation", () => ({
  useParams: () => ({
    teamId: mockTeamId,
  }),
}));

import TeamDetailsPage from "../../../app/teams/[teamId]/page";

function getProfileIdsOnPage() {
  return screen
    .getAllByRole("link")
    .map((link) => link.getAttribute("href"))
    .filter((href): href is string => href !== null && href.startsWith("/profiles/"))
    .map((href) => href.split("/profiles/")[1].split("?")[0]);
}

describe("Team Details Page", () => {
  beforeEach(() => {
    localStorage.clear();
    cleanup();
    mockTeamId = "2";
  });

  it("renders a team detail page", () => {
    render(<TeamDetailsPage />);

    expect(
      screen.getByRole("heading", { name: "Stack Sprinters" })
    ).toBeInTheDocument();

    expect(screen.getByText("Join Team")).toBeInTheDocument();
  });

  it("has unique member profile ids within one team", () => {
    render(<TeamDetailsPage />);

    const profileIds = getProfileIdsOnPage();
    const uniqueProfileIds = new Set(profileIds);

    expect(uniqueProfileIds.size).toBe(profileIds.length);
  });

  it("has no duplicate member profile ids across all teams", () => {
    const allProfileIds: string[] = [];

    for (const teamId of ["1", "2", "3", "4", "5", "6"]) {
      cleanup();
      mockTeamId = teamId;

      render(<TeamDetailsPage />);

      allProfileIds.push(...getProfileIdsOnPage());
    }

    const uniqueProfileIds = new Set(allProfileIds);

    expect(uniqueProfileIds.size).toBe(allProfileIds.length);
  });

  it("only allows the user to join one team", () => {
    mockTeamId = "2";
    render(<TeamDetailsPage />);

    fireEvent.click(screen.getByRole("button", { name: "Join Team" }));

    expect(localStorage.getItem("joinedTeamId")).toBe("2");
    expect(screen.getByRole("button", { name: "Leave Team" })).toBeInTheDocument();

    cleanup();

    mockTeamId = "3";
    render(<TeamDetailsPage />);

    const joinButton = screen.getByRole("button", {
      name: "Already in Another Team",
    });

    expect(joinButton).toBeDisabled();
    expect(
      screen.getByText("You can only join one team at a time.")
    ).toBeInTheDocument();
  });
});