const users = [
  {
    id: "1",
    name: "Jane Doe",
    username: "janedoe",
    school: "Cal Poly Pomona",
    major: "Computer Science",
    bio: "Frontend developer interested in building clean and accessible web apps.",
    skills: ["Next.js", "CSS", "Java", "Spring Boot"],
  },
  {
    id: "2",
    name: "Michael Chen",
    username: "michaelc",
    school: "Cal Poly Pomona",
    major: "Software Engineering",
    bio: "Backend-focused developer who likes APIs, databases, and team collaboration.",
    skills: ["Spring Boot", "PostgreSQL", "Java", "Git"],
  },
  {
    id: "3",
    name: "Sofia Ramirez",
    username: "sofiar",
    school: "Cal Poly Pomona",
    major: "Computer Information Systems",
    bio: "Designer and developer passionate about user-friendly hackathon projects.",
    skills: ["Figma", "Next.js", "UI/UX", "JavaScript"],
  },
];

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>User Not Found</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>{user.name}</h1>
      <p>@{user.username}</p>

      <p>
        <strong>School:</strong> {user.school}
      </p>
      <p>
        <strong>Major:</strong> {user.major}
      </p>

      <h3>Bio</h3>
      <p>{user.bio}</p>

      <h3>Skills</h3>
      <ul>
        {user.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </main>
  );
}