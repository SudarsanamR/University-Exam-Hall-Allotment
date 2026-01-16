"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface AnimatedTextProps {
    children: string;
    className?: string;
    delay?: number;
    stagger?: number;
}

// Split text animation - reveals text character by character
export function AnimatedText({ children, className = "", delay = 0, stagger = 0.03 }: AnimatedTextProps) {
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const chars = containerRef.current?.querySelectorAll(".char");
        if (chars) {
            gsap.fromTo(chars,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: stagger,
                    delay: delay,
                    ease: "power3.out"
                }
            );
        }
    }, [delay, stagger]);

    return (
        <span ref={containerRef} className={className}>
            {children.split("").map((char, i) => (
                <span key={i} className="char inline-block" style={{ opacity: 0 }}>
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
}

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
}

// Fade in animation with direction
export function FadeIn({ children, className = "", delay = 0, duration = 0.6, direction = "up" }: FadeInProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const directionMap = {
            up: { y: 30, x: 0 },
            down: { y: -30, x: 0 },
            left: { y: 0, x: 30 },
            right: { y: 0, x: -30 },
            none: { y: 0, x: 0 }
        };

        const { x, y } = directionMap[direction];

        gsap.fromTo(el,
            { opacity: 0, y, x },
            {
                opacity: 1,
                y: 0,
                x: 0,
                duration,
                delay,
                ease: "power3.out"
            }
        );
    }, [delay, duration, direction]);

    return (
        <div ref={ref} className={className} style={{ opacity: 0 }}>
            {children}
        </div>
    );
}

interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    stagger?: number;
    delay?: number;
}

// Container that staggers children animations
export function StaggerContainer({ children, className = "", stagger = 0.1, delay = 0 }: StaggerContainerProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const items = el.children;
        gsap.fromTo(items,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: stagger,
                delay,
                ease: "power3.out"
            }
        );
    }, [stagger, delay]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
}

// Magnetic hover effect for buttons
export function MagneticButton({ children, className = "", strength = 0.3 }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * strength,
                y: y * strength,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={ref} className={className} style={{ display: "inline-block" }}>
            {children}
        </div>
    );
}

interface GlowCardProps {
    children: ReactNode;
    className?: string;
}

// Card with animated glow effect that follows cursor
export function GlowCard({ children, className = "" }: GlowCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            el.style.setProperty("--glow-x", `${x}px`);
            el.style.setProperty("--glow-y", `${y}px`);
        };

        el.addEventListener("mousemove", handleMouseMove);
        return () => el.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            ref={ref}
            className={`glow-card ${className}`}
            style={{
                position: "relative",
                overflow: "hidden"
            }}
        >
            <div
                className="glow-effect"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "radial-gradient(circle 150px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(0, 212, 255, 0.15), transparent)",
                    pointerEvents: "none",
                    opacity: 0,
                    transition: "opacity 0.3s ease"
                }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
            <style jsx>{`
                .glow-card:hover .glow-effect {
                    opacity: 1;
                }
            `}</style>
        </div>
    );
}

interface CountUpProps {
    end: number;
    duration?: number;
    delay?: number;
    className?: string;
    suffix?: string;
}

// Animated count up for numbers
export function CountUp({ end, duration = 2, delay = 0, className = "", suffix = "" }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const obj = { value: 0 };
        gsap.to(obj, {
            value: end,
            duration,
            delay,
            ease: "power2.out",
            onUpdate: () => {
                el.textContent = Math.round(obj.value).toString() + suffix;
            }
        });
    }, [end, duration, delay, suffix]);

    return <span ref={ref} className={className}>0{suffix}</span>;
}

interface ParallaxProps {
    children: ReactNode;
    className?: string;
    speed?: number;
}

// Subtle parallax effect on scroll
export function Parallax({ children, className = "", speed = 0.5 }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            gsap.to(el, {
                y: scrollY * speed,
                duration: 0.1,
                ease: "none"
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
