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
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
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
