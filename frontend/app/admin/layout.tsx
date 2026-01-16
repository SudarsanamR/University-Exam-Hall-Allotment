"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/upload", label: "Upload", icon: "📤" },
    { href: "/admin/students", label: "Students", icon: "👥" },
    { href: "/admin/exams", label: "Exams", icon: "📅" },
    { href: "/admin/halls", label: "Halls", icon: "🏛️" },
    { href: "/admin/allotment", label: "Allotment", icon: "⚡" },
    { href: "/admin/results", label: "Results", icon: "📋" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 glass border-b border-[rgba(255,255,255,0.05)]" style={{ borderRadius: 0 }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Brand */}
                        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gradient hidden sm:block">ExamFlow</span>
                        </Link>

                        {/* Navigation */}
                        <nav className="flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                                            ${isActive
                                                ? "bg-[rgba(0,212,255,0.15)] text-[var(--accent-primary)]"
                                                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)]"
                                            }`}
                                    >
                                        <span className="hidden md:inline">{item.icon}</span>
                                        <span className="hidden lg:inline">{item.label}</span>
                                        <span className="lg:hidden">{item.icon}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Student Portal Link */}
                        <Link
                            href="/student"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                        >
                            <span>🎓</span>
                            <span className="hidden sm:inline">Student Portal</span>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 sm:p-8">
                <div className="max-w-6xl mx-auto animate-fadeIn">
                    {children}
                </div>
            </main>
        </div>
    );
}
