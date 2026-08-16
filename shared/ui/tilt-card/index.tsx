"use client";

import { useRef } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";

import { cn } from "@/shared/lib/cn";
import { usePrefersReducedMotion } from "@/shared/lib/use-media-query";

interface ITiltCard {
  className?: string;
  children: React.ReactNode;
  /** Maximum rotation on each axis, in degrees. */
  maxTilt?: number;
  /** Draw the cursor-following highlight. */
  spotlight?: boolean;
}

/**
 * 3D-tilts toward the pointer and tracks a soft highlight under it. Both
 * effects are skipped entirely when the visitor prefers reduced motion.
 *
 * `perspective` lives on the outer wrapper and the rotation on the inner
 * element — putting both on one node applies the perspective to that node's
 * children instead of to its own rotation, which flattens the effect into a
 * skew. `preserve-3d` is deliberately absent: it pulls descendants into a 3D
 * rendering context, where browsers stop honouring `overflow: hidden` on
 * rounded corners and the artwork bleeds past the border radius.
 */
export const TiltCard = ({
  children,
  className,
  maxTilt = 9,
  spotlight = true,
}: ITiltCard) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 200, damping: 22, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(py, [0, 1], [maxTilt, -maxTilt]),
    spring
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-maxTilt, maxTilt]),
    spring
  );

  const glareX = useTransform(px, (v) => v * 100);
  const glareY = useTransform(py, (v) => v * 100);
  const glare = useMotionTemplate`radial-gradient(340px circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.13), transparent 65%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className={cn("[perspective:1200px]", className)}>
      <motion.div
        ref={ref}
        onMouseLeave={reset}
        onMouseMove={onMouseMove}
        className="relative h-full [will-change:transform]"
        style={reducedMotion ? undefined : { rotateX, rotateY }}
      >
        {children}

        {spotlight && !reducedMotion && (
          <motion.div
            aria-hidden
            style={{ background: glare }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </motion.div>
    </div>
  );
};
