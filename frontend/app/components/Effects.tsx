"use client";

import React, { useRef, useEffect } from "react";

interface FloatingOrbProps {
    color?: string;
    size?: number;
    position?: { top?: string; left?: string; right?: string; bottom?: string };
    delay?: number;
}

// Premium floating orb with smooth animation
export function FloatingOrb({
    color = "rgba(0, 212, 255, 0.2)",
    size = 400,
    position = { top: "20%", left: "10%" },
    delay = 0
}: FloatingOrbProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Animate with CSS animation
        el.style.animation = `floatOrb 8s ease-in-out ${delay}s infinite`;
    }, [delay]);

    return (
        <div
            ref={ref}
            className="floating-orb"
            style={{
                position: "absolute",
                width: size,
                height: size,
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                borderRadius: "50%",
                filter: "blur(60px)",
                pointerEvents: "none",
                ...position
            }}
        />
    );
}

// Animated gradient mesh background
export function GradientMesh() {
    return (
        <div className="gradient-mesh" style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0
        }}>
            <FloatingOrb color="rgba(124, 58, 237, 0.15)" size={500} position={{ top: "10%", right: "15%" }} delay={0} />
            <FloatingOrb color="rgba(0, 212, 255, 0.12)" size={400} position={{ bottom: "20%", left: "10%" }} delay={2} />
            <FloatingOrb color="rgba(16, 185, 129, 0.1)" size={350} position={{ top: "50%", left: "40%" }} delay={4} />

            {/* Grid overlay */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
                opacity: 0.5
            }} />

            <style jsx global>{`
                @keyframes floatOrb {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(30px, -20px) scale(1.05);
                    }
                    50% {
                        transform: translate(-20px, 20px) scale(0.95);
                    }
                    75% {
                        transform: translate(20px, 10px) scale(1.02);
                    }
                }
            `}</style>
        </div>
    );
}

interface NoisyBackgroundProps {
    opacity?: number;
}

// Subtle noise texture overlay for premium feel
export function NoiseTexture({ opacity = 0.03 }: NoisyBackgroundProps) {
    return (
        <div
            className="noise-texture"
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 9999,
                opacity,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
        />
    );
}

// Animated border gradient
export function AnimatedBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`animated-border-container ${className}`} style={{ position: "relative", padding: "1px" }}>
            <div
                className="animated-border"
                style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "inherit",
                    background: "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary), var(--accent-primary))",
                    backgroundSize: "300% 100%",
                    animation: "borderGradient 3s linear infinite",
                    opacity: 0.7
                }}
            />
            <div style={{
                position: "relative",
                background: "var(--bg-secondary)",
                borderRadius: "inherit",
                height: "100%"
            }}>
                {children}
            </div>
            <style jsx global>{`
                @keyframes borderGradient {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 300% 50%; }
                }
            `}</style>
        </div>
    );
}

// Shimmer loading effect
export function Shimmer({ className = "" }: { className?: string }) {
    return (
        <div
            className={`shimmer ${className}`}
            style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite"
            }}
        >
            <style jsx global>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>
        </div>
    );
}

// Spotlight cursor effect
export function SpotlightCursor() {
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const spotlight = spotlightRef.current;
        if (!spotlight) return;

        const handleMouseMove = (e: MouseEvent) => {
            spotlight.style.left = `${e.clientX}px`;
            spotlight.style.top = `${e.clientY}px`;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            ref={spotlightRef}
            style={{
                position: "fixed",
                width: 400,
                height: 400,
                background: "radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none",
                transform: "translate(-50%, -50%)",
                zIndex: 9998,
                transition: "opacity 0.3s ease"
            }}
        />
    );
}
