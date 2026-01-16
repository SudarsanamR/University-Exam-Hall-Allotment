"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FadeIn, MagneticButton, StaggerContainer } from "../components/Animations";
import { GradientMesh, NoiseTexture, SpotlightCursor } from "../components/Effects";

interface Allotment {
    subject_code: string;
    subject_name: string;
    date: string;
    session: string;
    hall_name: string;
    seat_number: number;
}

interface StudentResult {
    student: {
        name: string;
        reg_no: string;
        dept: string;
    };
    allotments: Allotment[];
}

export default function StudentPortal() {
    const [regNo, setRegNo] = useState("");
    const [result, setResult] = useState<StudentResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!regNo) return;

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await fetch(`/api/search?reg_no=${regNo}`);
            if (res.ok) {
                setResult(await res.json());
            } else {
                const err = await res.json();
                setError(err.detail || "Student not found");
            }
        } catch {
            setError("Network error - please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
            {/* Premium Background */}
            <GradientMesh />
            <SpotlightCursor />
            <NoiseTexture opacity={0.02} />

            {/* Content */}
            <div className="relative z-10 w-full max-w-md">
                {/* Back Link */}
                <FadeIn>
                    <Link href="/" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors mb-8 group">
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                </FadeIn>

                {/* Header */}
                <FadeIn delay={0.1}>
                    <div className="text-center mb-10">
                        <MagneticButton strength={0.2}>
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/20 p-[2px] mb-6">
                                <div className="w-full h-full rounded-3xl bg-[var(--bg-primary)] flex items-center justify-center">
                                    <span className="text-4xl">🎓</span>
                                </div>
                            </div>
                        </MagneticButton>
                        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">Find Your Seat</h1>
                        <p className="text-[var(--text-muted)]">Enter your register number to view exam allocations</p>
                    </div>
                </FadeIn>

                {/* Search Form */}
                <FadeIn delay={0.2}>
                    <form onSubmit={handleSearch} className="glass-card p-8 mb-6 border border-[rgba(0,212,255,0.1)]">
                        <div className="mb-6">
                            <label htmlFor="reg-no" className="label mb-2">Register Number</label>
                            <input
                                id="reg-no"
                                type="text"
                                required
                                className="input text-lg py-4 text-center tracking-wider"
                                placeholder="e.g. 731125104003"
                                value={regNo}
                                onChange={(e) => setRegNo(e.target.value.toUpperCase())}
                            />
                        </div>
                        <MagneticButton strength={0.1} className="w-full">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`btn w-full py-4 text-base ${loading ? "bg-[var(--bg-tertiary)] cursor-wait" : "btn-primary"}`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Find My Hall
                                    </>
                                )}
                            </button>
                        </MagneticButton>
                    </form>
                </FadeIn>

                {/* Error */}
                {error && (
                    <FadeIn>
                        <div className="alert alert-error mb-6">
                            <span className="text-xl">✕</span>
                            {error}
                        </div>
                    </FadeIn>
                )}

                {/* Results */}
                {result && (
                    <FadeIn>
                        <div className="glass-card overflow-hidden border border-[rgba(0,212,255,0.1)]">
                            {/* Student Info Header */}
                            <div
                                className="p-6 border-b border-[rgba(255,255,255,0.05)]"
                                style={{ background: "linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)" }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-3xl">
                                        👤
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">{result.student.name}</h2>
                                        <p className="text-sm text-[var(--text-muted)]">
                                            <span className="font-mono text-[var(--accent-primary)]">{result.student.reg_no}</span>
                                            <span className="mx-2">•</span>
                                            {result.student.dept}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Allocations */}
                            <StaggerContainer stagger={0.1} className="divide-y divide-[rgba(255,255,255,0.03)]">
                                {result.allotments.map((allot, idx) => (
                                    <div key={idx} className="p-6 hover:bg-[rgba(255,255,255,0.02)] transition-colors group">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="font-mono text-sm text-[var(--accent-primary)] mb-1">{allot.subject_code}</div>
                                                <div className="text-[var(--text-primary)] font-medium mb-3">{allot.subject_name}</div>
                                                <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                                                    <span className="flex items-center gap-1">
                                                        <span>📅</span>
                                                        {allot.date}
                                                    </span>
                                                    <span className={`badge text-xs ${allot.session === "FN" ? "badge-warning" : "badge-secondary"}`}>
                                                        {allot.session === "FN" ? "Morning" : "Afternoon"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="badge badge-primary mb-3">{allot.hall_name}</div>
                                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                                                    <span className="text-3xl font-bold text-[var(--accent-primary)]">{allot.seat_number}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {result.allotments.length === 0 && (
                                    <div className="p-10 text-center text-[var(--text-muted)]">
                                        <div className="text-4xl mb-3">📋</div>
                                        <div className="font-medium mb-1">No seat allocations yet</div>
                                        <div className="text-sm">Check back after allotment is run.</div>
                                    </div>
                                )}
                            </StaggerContainer>
                        </div>
                    </FadeIn>
                )}
            </div>
        </div>
    );
}
