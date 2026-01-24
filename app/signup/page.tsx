"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

type Role = "User" | "Tutor";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 🔹 avatar file + preview
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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

  // ✅ FINAL SUBMIT
  const handleSignUp = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role ?? "User");

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      setIsLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData, // ❗ DO NOT set Content-Type
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Signup failed");
      }

      console.log("Signup success:", data);
      // redirect / update auth state here
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

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
              className={`h-2 w-8 rounded-full ${step === s ? "bg-primary" : "bg-border"
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
              className={`w-full py-2 rounded-lg font-medium transition ${role
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
                className="w-full py-2 rounded-lg border border-border"
              >
                Back
              </button>

              <button
                disabled={!name || !email}
                onClick={() => setStep(3)}
                className={`w-full py-2 rounded-lg ${name && email
                  ? "bg-primary text-white"
                  : "bg-border text-text-muted"
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
                <div className="h-28 w-28 rounded-full border border-border overflow-hidden">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-text-muted">
                      Avatar
                    </div>
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
                      setAvatarFile(file);
                      setAvatarPreview(URL.createObjectURL(file));
                    }}
                  />
                  <span className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                    ✎
                  </span>
                </label>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setStep(2)}
                className="w-full py-2 rounded-lg border"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="w-full py-2 rounded-lg bg-primary text-white"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — PASSWORD */}
        {step === 4 && (
          <div className="mt-6 space-y-4">
            <Input label="Password" type="password" value={password} onChange={setPassword} />
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />

            <ul className="text-sm space-y-1">
              {Object.entries(passwordRules).map(([key, valid]) => (
                <li key={key} className={valid ? "text-success" : "text-text-muted"}>
                  ✓ {ruleLabel(key)}
                </li>
              ))}
              <li className={passwordsMatch ? "text-success" : "text-text-muted"}>
                ✓ Passwords match
              </li>
            </ul>

            <div className="flex space-x-2">
              <button
                onClick={() => setStep(3)}
                className="w-full py-2 rounded-lg border"
              >
                Back
              </button>

              <button
                disabled={!allPasswordValid}
                onClick={handleSignUp}
                className={`w-full py-2 rounded-lg ${allPasswordValid
                  ? "bg-primary text-white"
                  : "bg-border text-text-muted"
                  }`}
              >
                {isLoading ? "Creating..." : "Create Account"}
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
      className={`w-full p-4 rounded-lg border ${selected ? "border-primary" : "border-border"
        }`}
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-text-secondary">{description}</p>
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
      <label className="text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-4 py-2 border rounded-md"
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
