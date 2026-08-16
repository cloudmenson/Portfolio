"use client";

import Lenis from "lenis";
import {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";

import { usePrefersReducedMotion } from "@/shared/lib/use-media-query";

type ScrollTo = (target: string | number, offset?: number) => void;

interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: ScrollTo;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
});

/**
 * Single source of truth for scrolling. Everything that moves the page goes
 * through `scrollTo` from here — a component calling `window.scrollTo`
 * directly would fight Lenis's own rAF loop and produce visible jitter.
 */
export const useLenis = () => useContext(LenisContext);

interface ILenisProvider {
  children: React.ReactNode;
}

export const LenisProvider = ({ children }: ILenisProvider) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = instance;
    setLenis(instance);

    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reducedMotion]);

  const scrollTo = useCallback<ScrollTo>((target, offset = 0) => {
    const instance = lenisRef.current;

    if (instance) {
      instance.scrollTo(target, { offset, duration: 1.1 });
      return;
    }

    // Reduced motion, or Lenis not mounted yet — fall back to the platform.
    const el =
      typeof target === "string" ? document.querySelector(target) : null;
    const top =
      typeof target === "number"
        ? target
        : el
        ? el.getBoundingClientRect().top + window.scrollY + offset
        : null;

    if (top !== null) window.scrollTo({ top, behavior: "auto" });
  }, []);

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
};
