"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const mockTeams = [
  {
    id: "1",
    name: "Code Broncos",
    hackathon: "Bronco Hacks 2027",
    members: 4,
    maxMembers: 4,
    lookingFor: "Frontend Developer",
  },
  {
    id: "2",
    name: "Stack Sprinters",
    hackathon: "Bronco Hacks 2027",
    members: 3,
    maxMembers: 4,
    lookingFor: "Backend Developer",
  },
  {
    id: "3",
    name: "Bug Smashers",
    hackathon: "Bronco Hacks 2027",
    members: 2,
    maxMembers: 4,
    lookingFor: "UI/UX Designer",
  },
  {
    id: "4",
    name: "Hackathon Heroes",
    hackathon: "Bronco Hacks 2027",
    members: 4,
    maxMembers: 4,
    lookingFor: "N/A",
  },
  {
    id: "5",
    name: "Bug Smashers 2",
    hackathon: "Bronco Hacks 2027",
    members: 3,
    maxMembers: 4,
    lookingFor: "Fullstack Developer",
  },
  {
    id: "6",
    name: "Codees",
    hackathon: "Bronco Hacks 2027",
    members: 2,
    maxMembers: 4,
    lookingFor: "Anyone",
  },
];

function toTeamViewModel(team: (typeof mockTeams)[number]) {
  const isFull = team.members >= team.maxMembers;

  return {
    ...team,
    isFull,
    statusLabel: isFull ? "Full" : "Open",
  };
}

function TeamCard({ team }: { team: ReturnType<typeof toTeamViewModel> }) {
  return (
    <article className="card">
      <h2>{team.name}</h2>

      <p>
        <strong>Event:</strong> {team.hackathon}
      </p>
      <p>
        <strong>Members:</strong> {team.members} / {team.maxMembers}
      </p>
      <p>
        <strong>Looking for:</strong> {team.lookingFor}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span className={team.isFull ? "status-full" : "status-open"}>
          {team.statusLabel}
        </span>
      </p>

      <Link href={`/teams/${team.id}`} className="button">
        View Team
      </Link>
    </article>
  );
}

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openOnly, setOpenOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [memberCounts, setMemberCounts] = useState<Record<string, number>>({});
  const [isLoading] = useState(false);

  useEffect(() => {
    const counts: Record<string, number> = {};

    mockTeams.forEach((team) => {
      const savedMembers = localStorage.getItem(`team-${team.id}-members`);

      if (savedMembers) {
        counts[team.id] = JSON.parse(savedMembers).length;
      } else {
        counts[team.id] = team.members;
      }
    });

    setMemberCounts(counts);
  }, []);

  const teams = useMemo(() => {
    let result = mockTeams.map((team) =>
      toTeamViewModel({
        ...team,
        members: memberCounts[team.id] ?? team.members,
      })
    );

    result = result.filter((team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (openOnly) {
      result = result.filter((team) => !team.isFull);
    }

    if (sortBy === "fewest-members") {
      result = [...result].sort((a, b) => a.members - b.members);
    }

    if (sortBy === "most-members") {
      result = [...result].sort((a, b) => b.members - a.members);
    }

    if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, openOnly, sortBy, memberCounts]);

  if (isLoading) {
    return (
      <main className="page-shell">
        <section className="loading-state">
          <h2>Loading Teams...</h2>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <nav className="nav-links">
        <Link href="/">Home</Link>
      </nav>

      <section className="page-header">
        <h1>Teams</h1>
        <p className="page-subtitle">Browse teams and find one to join.</p>
      </section>

      <section className="form-controls">
        <input
          className="input"
          type="text"
          placeholder="Search teams by name"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={openOnly}
            onChange={(event) => setOpenOnly(event.target.checked)}
          />{" "}
          Show only open teams
        </label>

        <select
          className="select"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="default">Sort by default</option>
          <option value="fewest-members">Teams with fewest members</option>
          <option value="most-members">Teams with most members</option>
          <option value="name">Team name A-Z</option>
        </select>
      </section>

      {teams.length === 0 ? (
        <section className="empty-state">
          <h2>No teams found</h2>
          <p>Try changing your search or filters.</p>
        </section>
      ) : (
        <section className="grid-list">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </section>
      )}
    </main>
  );
}