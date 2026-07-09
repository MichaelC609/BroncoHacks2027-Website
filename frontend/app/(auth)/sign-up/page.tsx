"use client";

import { signUp } from "../../../lib/auth-client";
import { useState } from "react";
import AuthCard from "../auth/AuthCard";
import AuthInput from "../auth/AuthInput";
import AuthSubmitButton from "../auth/AuthSubmitButton";
import {
  hasValidationErrors,
  SubmitState,
  validateSignUp,
} from "../auth/validation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = validateSignUp({
      name,
      email,
      password,
    });

    setErrors(newErrors);

    if (hasValidationErrors(newErrors)) {
      setSubmitState("error");
      return;
    }

    try {
      setSubmitState("submitting");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <AuthCard title="Hello!" subtitle="Sign Up">
      <form className="form" onSubmit={handleSubmit}>
        <AuthInput
          label="Name"
          type="text"
          placeholder="John Doe"
          autoComplete="name"
          value={name}
          onChange={(value) => {
            setName(value);
            setSubmitState("idle");
          }}
          error={errors.name}
        />

        <AuthInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(value) => {
            setEmail(value);
            setSubmitState("idle");
          }}
          error={errors.email}
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            setSubmitState("idle");
          }}
          error={errors.password}
        />

        <AuthSubmitButton
          isSubmitting={submitState === "submitting"}
          loadingText="Signing Up..."
          defaultText="Sign Up"
        />

        {submitState === "success" && (
          <p className="status-open">Account created successfully.</p>
        )}

        {submitState === "error" && (
          <p className="status-full">Please fix the highlighted errors.</p>
        )}
      </form>
    </AuthCard>
  );
}