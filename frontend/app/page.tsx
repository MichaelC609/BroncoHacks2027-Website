import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="page-header">
        <h1>BroncoHacks 2027 Portal</h1>
        <p className="page-subtitle">
          Find teams, view team details, and explore public profiles.
        </p>
      </section>

      <nav className="nav-links">
        <Link href="/teams" className="button">
          Browse Teams
        </Link>
      </nav>
    </main>
  );
}