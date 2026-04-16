import Link from "next/link";

const teams = [
  {
    id: "1",
    name: "Code Broncos",
    hackathon: "Bronco Hacks 2027",
    members: 4,
    lookingFor: "Frontend Developer",
  },
  {
    id: "2",
    name: "Stack Sprinters",
    hackathon: "Bronco Hacks 2027",
    members: 3,
    lookingFor: "Backend Developer",
  },
  {
    id: "3",
    name: "Bug Smashers",
    hackathon: "Bronco Hacks 2027",
    members: 2,
    lookingFor: "UI/UX Designer",
  },
  {
    id: "4",
    name: "Hackathon Heroes",
    hackathon: "Bronco Hacks 2027",
    members: 6,
    lookingFor: "N/A",
  },
  {
    id: "5",
    name: "Bug Smaeshers",
    hackathon: "Bronco Hacks 2027",
    members: 3,
    lookingFor: "Fullstack developer",
  },
  {
    id: "6",
    name: "Codees",
    hackathon: "Bronco Hacks 2027",
    members: 2,
    lookingFor: "Anyone",
  },
];

export default function TeamsPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Teams</h1>
      <p>Browse teams and find one to join.</p>

      <div style={{ marginTop: "20px", display: "grid", gap: "16px" }}>
        {teams.map((team) => (
          <div
            key={team.id}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "10px",
            }}
          >
            <h2>{team.name}</h2>
            <p><strong>Event:</strong> {team.hackathon}</p>
            <p><strong>Members:</strong> {team.members}</p>
            <p><strong>Looking for:</strong> {team.lookingFor}</p>

            <Link href={`/teams/${team.id}`}>
              <button style={{ marginTop: "10px" }}>
                View Team
              </button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}