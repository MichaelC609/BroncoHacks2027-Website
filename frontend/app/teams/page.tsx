"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const teams = [
  {
    id: "1",
    name: "Code Broncos",
    hackathon: "Bronco Hacks 2027",
    members: 4,
    lookingFor: "Frontend Developer",
    isOpen: false,
  },
  {
    id: "2",
    name: "Stack Sprinters",
    hackathon: "Bronco Hacks 2027",
    members: 3,
    lookingFor: "Backend Developer",
    isOpen: true,
  },
  {
    id: "3",
    name: "Bug Smashers",
    hackathon: "Bronco Hacks 2027",
    members: 2,
    lookingFor: "UI/UX Designer",
    isOpen: true,
  },
  {
    id: "4",
    name: "Hackathon Heroes",
    hackathon: "Bronco Hacks 2027",
    members: 4,
    lookingFor: "No preference",
    isOpen: false,
  },
  {
    id: "5",
    name: "Bug Smaeshers",
    hackathon: "Bronco Hacks 2027",
    members: 3,
    lookingFor: "Fullstack Developer",
    isOpen: true,
  },
  {
    id: "6",
    name: "Codees",
    hackathon: "Bronco Hacks 2027",
    members: 1,
    lookingFor: "Anyone",
    isOpen: true,
  },
];

export default function TeamsPage() {
  const [search, setSearch] = useState("");
  const [openOnly, setOpenOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const filteredTeams = useMemo(() => {
    let result = teams.filter((team) =>
      team.name.toLowerCase().includes(search.toLowerCase())
    );

    if (openOnly) {
      result = result.filter((team) => team.isOpen);
    }

    if (sortBy === "fewest-members") {
      result = [...result].sort((a, b) => a.members - b.members);
    } else if (sortBy === "most-members") {
      result = [...result].sort((a, b) => b.members - a.members);
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, openOnly, sortBy]);

  return (
    <main style={{ padding: "40px" }}>
      <h1>Teams</h1>
      <p>Browse teams and find one to join.</p>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "24px",
          display: "grid",
          gap: "12px",
          maxWidth: "500px",
        }}
      >
        <input
          type="text"
          placeholder="Search teams by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            checked={openOnly}
            onChange={(e) => setOpenOnly(e.target.checked)}
          />
          Show only open teams
        </label>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="default">Sort by</option>
          <option value="fewest-members">Teams with fewest members</option>
          <option value="most-members">Teams with most members</option>
          <option value="name">Team name (A-Z)</option>
        </select>
      </div>

      {filteredTeams.length === 0 ? (
        <p
          style={{
            marginTop: "20px",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
        >
          No teams found.
        </p>
      ) : (
        <div style={{ marginTop: "20px", display: "grid", gap: "16px" }}>
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                borderRadius: "10px",
              }}
            >
              <h2>{team.name}</h2>
              <p>
                <strong>Event:</strong> {team.hackathon}
              </p>
              <p>
                <strong>Members:</strong> {team.members} / 4
              </p>
              <p>
                <strong>Looking for:</strong> {team.lookingFor}
              </p>
              <p>
                <strong>Status:</strong> {team.isOpen ? "Open" : "Full"}
              </p>

              <Link href={`/teams/${team.id}`}>
                <button style={{ marginTop: "10px" }}>View Team</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}