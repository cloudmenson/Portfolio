"use client";

import { useEffect, useRef } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export const useKonami = (onUnlock: () => void) => {
  const progress = useRef(0);
  const handler = useRef(onUnlock);

  useEffect(() => {
    handler.current = onUnlock;
  }, [onUnlock]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      const expected = SEQUENCE[progress.current];
      const pressed = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (pressed !== expected) {

        progress.current = pressed === SEQUENCE[0] ? 1 : 0;
        return;
      }

      progress.current += 1;

      if (progress.current === SEQUENCE.length) {
        progress.current = 0;
        handler.current();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
};
