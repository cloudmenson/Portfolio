"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import {
  useIsPointerFine,
  usePrefersReducedMotion,
} from "@/shared/lib/use-media-query";

const SPOTLIGHT = 900;

export const AnimatedBackground = () => {
  const pointerFine = useIsPointerFine();
  const reducedMotion = usePrefersReducedMotion();
  const showSpotlight = pointerFine && !reducedMotion;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 70, damping: 30, mass: 0.7 });
  const y = useSpring(my, { stiffness: 70, damping: 30, mass: 0.7 });

  useEffect(() => {
    if (!showSpotlight) return;

    mx.jump(window.innerWidth / 2 - SPOTLIGHT / 2);
    my.jump(window.innerHeight / 3 - SPOTLIGHT / 2);

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX - SPOTLIGHT / 2);
      my.set(e.clientY - SPOTLIGHT / 2);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [showSpotlight, mx, my]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >

      <div
        className="absolute inset-0 [background-size:34px_34px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--grid) 1px, transparent 0)",
        }}
      />

      <div
        className="animate-float-slow absolute -left-[18%] top-[-18%] h-[46rem] w-[46rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--blob-warm) 0%, transparent 68%)",
        }}
      />
      <div
        className="animate-float-slow absolute -right-[14%] top-[42%] h-[40rem] w-[40rem] rounded-full"
        style={{
          animationDelay: "-9s",
          background:
            "radial-gradient(circle, var(--blob-cool) 0%, transparent 68%)",
        }}
      />

      {showSpotlight && (
        <motion.div
          style={{
            x,
            y,
            width: SPOTLIGHT,
            height: SPOTLIGHT,
            background:
              "radial-gradient(circle, var(--glow) 0%, transparent 62%)",
          }}
          className="absolute left-0 top-0 rounded-full"
        />
      )}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
};
