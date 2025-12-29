"use client";

import { useState } from "react";
import Link from "next/link";

type Role = "User" | "Tutor";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const passwordsMatch =
    password.length > 0 && password === confirmPassword;

  const allPasswordValid =
    Object.values(passwordRules).every(Boolean) && passwordsMatch;

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-muted px-4">
      <div className="w-full max-w-md bg-card-bg p-8 rounded-lg shadow-md border border-border">
        <h1 className="text-2xl font-bold text-text-primary text-center">
          Create your {role === "Tutor" ? "Tutor" : "Student"} account
        </h1>

        {/* STEP INDICATOR */}
        <div className="flex justify-center mt-4 space-x-2">
          {[1, 2, 3, 4].map((s) => (
            <span
              key={s}
              className={`h-2 w-8 rounded-full ${
                step === s ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>

        {/* STEP 1 — ROLE */}
        {step === 1 && (
          <div className="mt-8 space-y-4">
            <RoleCard
              title="Student"
              description="Learn from expert tutors and track your progress"
              selected={role === "User"}
              onClick={() => setRole("User")}
            />

            <RoleCard
              title="Tutor"
              description="Teach students, create courses, and earn"
              selected={role === "Tutor"}
              onClick={() => setRole("Tutor")}
            />

            <button
              disabled={!role}
              onClick={() => setStep(2)}
              className={`w-full py-2 rounded-lg font-medium transition ${
                role
                  ? "bg-primary hover:bg-primary-dark text-white"
                  : "bg-border text-text-muted cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2 — NAME + EMAIL */}
        {step === 2 && (
          <div className="mt-8 space-y-4">
            <Input label="Full Name" value={name} onChange={setName} />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
            />

            <div className="flex space-x-2">
              <button
                onClick={() => setStep(1)}
                className="w-full py-2 rounded-lg border border-border text-text-secondary hover:bg-bg-muted"
              >
                Back
              </button>

              <button
                disabled={!name || !email}
                onClick={() => setStep(3)}
                className={`w-full py-2 rounded-lg font-medium transition ${
                  name && email
                    ? "bg-primary hover:bg-primary-dark text-white"
                    : "bg-border text-text-muted cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — AVATAR */}
        {step === 3 && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <div className="h-28 w-28 rounded-full border border-border bg-bg-muted flex items-center justify-center overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Avatar preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-text-muted text-sm">Avatar</span>
                  )}
                </div>

                <label className="absolute -bottom-2 -right-2 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setAvatar(URL.createObjectURL(file));
                    }}
                  />
                  <span className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm hover:bg-primary-dark transition">
                    ✎
                  </span>
                </label>
              </div>

              <p className="text-xs text-text-muted">
                Upload a profile photo (optional)
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setStep(2)}
                className="w-full py-2 rounded-lg border border-border text-text-secondary hover:bg-bg-muted"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="w-full py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — PASSWORD */}
        {step === 4 && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-text-secondary">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm text-text-secondary">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>

            <ul className="text-sm space-y-1">
              {Object.entries(passwordRules).map(([key, valid]) => (
                <li
                  key={key}
                  className={valid ? "text-success" : "text-text-muted"}
                >
                  ✓ {ruleLabel(key)}
                </li>
              ))}
              <li
                className={
                  passwordsMatch ? "text-success" : "text-text-muted"
                }
              >
                ✓ Passwords match
              </li>
            </ul>

            <div className="flex space-x-2">
              <button
                onClick={() => setStep(3)}
                className="w-full py-2 rounded-lg border border-border text-text-secondary hover:bg-bg-muted"
              >
                Back
              </button>

              <button
                disabled={!allPasswordValid}
                className={`w-full py-2 rounded-lg font-medium transition ${
                  allPasswordValid
                    ? "bg-primary hover:bg-primary-dark text-white"
                    : "bg-border text-text-muted cursor-not-allowed"
                }`}
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        <p className="text-sm text-text-muted text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function RoleCard({
  title,
  description,
  selected,
  onClick,
}: {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition ${
        selected
          ? "border-primary bg-primary-light/20"
          : "border-border hover:bg-bg-muted"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-text-primary">{title}</h3>
          <p className="text-sm text-text-secondary mt-1">{description}</p>
        </div>
        {selected && <span className="text-primary font-bold">✓</span>}
      </div>
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm text-text-secondary">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

function ruleLabel(rule: string) {
  switch (rule) {
    case "length":
      return "At least 8 characters";
    case "uppercase":
      return "One uppercase letter";
    case "lowercase":
      return "One lowercase letter";
    case "number":
      return "One number";
    case "special":
      return "One special character";
    default:
      return "";
  }
}
