"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to Login !!");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-muted px-4">
      <div className="w-full max-w-md bg-card-bg p-8 rounded-lg shadow-md border border-border">
        <h1 className="text-2xl font-bold text-text-primary text-center">
          Welcome Back
        </h1>
        <p className="text-text-secondary text-center mt-2">
          Login to continue learning
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-sm text-text-secondary">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-text-secondary">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={`w-full cursor-pointer py-2 rounded-lg  ${isLoading ? "bg-gray-500" : "bg-primary hover:bg-primary-dark"} text-white font-medium transition `}
          >
            {isLoading ? "logging In..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-text-muted text-center mt-6">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
