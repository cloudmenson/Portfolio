"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    mass: 0.2,
    damping: 30,
    stiffness: 220,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[130] h-0.5 origin-left bg-gradient-to-r from-accent via-accent-strong to-accent"
    />
  );
};
