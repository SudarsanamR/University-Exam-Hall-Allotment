"use client";
import React, { useEffect, useState } from "react";
import { FadeIn, GlowCard } from "../../components/Animations";

interface Student {
    id: number;
    reg_no: string;
    name: string;
    department: string;
    year: string;
    subjects_registered: string[];
}

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [search, setSearch] = useState("");
    const [deptFilter, setDeptFilter] = useState("");
    const [subjectFilter, setSubjectFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);

    useEffect(() => {
        fetchStudents();
    }, [page, pageSize]);

    const fetchStudents = async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (deptFilter) params.append("department", deptFilter);
        if (subjectFilter) params.append("subject_code", subjectFilter);
        params.append("skip", String(page * pageSize));
        params.append("limit", String(pageSize));

        const res = await fetch(`/api/students?${params.toString()}`);
        if (res.ok) {
            setStudents(await res.json());
        }
        setLoading(false);
    };

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(0);
        fetchStudents();
    };

    return (
        <div>
            {/* Header */}
            <FadeIn>
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">Students</h1>
                    <p className="text-[var(--text-muted)]">View and filter parsed student registrations</p>
                </div>
            </FadeIn>

            {/* Filter Bar */}
            <FadeIn delay={0.1}>
                <GlowCard className="glass-card p-6 mb-8">
                    <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="label mb-2">Search (Reg No / Name)</label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="e.g. 731125104003"
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="label mb-2">Department</label>
                            <input
                                type="text"
                                value={deptFilter}
                                onChange={(e) => setDeptFilter(e.target.value)}
                                placeholder="e.g. Computer Science"
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="label mb-2">Subject Code</label>
                            <input
                                type="text"
                                value={subjectFilter}
                                onChange={(e) => setSubjectFilter(e.target.value)}
                                placeholder="e.g. CS25C01"
                                className="input"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary h-[46px]">
                            <span>🔍</span>
                            Apply Filters
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
                                <th>Reg No</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Subjects</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((s) => (
                                <tr key={s.id}>
                                    <td className="font-mono text-[var(--accent-primary)]">{s.reg_no}</td>
                                    <td className="font-medium text-[var(--text-primary)]">{s.name}</td>
                                    <td>{s.department}</td>
                                    <td>
                                        <div className="flex flex-wrap gap-1.5 max-w-md">
                                            {s.subjects_registered.slice(0, 5).map((sub) => (
                                                <span key={sub} className="badge badge-secondary text-xs">{sub}</span>
                                            ))}
                                            {s.subjects_registered.length > 5 && (
                                                <span className="badge badge-primary text-xs">+{s.subjects_registered.length - 5}</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!loading && students.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-16 text-[var(--text-muted)]">
                                        <div className="text-5xl mb-4">👥</div>
                                        <div className="font-medium mb-2">No students found</div>
                                        <div className="text-sm">Try adjusting filters or upload a Student List PDF first.</div>
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
                            Showing {students.length > 0 ? page * pageSize + 1 : 0} - {page * pageSize + students.length}
                        </span>
                        <span>|</span>
                        <div className="flex items-center gap-2">
                            <span>Per page:</span>
                            <select
                                value={pageSize}
                                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(0); }}
                                className="select w-20 py-2 px-3 text-sm"
                            >
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
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
                            disabled={students.length < pageSize}
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
