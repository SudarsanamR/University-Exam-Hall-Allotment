"use client";

import { useEffect, useState } from "react";
import { FadeIn, StaggerContainer, CountUp, GlowCard } from "../components/Animations";

interface Stats {
    halls: number;
    students: number;
    exams: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ halls: 0, students: 0, exams: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [hallsRes, studentsRes, examsRes] = await Promise.all([
                    fetch("/api/halls"),
                    fetch("/api/students?limit=1"),
                    fetch("/api/exams?limit=1")
                ]);

                const halls = hallsRes.ok ? await hallsRes.json() : [];
                setStats({
                    halls: Array.isArray(halls) ? halls.length : 0,
                    students: studentsRes.ok ? (await studentsRes.json()).length || 0 : 0,
                    exams: examsRes.ok ? (await examsRes.json()).length || 0 : 0
                });
            } catch {
                // Silent fail
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            {/* Header */}
            <FadeIn>
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">Dashboard</h1>
                    <p className="text-[var(--text-muted)]">Overview of your exam management system</p>
                </div>
            </FadeIn>

            {/* Stats Grid */}
            <StaggerContainer stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Halls Card */}
                <GlowCard className="stat-card group cursor-default">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Exam Halls</p>
                            <p className="text-4xl font-bold text-[var(--text-primary)]">
                                {loading ? "..." : <CountUp end={stats.halls} duration={1.5} />}
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                            🏛️
                        </div>
                    </div>
                </GlowCard>

                {/* Students Card */}
                <GlowCard className="stat-card group cursor-default">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Students Parsed</p>
                            <p className="text-4xl font-bold text-[var(--text-primary)]">
                                {loading ? "..." : <CountUp end={stats.students} duration={1.5} suffix={stats.students > 0 ? "+" : ""} />}
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                            👥
                        </div>
                    </div>
                </GlowCard>

                {/* Exams Card */}
                <GlowCard className="stat-card group cursor-default">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Exams Scheduled</p>
                            <p className="text-4xl font-bold text-[var(--text-primary)]">
                                {loading ? "..." : <CountUp end={stats.exams} duration={1.5} suffix={stats.exams > 0 ? "+" : ""} />}
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                            📅
                        </div>
                    </div>
                </GlowCard>
            </StaggerContainer>

            {/* Welcome Banner */}
            <FadeIn delay={0.3}>
                <div
                    className="glass-card p-8 mb-8 border border-[rgba(0,212,255,0.1)]"
                    style={{ background: "linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)" }}
                >
                    <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-3xl flex-shrink-0">
                            👋
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                                Welcome to ExamFlow
                            </h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                                Get started by uploading your exam <span className="text-[var(--accent-primary)] font-medium">Timetable PDFs</span> and <span className="text-[var(--accent-primary)] font-medium">Student Registration PDFs</span>. Then configure halls and run the auto-allotment algorithm.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="/admin/upload" className="btn btn-primary">
                                    <span>📤</span>
                                    Upload Data
                                </a>
                                <a href="/admin/halls" className="btn btn-secondary">
                                    <span>🏛️</span>
                                    Configure Halls
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>

            {/* Quick Actions */}
            <FadeIn delay={0.4}>
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Quick Actions</h2>
            </FadeIn>
            <StaggerContainer stagger={0.1} delay={0.5} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="/admin/allotment" className="group">
                    <GlowCard className="glass-card p-6 flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                            ⚡
                        </div>
                        <div>
                            <div className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-tertiary)] transition-colors">Run Auto-Allotment</div>
                            <div className="text-sm text-[var(--text-muted)]">Generate seating plan automatically</div>
                        </div>
                        <svg className="w-5 h-5 text-[var(--text-muted)] ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </GlowCard>
                </a>
                <a href="/admin/results" className="group">
                    <GlowCard className="glass-card p-6 flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                            📋
                        </div>
                        <div>
                            <div className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-warning)] transition-colors">View & Export Results</div>
                            <div className="text-sm text-[var(--text-muted)]">Download PDF or Excel reports</div>
                        </div>
                        <svg className="w-5 h-5 text-[var(--text-muted)] ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </GlowCard>
                </a>
            </StaggerContainer>
        </div>
    );
}
