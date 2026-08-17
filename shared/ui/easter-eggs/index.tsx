"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";

import { useToast } from "@/shared/ui/toast";
import { useKonami } from "@/shared/lib/use-konami";
import { fireConfetti } from "@/shared/lib/confetti";

export const EasterEggs = () => {
  const { toast } = useToast();
  const [unlocked, setUnlocked] = useState(false);

  const onUnlock = useCallback(() => {
    setUnlocked(true);
    fireConfetti({ x: 0.5, y: 0.35 }, 220);
    toast({ message: "Chaos mode unlocked", icon: <Gamepad2 /> });
  }, [toast]);

  useKonami(onUnlock);

  useEffect(() => {
    if (!unlocked) return;

    const root = document.documentElement;
    const overrides: Record<string, string> = {
      "--accent": "#f472b6",
      "--accent-strong": "#fbbf24",
      "--glow": "rgb(244 114 182 / 0.35)",
    };

    Object.entries(overrides).forEach(([key, value]) =>
      root.style.setProperty(key, value)
    );

    const restore = () =>
      Object.keys(overrides).forEach((key) => root.style.removeProperty(key));

    const timeout = setTimeout(() => {
      restore();
      setUnlocked(false);
    }, 4200);

    return () => {
      clearTimeout(timeout);
      restore();
    };
  }, [unlocked]);

  return (
    <AnimatePresence>
      {unlocked && (
        <motion.div
          exit={{ opacity: 0, y: -20 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none fixed inset-x-0 top-6 z-[160] flex justify-center"
        >
          <span className="glass rounded-full px-5 py-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            ↑↑↓↓←→←→ B A
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
