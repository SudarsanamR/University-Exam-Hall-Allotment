"use client";
import React, { useEffect, useState } from "react";
import { FadeIn, GlowCard } from "../../components/Animations";

interface Exam {
    id: number;
    date: string;
    session: string;
    subject_code: string;
    subject_name: string;
}

export default function ExamsPage() {
    const [exams, setExams] = useState<Exam[]>([]);
    const [codeFilter, setCodeFilter] = useState("");
    const [sessionFilter, setSessionFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(100);

    useEffect(() => {
        fetchExams();
    }, [page, pageSize]);

    const fetchExams = async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (codeFilter) params.append("subject_code", codeFilter);
        if (sessionFilter) params.append("session", sessionFilter);
        params.append("skip", String(page * pageSize));
        params.append("limit", String(pageSize));

        const res = await fetch(`/api/exams?${params.toString()}`);
        if (res.ok) {
            setExams(await res.json());
        }
        setLoading(false);
    };

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(0);
        fetchExams();
    };

    return (
        <div>
            {/* Header */}
            <FadeIn>
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">Exams</h1>
                    <p className="text-[var(--text-muted)]">View parsed exam schedule from timetables</p>
                </div>
            </FadeIn>

            {/* Filter Bar */}
            <FadeIn delay={0.1}>
                <GlowCard className="glass-card p-6 mb-8">
                    <form onSubmit={handleFilter} className="flex gap-4 items-end flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                            <label className="label mb-2">Subject Code</label>
                            <input
                                type="text"
                                value={codeFilter}
                                onChange={(e) => setCodeFilter(e.target.value)}
                                placeholder="e.g. CS25"
                                className="input"
                            />
                        </div>
                        <div className="w-40">
                            <label className="label mb-2">Session</label>
                            <select
                                value={sessionFilter}
                                onChange={(e) => setSessionFilter(e.target.value)}
                                className="select"
                            >
                                <option value="">All Sessions</option>
                                <option value="FN">FN (Morning)</option>
                                <option value="AN">AN (Afternoon)</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary h-[46px]">
                            <span>🔍</span>
                            Filter
                        </button>
                    </form>
                </GlowCard>
            </FadeIn>

            {/* Table */}
            <FadeIn delay={0.2}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Session</th>
                                <th>Code</th>
                                <th>Subject Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map((e) => (
                                <tr key={e.id}>
                                    <td className="text-[var(--text-primary)] font-medium">{e.date}</td>
                                    <td>
                                        <span className={`badge ${e.session === "FN" ? "badge-warning" : "badge-secondary"}`}>
                                            {e.session === "FN" ? "Morning" : "Afternoon"}
                                        </span>
                                    </td>
                                    <td className="font-mono text-[var(--accent-primary)]">{e.subject_code}</td>
                                    <td>{e.subject_name}</td>
                                </tr>
                            ))}
                            {!loading && exams.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-16 text-[var(--text-muted)]">
                                        <div className="text-5xl mb-4">📅</div>
                                        <div className="font-medium mb-2">No exams found</div>
                                        <div className="text-sm">Upload a Timetable PDF first.</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </FadeIn>

            {/* Pagination */}
            <FadeIn delay={0.3}>
                <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                        <span>
                            Showing {exams.length > 0 ? page * pageSize + 1 : 0} - {page * pageSize + exams.length}
                        </span>
                        <span>|</span>
                        <div className="flex items-center gap-2">
                            <span>Per page:</span>
                            <select
                                value={pageSize}
                                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(0); }}
                                className="select w-20 py-2 px-3 text-sm"
                            >
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                                <option value={500}>500</option>
                            </select>
                        </div>
                    </div>
                    <div className="pagination">
                        <button
                            onClick={() => setPage(Math.max(0, page - 1))}
                            disabled={page === 0}
                            className="page-btn"
                        >
                            ← Previous
                        </button>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={exams.length < pageSize}
                            className="page-btn"
                        >
                            Next →
                        </button>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
