"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-bg-muted text-text-secondary mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + Tagline */}
        <div className="flex flex-col space-y-2">
          <Link href="/">
            <span className="text-2xl font-bold text-primary cursor-pointer">EduFlux</span>
          </Link>
          <span className="text-sm text-text-primary">
            Learning in Constant Flow
          </span>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-text-primary font-semibold mb-2">Quick Links</h4>
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
          <Link href="/my-learnings" className="hover:text-primary transition-colors">My Learnings</Link>
          <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
        </div>

        {/* Support */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-text-primary font-semibold mb-2">Support</h4>
          <Link href="/help" className="hover:text-primary transition-colors">Help Center</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
        </div>

        {/* Social / Newsletter */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-text-primary font-semibold mb-2">Connect with us</h4>
          <div className="flex space-x-3">
            <Link href="https://twitter.com" target="_blank" className="text-primary hover:text-primary-dark transition">
              Twitter
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="text-primary hover:text-primary-dark transition">
              LinkedIn
            </Link>
            <Link href="https://facebook.com" target="_blank" className="text-primary hover:text-primary-dark transition">
              Facebook
            </Link>
          </div>
          <span className="text-text-muted text-sm mt-2">
            &copy; {new Date().getFullYear()} EduFlux. All rights reserved.
          </span>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-border mt-6 pt-4 text-center text-xs text-text-muted">
        Designed with ❤️ by EduFlux Team
      </div>
    </footer>
  );
};

export default Footer;
