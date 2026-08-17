"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import {
  useIsPointerFine,
  usePrefersReducedMotion,
} from "@/shared/lib/use-media-query";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, [data-cursor]';

export const CustomCursor = () => {
  const pointerFine = useIsPointerFine();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = pointerFine && !reducedMotion;

  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [variant, setVariant] = useState<"default" | "hover">("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.55 });

  useEffect(() => {

    document.body.dataset.customCursor = enabled ? "on" : "off";
    return () => {
      delete document.body.dataset.customCursor;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = (e.target as HTMLElement | null)?.closest?.(INTERACTIVE);
      setVariant(target ? "hover" : "default");
      setLabel(
        target instanceof HTMLElement
          ? target.dataset.cursorText ?? null
          : null
      );
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = label ? 72 : variant === "hover" ? 56 : 34;

  return (
    <>

      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[150] hidden lg:block"
      >
        <motion.div
          className="flex items-center justify-center rounded-full border-2 border-accent text-[10px] font-bold uppercase tracking-wider text-accent"
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: visible ? 1 : 0,
            scale: pressed ? 0.82 : 1,
            x: -ringSize / 2,
            y: -ringSize / 2,
            backgroundColor: label
              ? "rgb(16 185 129 / 0.14)"
              : "rgb(16 185 129 / 0)",
          }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
        >
          {label}
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[151] hidden lg:block"
      >
        <motion.div
          className="rounded-full bg-accent"
          animate={{
            width: variant === "hover" ? 0 : 6,
            height: variant === "hover" ? 0 : 6,
            opacity: visible ? 1 : 0,
            x: variant === "hover" ? 0 : -3,
            y: variant === "hover" ? 0 : -3,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 34 }}
        />
      </motion.div>
    </>
  );
};
