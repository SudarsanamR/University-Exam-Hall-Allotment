"use client";
import React, { useState } from "react";
import { FadeIn, MagneticButton } from "../../components/Animations";

export default function AllotmentPage() {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [success, setSuccess] = useState(false);

    const runAllotment = async () => {
        setLoading(true);
        setLogs([]);
        setSuccess(false);
        try {
            const res = await fetch("/api/allot", { method: "POST" });
            const data = await res.json();
            if (data.status === "success" && data.log) {
                setLogs(data.log);
                setSuccess(true);
            } else {
                setLogs(["❌ Failed: " + (data.message || "Unknown error")]);
            }
        } catch {
            setLogs(["❌ Network Error - Check if backend is running"]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <FadeIn>
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">Run Allotment</h1>
                    <p className="text-[var(--text-muted)]">Execute the automatic seat allocation algorithm</p>
                </div>
            </FadeIn>

            {/* Action Card */}
            <FadeIn delay={0.1}>
                <div
                    className="glass-card p-10 text-center mb-8 border border-[rgba(16,185,129,0.1)]"
                    style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(30, 30, 50, 0.7) 100%)" }}
                >
                    <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-green-500/20 to-emerald-600/10 flex items-center justify-center text-5xl">
                        ⚡
                    </div>
                    <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
                        Ready to Generate Seating Plan?
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-10 max-w-lg mx-auto leading-relaxed">
                        This will process all configured exams and students, automatically assigning seats while ensuring no adjacent same-subject conflicts.
                    </p>

                    <MagneticButton strength={0.15}>
                        <button
                            onClick={runAllotment}
                            disabled={loading}
                            className={`btn text-lg px-12 py-5 ${loading ? "bg-[var(--bg-tertiary)] cursor-wait" : "btn-success shadow-lg shadow-green-500/20 hover:shadow-green-500/30"}`}
                        >
                            {loading ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Running Algorithm...
                                </>
                            ) : (
                                <>
                                    <span>🚀</span>
                                    Run Auto-Allotment
                                </>
                            )}
                        </button>
                    </MagneticButton>
                </div>
            </FadeIn>

            {/* Terminal Log */}
            {logs.length > 0 && (
                <FadeIn>
                    <div className="terminal">
                        <div className="terminal-header">
                            <div className="terminal-dot bg-[#ff5f56]"></div>
                            <div className="terminal-dot bg-[#ffbd2e]"></div>
                            <div className="terminal-dot bg-[#27ca40]"></div>
                            <span className="text-[var(--text-muted)] text-sm ml-4 font-medium">Allotment Log</span>
                            {success && (
                                <span className="ml-auto badge badge-success text-xs">Complete</span>
                            )}
                        </div>
                        <div className="terminal-body">
                            {logs.map((log, i) => (
                                <div key={i} className="py-0.5 font-mono">{log}</div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            )}

            {/* Info Cards */}
            <FadeIn delay={0.2}>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-card p-5 flex items-center gap-4">
                        <span className="text-3xl">📋</span>
                        <div>
                            <div className="font-medium text-[var(--text-primary)]">Prerequisites</div>
                            <div className="text-sm text-[var(--text-muted)]">Students, Exams & Halls</div>
                        </div>
                    </div>
                    <div className="glass-card p-5 flex items-center gap-4">
                        <span className="text-3xl">🔀</span>
                        <div>
                            <div className="font-medium text-[var(--text-primary)]">Algorithm</div>
                            <div className="text-sm text-[var(--text-muted)]">No adjacent same subjects</div>
                        </div>
                    </div>
                    <div className="glass-card p-5 flex items-center gap-4">
                        <span className="text-3xl">📊</span>
                        <div>
                            <div className="font-medium text-[var(--text-primary)]">Output</div>
                            <div className="text-sm text-[var(--text-muted)]">View in Results page</div>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
