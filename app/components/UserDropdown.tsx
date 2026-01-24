"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut, User as UserIcon, Settings, ChevronDown } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

type User = {
    name: string;
    email: string;
    avatar?: string;
};

interface UserDropdownProps {
    user: User;
}

export default function UserDropdown({ user }: UserDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { logout } = useAuth();

    // Toggle dropdown
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle Logout
    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border border-border bg-white hover:bg-bg-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
                <div className="w-8 h-8 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center border border-primary/10">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-primary font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>
                <span className="text-sm font-medium text-text-primary hidden md:block">
                    {user.name.split(" ")[0]}
                </span>
                <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-border py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-border mb-2">
                        <p className="text-sm font-bold text-text-primary truncate">{user.name}</p>
                        <p className="text-xs text-text-secondary truncate">{user.email}</p>
                    </div>

                    <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary hover:bg-bg-muted transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <UserIcon className="w-4 h-4 text-text-muted" />
                        Profile
                    </Link>

                    <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary hover:bg-bg-muted transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <Settings className="w-4 h-4 text-text-muted" />
                        Settings
                    </Link>

                    <div className="h-px bg-border my-2" />

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}
