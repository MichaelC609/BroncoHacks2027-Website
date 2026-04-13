export default function SignInPage() {
  return (
    <main className="wrapper">
      <div className="card">
        {/* Basic Texts */}
        <h1 className="title">Welcome back</h1>
        <p className="subtitle">Sign in to your account to continue</p>

        {/* inputs */}
        <form className="form">
          {/* Email Field */}
          <div className="field">
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="input"
            />
          </div>

          {/* Password Field */}
          <div className="field">
            <label className="label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="input"
            />
          </div>

          {/* Sign In Button */}
          <button type="submit" className="button">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}