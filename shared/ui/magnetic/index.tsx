"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/shared/lib/cn";
import { usePrefersReducedMotion } from "@/shared/lib/use-media-query";

interface IMagnetic {
  children: React.ReactNode;
  className?: string;

  strength?: number;
}

export const Magnetic = ({
  children,
  className,
  strength = 18,
}: IMagnetic) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.5 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(relX * strength * 2);
    y.set(relY * strength * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseLeave={reset}
      onMouseMove={onMouseMove}
      style={{ x: springX, y: springY }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
};
