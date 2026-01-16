"use client";

import Link from "next/link";
import { FadeIn, MagneticButton, AnimatedText, StaggerContainer } from "./components/Animations";
import { GradientMesh, NoiseTexture, SpotlightCursor } from "./components/Effects";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Premium Background Effects */}
      <GradientMesh />
      <SpotlightCursor />
      <NoiseTexture opacity={0.02} />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <FadeIn delay={0.2} direction="none">
          <div className="mb-8">
            <MagneticButton strength={0.2}>
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/30 p-[2px]">
                <div className="w-full h-full rounded-3xl bg-[var(--bg-primary)] flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </MagneticButton>
          </div>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.4}>
          <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight">
            <AnimatedText className="text-gradient" delay={0.6}>ExamFlow</AnimatedText>
          </h1>
        </FadeIn>

        <FadeIn delay={0.6}>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-16 max-w-lg mx-auto font-light">
            Intelligent exam hall seat allocation for university examinations
          </p>
        </FadeIn>

        {/* Navigation Cards */}
        <StaggerContainer stagger={0.15} delay={0.8} className="flex flex-col sm:flex-row gap-6 justify-center">
          {/* Student Portal */}
          <Link href="/student" className="group">
            <MagneticButton strength={0.15}>
              <div className="glass-card px-8 py-8 w-80 text-left border border-[rgba(0,212,255,0.1)] hover:border-[rgba(0,212,255,0.3)] transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    🎓
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">Student Portal</h2>
                    <p className="text-sm text-[var(--text-muted)]">Find your seat</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Enter your registration number to instantly find your exam hall and seat.
                </p>
                <div className="flex items-center gap-2 text-[var(--accent-primary)] text-sm font-medium group-hover:gap-3 transition-all">
                  Search Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </MagneticButton>
          </Link>

          {/* Admin Dashboard */}
          <Link href="/admin" className="group">
            <MagneticButton strength={0.15}>
              <div
                className="glass-card px-8 py-8 w-80 text-left border border-[rgba(124,58,237,0.1)] hover:border-[rgba(124,58,237,0.3)] transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]"
                style={{ background: "linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(30, 30, 50, 0.7) 100%)" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    ⚡
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">Admin Dashboard</h2>
                    <p className="text-sm text-[var(--text-muted)]">Manage allotments</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Upload data, configure halls, run allocation, and generate reports.
                </p>
                <div className="flex items-center gap-2 text-[var(--accent-secondary)] text-sm font-medium group-hover:gap-3 transition-all">
                  Open Dashboard
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </MagneticButton>
          </Link>
        </StaggerContainer>

        {/* Footer */}
        <FadeIn delay={1.2}>
          <p className="mt-20 text-sm text-[var(--text-muted)] opacity-60">
            Built for Anna University Examinations
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
