"use client";
import React, { useState, useEffect } from "react";
import { FadeIn, GlowCard, MagneticButton } from "../../components/Animations";

interface Hall {
    id: number;
    name: string;
    capacity: number;
}

export default function HallManagementPage() {
    const [halls, setHalls] = useState<Hall[]>([]);
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHalls();
    }, []);

    const fetchHalls = async () => {
        setLoading(true);
        const res = await fetch("/api/halls");
        if (res.ok) {
            setHalls(await res.json());
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/halls", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, capacity: parseInt(capacity) }),
        });

        if (res.ok) {
            setName("");
            setCapacity("");
            fetchHalls();
        } else {
            alert("Failed to create hall");
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this hall?")) {
            await fetch(`/api/halls/${id}`, { method: "DELETE" });
            fetchHalls();
        }
    };

    return (
        <div>
            {/* Header */}
            <FadeIn>
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">Manage Halls</h1>
                    <p className="text-[var(--text-muted)]">Configure exam halls and their seating capacity</p>
                </div>
            </FadeIn>

            {/* Add Hall Form */}
            <FadeIn delay={0.1}>
                <GlowCard className="glass-card p-8 mb-8">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                        <span className="text-2xl">➕</span> Add New Hall
                    </h2>
                    <form onSubmit={handleSubmit} className="flex gap-4 items-end flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                            <label className="label mb-2">Hall Name / Number</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input"
                                placeholder="e.g. Room 101, Hall A"
                            />
                        </div>
                        <div className="w-40">
                            <label className="label mb-2">Capacity</label>
                            <input
                                type="number"
                                required
                                min="1"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                className="input"
                                placeholder="e.g. 30"
                            />
                        </div>
                        <MagneticButton strength={0.1}>
                            <button type="submit" className="btn btn-primary">
                                <span>🏛️</span>
                                Add Hall
                            </button>
                        </MagneticButton>
                    </form>
                </GlowCard>
            </FadeIn>

            {/* Halls Table */}
            <FadeIn delay={0.2}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Hall Name</th>
                                <th>Capacity</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {halls.map((hall) => (
                                <tr key={hall.id}>
                                    <td className="font-medium text-[var(--text-primary)]">{hall.name}</td>
                                    <td>
                                        <span className="badge badge-primary">{hall.capacity} Seats</span>
                                    </td>
                                    <td className="text-right">
                                        <button
                                            onClick={() => handleDelete(hall.id)}
                                            className="text-[var(--accent-danger)] hover:text-red-400 text-sm font-medium transition-colors hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!loading && halls.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="text-center py-16 text-[var(--text-muted)]">
                                        <div className="text-5xl mb-4">🏛️</div>
                                        <div className="font-medium mb-2">No halls configured yet</div>
                                        <div className="text-sm">Add your first hall using the form above.</div>
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
