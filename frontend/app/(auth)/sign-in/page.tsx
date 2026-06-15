"use client";

import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: "", password: "" };

    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);

    if (!email || !password) return;

    setIsLoading(true); 
    await new Promise((resolve) => setTimeout(resolve, 2000)); // fake API call
    setIsLoading(false);
  };

  return (
    <main className="wrapper">
      <div className="card">
        {/* Basic Texts */}
        <h1 className="title">Welcome back</h1>
        <p className="subtitle">Sign in to your account to continue</p>

        {/* inputs */}
        <form className="form" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="field">
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "0.85rem" }}>{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="field">
            <label className="label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p style={{ color: "red", fontSize: "0.85rem" }}>{errors.password}</p>
            )}
          </div>

          {/* Sign In Button */}
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}