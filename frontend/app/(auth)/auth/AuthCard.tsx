type AuthCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <main className="wrapper">
      <div className="card auth-card">
        <h1 className="title">{title}</h1>
        <p className="subtitle">{subtitle}</p>
        {children}
      </div>
    </main>
  );
}