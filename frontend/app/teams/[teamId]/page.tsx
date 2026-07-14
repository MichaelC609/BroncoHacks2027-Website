"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

const TEAM_CAP = 4;

const mockTeams = [
  {
    id: "1",
    name: "Code Broncos",
    description: "We are building a campus networking platform.",
    hackathon: "Bronco Hacks 2027",
    members: [
      { id: "1", name: "Jane" },
      { id: "2", name: "Michael" },
      { id: "3", name: "Sofia" },
      { id: "4", name: "Sam" },
    ],
    lookingFor: "Frontend Developer",
  },
  {
    id: "2",
    name: "Stack Sprinters",
    description: "We are creating an AI-powered study planner.",
    hackathon: "Bronco Hacks 2027",
    members: [
      { id: "5", name: "Chris" },
      { id: "6", name: "Morgan" },
      { id: "7", name: "Jamie" },
    ],
    lookingFor: "Backend Developer",
  },
  {
    id: "3",
    name: "Bug Smashers",
    description: "We are making a budgeting app.",
    hackathon: "Bronco Hacks 2027",
    members: [
      { id: "8", name: "Riley" },
      { id: "9", name: "Casey" },
    ],
    lookingFor: "UI/UX Designer",
  },
  {
    id: "4",
    name: "Hackathon Heroes",
    description: "We are a diverse team of passionate developers.",
    hackathon: "Bronco Hacks 2027",
    members: [
      { id: "10", name: "Zianne" },
      { id: "11", name: "Mary" },
      { id: "12", name: "Zack" },
      { id: "13", name: "Miguel" },
    ],
    lookingFor: "N/A",
  },
  {
    id: "5",
    name: "Bug Smashers 2",
    description: "We are building a hackathon project and need one more teammate.",
    hackathon: "Bronco Hacks 2027",
    members: [
      { id: "14", name: "Zoe" },
      { id: "15", name: "Mili" },
      { id: "16", name: "Alias" },
    ],
    lookingFor: "Fullstack Developer",
  },
  {
    id: "6",
    name: "Codees",
    description: "We are open to anyone who wants to build something cool.",
    hackathon: "Bronco Hacks 2027",
    members: [
      { id: "17", name: "Alissa" },
      { id: "18", name: "Ali" },
    ],
    lookingFor: "Anyone",
  },
];

const currentUser = {
  id: "999",
  name: "Ahmad",
};

function toTeamDetailViewModel(
  team: (typeof mockTeams)[number],
  memberCount: number
) {
  const isFull = memberCount >= TEAM_CAP;

  return {
    ...team,
    memberCount,
    maxMembers: TEAM_CAP,
    isFull,
    statusLabel: isFull ? "Full" : "Open",
  };
}

function MemberList({
  members,
  teamId,
}: {
  members: { id: string; name: string }[];
  teamId: string;
}) {
  if (members.length === 0) {
    return <p className="empty-state">No members yet.</p>;
  }

  return (
    <ul>
      {members.map((member) => (
        <li key={member.id}>
          <Link href={`/profiles/${member.id}?teamId=${teamId}`}>
            {member.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function TeamDetailsPage() {
  const params = useParams();
  const teamId = params.teamId as string;

  const foundTeam = useMemo(
    () => mockTeams.find((team) => team.id === teamId),
    [teamId]
  );

  const [members, setMembers] = useState(foundTeam?.members ?? []);
const [joined, setJoined] = useState(false);

useEffect(() => {
  if (!foundTeam) return;

  const savedMembers = localStorage.getItem(
    `team-${foundTeam.id}-members`
  );

  if (savedMembers) {
    setMembers(JSON.parse(savedMembers));
  } else {
    setMembers(foundTeam.members);
  }

  setJoined(false);
}, [foundTeam]);

const [isLoading] = useState(false);

  if (isLoading) {
    return (
      <main className="page-shell">
        <section className="loading-state">
          <h2>Loading Team...</h2>
        </section>
      </main>
    );
  }
  
  if (!foundTeam) {
    return (
      <main className="page-shell">
        <section className="error-state">
          <h1>Team Not Found</h1>
          <p>This team does not exist.</p>
          <Link href="/teams">← Back to Teams</Link>
        </section>
      </main>
    );
  }

  const team = toTeamDetailViewModel(foundTeam, members.length);

  const alreadyMember = members.some(
    (member) => member.id === currentUser.id
  );

  const joinedTeamId = typeof window !== "undefined" ? localStorage.getItem("joinedTeamId") : null;

  const joinedAnotherTeam = joinedTeamId !== null && joinedTeamId !== team.id;

  function handleJoinTeam() {
    const joinedTeamId = localStorage.getItem("joinedTeamId");

    if (team.isFull || alreadyMember || joinedTeamId) {
      return;
    }

    const updatedMembers = [...members, currentUser];

    setMembers(updatedMembers);

    localStorage.setItem(
      `team-${team.id}-members`,
      JSON.stringify(updatedMembers)
    );

    localStorage.setItem("joinedTeamId", team.id);

    setJoined(true);
  }

  function handleLeaveTeam() {
    const updatedMembers = members.filter(
      (member) => member.id !== currentUser.id
    );

    setMembers(updatedMembers);

    localStorage.setItem(
      `team-${team.id}-members`,
      JSON.stringify(updatedMembers)
    );

    localStorage.removeItem("joinedTeamId");

    setJoined(false);
  }

  return (
    <main className="page-shell">
      <nav className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/teams">Teams</Link>
      </nav>

      <section className="card">
        <h1>{team.name}</h1>
        <p>{team.description}</p>

        <p>
          <strong>Event:</strong> {team.hackathon}
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
        <p>
          <strong>Members:</strong> {team.memberCount} / {team.maxMembers}
        </p>

        <h2>Members</h2>
        <MemberList members={members} teamId={team.id} />

        {alreadyMember ? (
  <button className="button" onClick={handleLeaveTeam}>
    Leave Team
  </button>
  ) : (
    <button
      className="button"
      onClick={handleJoinTeam}
      disabled={team.isFull || joinedAnotherTeam}
    >
      {team.isFull
        ? "Team Full"
        : joinedAnotherTeam
          ? "Already in Another Team"
          : "Join Team"}
    </button>
  )}

  {joinedAnotherTeam && (
    <p className="status-full">
      You can only join one team at a time.
    </p>
  )}

        {joined && <p className="status-open">You joined this team.</p>}

        {team.isFull && !alreadyMember && (
          <p className="status-full">
            This team is full and cannot accept more members.
          </p>
        )}
      </section>
    </main>
  );
}