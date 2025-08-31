"use client";

import React, { useRef } from "react";
import { Mail, GithubIcon, LinkedinIcon } from "lucide-react";
import {
  motion,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";

import { socialData, AnchorButton } from "@/shared";

export const Footer: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 300, damping: 40, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 300, damping: 40, mass: 0.6 });
  const glowBG = useMotionTemplate`radial-gradient(600px 600px at ${smx}px ${smy}px, rgba(16, 185, 129, 0.35), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const year = new Date().getFullYear();

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  } as const;

  return (
    <footer id="footer">
      <motion.div
        ref={wrapperRef}
        initial={{ opacity: 0 }}
        onMouseMove={handleMouseMove}
        animate={{ opacity: 1, transition: { duration: 0.4 } }}
        className="relative overflow-hidden border-t border-white/10 bg-[rgba(10,10,12,0.9)] text-white"
      >
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -inset-[40%] opacity-60 will-change-transform"
            style={{ background: glowBG }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#b2b2b22c,transparent_1px)] [background-size:20px_20px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              className="[transform-style:preserve-3d]"
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "rotateX(0deg) rotateY(0deg)";
              }}
              onMouseMove={(e) => {
                const t = e.currentTarget as HTMLDivElement;
                const r = t.getBoundingClientRect();
                const cx = e.clientX - r.left - r.width / 2;
                const cy = e.clientY - r.top - r.height / 2;
                const rx = (-cy / r.height) * 6;
                const ry = (cx / r.width) * 6;
                t.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
              }}
            >
              <h3 className="text-2xl font-bold tracking-tight">
                Let’s build something great
              </h3>

              <p className="mt-3 max-w-xs text-sm text-white/70">
                Frontend, motion, and delightful interactions. Drop me a line —
                I’m open for collaborations.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/60">
                Navigation
              </h4>

              <div className="flex flex-col space-y-3">
                {[
                  { href: "#hero-section", label: "Welcome" },
                  { href: "#about-section", label: "About" },
                  { href: "#skills-section", label: "Skills" },
                  { href: "#projects-section", label: "Projects" },
                ].map((i) => (
                  <AnchorButton
                    key={i.href}
                    href={i.href}
                    whileHover={{ x: 2 }}
                    className="group text-white/80 hover:text-white"
                    motionSpanClass="flex flex-row gap-2 items-center"
                    transition={{
                      damping: 20,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <span className="relative">
                      {i.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-emerald-500/80 transition-all duration-300 ease-out group-hover:w-full" />
                    </span>

                    <motion.svg
                      initial={{ x: 0 }}
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      whileHover={{ x: 4 }}
                      transition={{
                        damping: 18,
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      <path d="M12.293 3.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L14 7.414V17a1 1 0 11-2 0V7.414l-3.293 3.293A1 1 0 017.293 8.293l5-5z" />
                    </motion.svg>
                  </AnchorButton>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-2"
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/60">
                Stay in the loop
              </h4>

              <div className="mt-6 flex items-center gap-4">
                {socialData.map((s, idx) => (
                  <motion.a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2 }}
                    viewport={{ once: true }}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.35 }}
                    className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5"
                  >
                    <span className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-300 ease-out group-hover:translate-y-0" />

                    <s.Icon className="relative text-sm font-medium text-white/80" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
            className="mt-12 flex flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row"
          >
            <p>© {year} — .Hrytsenko Danylo's portfolio</p>
            <p>Developed and designed by .Hrytsenko</p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};
