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
  {
    id: "4",
    name: "Sam Lee",
    username: "saml",
    school: "Cal Poly Pomona",
    major: "Computer Science",
    bio: "Enjoys building team projects and hackathon demos.",
    skills: ["React", "CSS", "Git"],
  },
  {
    id: "5",
    name: "Chris Park",
    username: "chrisp",
    school: "Cal Poly Pomona",
    major: "Software Engineering",
    bio: "Interested in backend systems and API design.",
    skills: ["Java", "Spring Boot", "SQL"],
  },
  {
    id: "6",
    name: "Morgan Diaz",
    username: "morgand",
    school: "Cal Poly Pomona",
    major: "Computer Information Systems",
    bio: "Likes solving problems with clean, scalable code.",
    skills: ["PostgreSQL", "Java", "GitHub"],
  },
  {
    id: "7",
    name: "Jamie Tran",
    username: "jamiet",
    school: "Cal Poly Pomona",
    major: "Computer Science",
    bio: "Builder focused on web apps and user experience.",
    skills: ["Next.js", "JavaScript", "UI/UX"],
  },
  {
    id: "8",
    name: "Riley Patel",
    username: "rileyp",
    school: "Cal Poly Pomona",
    major: "Computer Information Systems",
    bio: "UI/UX focused builder who likes clean, simple products.",
    skills: ["Figma", "CSS", "Next.js"],
  },
  {
    id: "9",
    name: "Casey Nguyen",
    username: "caseyn",
    school: "Cal Poly Pomona",
    major: "Software Engineering",
    bio: "Interested in frontend design and collaboration.",
    skills: ["React", "TypeScript", "Git"],
  },
  {
    id: "10",
    name: "Zianne Cruz",
    username: "ziannec",
    school: "Cal Poly Pomona",
    major: "Computer Science",
    bio: "Hackathon builder who enjoys fast prototyping.",
    skills: ["Next.js", "CSS", "Figma"],
  },
  {
    id: "11",
    name: "Mary Lopez",
    username: "maryl",
    school: "Cal Poly Pomona",
    major: "Computer Information Systems",
    bio: "Interested in building helpful student tools.",
    skills: ["JavaScript", "UI/UX", "Git"],
  },
  {
    id: "12",
    name: "Zack Brown",
    username: "zackb",
    school: "Cal Poly Pomona",
    major: "Computer Science",
    bio: "Enjoys coding team-based projects and demos.",
    skills: ["React", "Node.js", "CSS"],
  },
  {
    id: "13",
    name: "Miguel Torres",
    username: "miguelt",
    school: "Cal Poly Pomona",
    major: "Software Engineering",
    bio: "Full-stack developer interested in hackathons.",
    skills: ["Java", "Spring Boot", "PostgreSQL"],
  },
  {
    id: "14",
    name: "Zoe Kim",
    username: "zoek",
    school: "Cal Poly Pomona",
    major: "Computer Science",
    bio: "Frontend-focused student who likes polished interfaces.",
    skills: ["Next.js", "CSS", "Figma"],
  },
  {
    id: "15",
    name: "Mili Shah",
    username: "milis",
    school: "Cal Poly Pomona",
    major: "Computer Information Systems",
    bio: "Enjoys collaboration and building useful apps.",
    skills: ["JavaScript", "HTML", "CSS"],
  },
  {
    id: "16",
    name: "Alias Rahman",
    username: "aliasr",
    school: "Cal Poly Pomona",
    major: "Software Engineering",
    bio: "Interested in social media app development.",
    skills: ["React", "TypeScript", "GitHub"],
  },
  {
    id: "17",
    name: "Alissa Gomez",
    username: "alissag",
    school: "Cal Poly Pomona",
    major: "Computer Science",
    bio: "Enjoys turning ideas into working products.",
    skills: ["Next.js", "JavaScript", "Figma"],
  },
  {
    id: "18",
    name: "Ali Hassan",
    username: "alih",
    school: "Cal Poly Pomona",
    major: "Computer Engineering",
    bio: "Likes building fast prototypes for hackathons.",
    skills: ["Python", "TypeScript", "Git"],
  },
  {
    id: "19",
    name: "Miguel Ramos",
    username: "miguelr",
    school: "Cal Poly Pomona",
    major: "Software Engineering",
    bio: "Focused on team collaboration and building useful tools.",
    skills: ["Java", "SQL", "Git"],
  },
  {
    id: "20",
    name: "Logan West",
    username: "loganw",
    school: "Cal Poly Pomona",
    major: "Computer Science",
    bio: "Interested in productivity and fitness apps.",
    skills: ["Next.js", "CSS", "JavaScript"],
  },
  {
    id: "999",
    name: "Ahmad",
    username: "ahmad",
    school: "Cal Poly Pomona",
    major: "Computer Science",
    bio: "Hackathon participant interested in web development.",
    skills: ["Next.js", "Java", "Spring Boot"],
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