'use client';

import { useEffect } from "react";
import Lenis from "lenis";

interface ILenisProvider {
  children: React.ReactNode;
}

export const LenisProvider = ({ children }: ILenisProvider) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
