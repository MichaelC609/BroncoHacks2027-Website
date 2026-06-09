"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

const teams = [
  {
    id: "1",
    name: "Code Broncos",
    description: "We are building a campus networking platform.",
    hackathon: "Bronco Hacks 2027",
    members: [
      { id: "1", name: "Alex" },
      { id: "2", name: "Jordan" },
      { id: "3", name: "Taylor" },
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
    name: "Bug Smaeshers",
    description: "We are creating an innovative social media platform.",
    hackathon: "Bronco Hacks 2027",
    members: [
      { id: "16", name: "Alias" },
      { id: "17", name: "Alissa" },
      { id: "18", name: "Ali" },
    ],
    lookingFor: "Fullstack Developer",
  },
  {
    id: "6",
    name: "Codees",
    description: "We are building a fitness tracking app.",
    hackathon: "Bronco Hacks 2027",
    members: [
      { id: "19", name: "Miguel" },
      { id: "20", name: "Logan" },
    ],
    lookingFor: "Anyone",
  },
];

const currentUser = {
  id: "999",
  name: "Ahmad",
};

export default function TeamDetailsPage() {
  const params = useParams();
  const teamId = params.teamId as string;

  const foundTeam = useMemo(
    () => teams.find((t) => t.id === teamId),
    [teamId]
  );

  const [joined, setJoined] = useState(false);
  const [members, setMembers] = useState(foundTeam?.members ?? []);

  if (!foundTeam) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Team Not Found</h1>
        <Link href="/teams">Back to Teams</Link>
      </main>
    );
  }

  const isFull = members.length >= 4;
  const alreadyMember = members.some((member) => member.id === currentUser.id);

  const handleJoinTeam = () => {
    if (alreadyMember || isFull) {
      return;
    }

    setMembers([...members, currentUser]);
    setJoined(true);
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>{foundTeam.name}</h1>
      <p>{foundTeam.description}</p>

      <p>
        <strong>Event:</strong> {foundTeam.hackathon}
      </p>
      <p>
        <strong>Looking for:</strong> {foundTeam.lookingFor}
      </p>
      <p>
        <strong>Status:</strong> {isFull ? "Full" : "Open"}
      </p>
      <p>
        <strong>Members:</strong> {members.length} / 4
      </p>

      <h3>Members</h3>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            <Link href={`/profiles/${member.id}`}>{member.name}</Link>
          </li>
        ))}
      </ul>

      <button
        onClick={handleJoinTeam}
        disabled={isFull || alreadyMember}
        style={{
          marginTop: "20px",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          cursor: isFull || alreadyMember ? "not-allowed" : "pointer",
          opacity: isFull || alreadyMember ? 0.6 : 1,
        }}
      >
        {alreadyMember ? "Already Joined" : isFull ? "Team Full" : "Join Team"}
      </button>

      {joined && !isFull && (
        <p style={{ marginTop: "12px", color: "green" }}>
          You joined this team.
        </p>
      )}

      {isFull && !alreadyMember && (
        <p style={{ marginTop: "12px", color: "red" }}>
          This team is full and cannot accept more members.
        </p>
      )}

      <br />
      <br />
      <Link href="/teams">← Back to Teams</Link>
    </main>
  );
}