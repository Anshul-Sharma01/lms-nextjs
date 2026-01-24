"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { tagline } from "@/lib/constants";
import UserDropdown from "../UserDropdown";

import { useAuth } from "@/app/context/AuthContext";

type User = {
  name: string;
  email: string;
  avatar?: string;
};

const Navbar = () => {
  const { user: currentUser, isLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);



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
                <UserDropdown user={currentUser} />
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
