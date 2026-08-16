"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/shared/lib/cn";
import { usePrefersReducedMotion } from "@/shared/lib/use-media-query";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

interface IScrambleText {
  text: string;
  className?: string;
  /** Decode on mount instead of waiting for a hover. */
  autoPlay?: boolean;
  /** Frames each character spends scrambling before it locks in. */
  speed?: number;
}

/**
 * Decodes `text` character by character, showing random glyphs until each
 * position settles. Falls back to plain text when motion is reduced.
 */
export const ScrambleText = ({
  text,
  className,
  speed = 2,
  autoPlay = false,
}: IScrambleText) => {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const stop = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const scramble = () => {
    if (reducedMotion) return;
    stop();
    frameRef.current = 0;

    const tick = () => {
      const frame = frameRef.current;

      const next = text
        .split("")
        .map((char, idx) => {
          if (char === " ") return " ";
          const settleAt = idx * speed + speed * 3;
          if (frame >= settleAt) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplay(next);
      frameRef.current += 1;

      if (next === text) {
        stop();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (autoPlay) scramble();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, text, reducedMotion]);

  return (
    <span
      onMouseEnter={scramble}
      className={cn("inline-block tabular-nums", className)}
    >
      {display}
    </span>
  );
};
