"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { tagline } from "@/lib/constants";

type User = {
  name: string;
  email: string;
  avatar?: string;
};

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user/current-user", { cache: "no-store" });
        const data = await res.json();
        setCurrentUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <nav className="bg-bg shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo + Tagline */}
          <div className="flex flex-col justify-center cursor-pointer">
            <Link href="/" className="flex flex-col justify-center items-center">
              <span className="text-3xl font-bold text-primary">EduFlux</span>
              <span className="text-sm text-text-primary mt-1">
                {tagline}
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-6 text-text-primary font-medium">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-primary transition-colors">
                Courses
              </Link>
            </li>
            {currentUser && (
              <li>
                <Link href="/my-learnings" className="hover:text-primary transition-colors">
                  My Learnings
                </Link>
              </li>
            )}
            <li>
              <Link href="/resources" className="hover:text-primary transition-colors">
                Resources
              </Link>
            </li>
          </ul>

          {/* Desktop Login/Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoading &&
              (!currentUser ? (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium transition"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary-light text-primary hover:bg-primary-dark hover:text-white transition"
                  >
                    <span>Hello, {currentUser.name.split(" ")[0]}</span>
                    <img
                      src={currentUser.avatar || "/default-avatar.png"}
                      alt="avatar"
                      className="w-6 h-6 rounded-full"
                    />
                  </button>
                  {profileDropdown && (
                    <ul className="absolute right-0 mt-2 w-40 bg-bg shadow-lg rounded-lg overflow-hidden">
                      <li className="px-4 py-2 hover:bg-primary-light hover:text-white">
                        <Link href="/profile">Profile</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-primary-light hover:text-white">
                        <Link href="/settings">Settings</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-primary-light hover:text-white">
                        <Link href="/logout">Logout</Link>
                      </li>
                    </ul>
                  )}
                </div>
              ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-primary focus:outline-none text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 pb-4 space-y-2 bg-bg border-t border-border rounded-b-lg shadow-md">
            <Link
              href="/"
              className="block px-4 py-2 rounded hover:bg-primary-light hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className="block px-4 py-2 rounded hover:bg-primary-light hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              Courses
            </Link>
            {currentUser && (
              <Link
                href="/my-learnings"
                className="block px-4 py-2 rounded hover:bg-primary-light hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                My Learnings
              </Link>
            )}
            <Link
              href="/resources"
              className="block px-4 py-2 rounded hover:bg-primary-light hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              Resources
            </Link>

            {!isLoading && !currentUser && (
              <div className="flex flex-col px-4 space-y-2 mt-2">
                <Link
                  href="/login"
                  className="w-full text-center px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="w-full text-center px-4 py-2 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
