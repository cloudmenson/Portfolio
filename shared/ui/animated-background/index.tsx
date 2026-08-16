"use client";

import { useEffect } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";

import {
  useIsPointerFine,
  usePrefersReducedMotion,
} from "@/shared/lib/use-media-query";

/**
 * Fixed backdrop for the whole page: a dot grid, two drifting accent blobs, a
 * cursor-following spotlight, and a film-grain layer. Purely decorative and
 * fully pointer-transparent.
 */
export const AnimatedBackground = () => {
  const pointerFine = useIsPointerFine();
  const reducedMotion = usePrefersReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.2);
  const smx = useSpring(mx, { stiffness: 60, damping: 30, mass: 0.8 });
  const smy = useSpring(my, { stiffness: 60, damping: 30, mass: 0.8 });

  const xPct = useTransform(smx, (v) => v * 100);
  const yPct = useTransform(smy, (v) => v * 100);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${xPct}% ${yPct}%, var(--glow), transparent 70%)`;

  useEffect(() => {
    if (!pointerFine || reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [pointerFine, reducedMotion, mx, my]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Dot grid, faded out toward the edges. */}
      <div
        className="absolute inset-0 [background-size:34px_34px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--grid) 1px, transparent 0)",
        }}
      />

      {/* Slow-drifting colour blobs. */}
      <div className="absolute -left-40 top-[-10%] h-[38rem] w-[38rem] rounded-full bg-accent/12 blur-[130px] animate-float-slow" />
      <div
        className="absolute -right-40 top-[45%] h-[32rem] w-[32rem] rounded-full bg-sky-500/8 blur-[130px] animate-float-slow"
        style={{ animationDelay: "-9s" }}
      />

      {pointerFine && !reducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-70"
          style={{ background: spotlight }}
        />
      )}

      {/* Film grain — an inline SVG so nothing extra is fetched. */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
};
