"use client";
import React, { useEffect, useState } from "react";
import { FadeIn, GlowCard, MagneticButton } from "../../components/Animations";

interface Allotment {
    id: number;
    student_reg: string;
    student_name: string;
    exam_subject: string;
    exam_date: string;
    hall_name: string;
    seat_number: number;
}

export default function ResultsPage() {
    const [data, setData] = useState<Allotment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const res = await fetch("/api/allotments");
            if (res.ok) {
                setData(await res.json());
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <FadeIn>
                <div className="flex justify-between items-start mb-10 flex-wrap gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">Results</h1>
                        <p className="text-[var(--text-muted)]">View and export seat allocations</p>
                    </div>
                    <div className="flex gap-3">
                        <MagneticButton strength={0.1}>
                            <a href="/api/reports/excel" className="btn btn-success">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Excel
                            </a>
                        </MagneticButton>
                        <MagneticButton strength={0.1}>
                            <a href="/api/reports/pdf" className="btn btn-danger">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                PDF
                            </a>
                        </MagneticButton>
                    </div>
                </div>
            </FadeIn>

            {/* Summary */}
            {data.length > 0 && (
                <FadeIn delay={0.1}>
                    <GlowCard className="glass-card p-5 mb-8 flex items-center gap-4 border border-[rgba(16,185,129,0.1)]">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center text-2xl">
                            ✓
                        </div>
                        <div>
                            <span className="text-2xl font-bold text-[var(--text-primary)]">{data.length}</span>
                            <span className="text-[var(--text-muted)] ml-2">seat allocations generated</span>
                        </div>
                    </GlowCard>
                </FadeIn>
            )}

            {/* Table */}
            <FadeIn delay={0.2}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Reg No</th>
                                <th>Name</th>
                                <th>Subject</th>
                                <th>Date</th>
                                <th>Hall</th>
                                <th>Seat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.id}>
                                    <td className="font-mono text-[var(--accent-primary)]">{row.student_reg}</td>
                                    <td className="font-medium text-[var(--text-primary)]">{row.student_name}</td>
                                    <td className="font-mono text-sm">{row.exam_subject}</td>
                                    <td>{row.exam_date}</td>
                                    <td>
                                        <span className="badge badge-secondary">{row.hall_name}</span>
                                    </td>
                                    <td>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[rgba(0,212,255,0.1)] text-[var(--accent-primary)] font-bold">
                                            {row.seat_number}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {!loading && data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-16 text-[var(--text-muted)]">
                                        <div className="text-5xl mb-4">📋</div>
                                        <div className="font-medium mb-2">No allotments found</div>
                                        <div className="text-sm">Run the allotment process first from the "Run Allotment" page.</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </FadeIn>
        </div>
    );
}
