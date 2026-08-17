"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import {
  NAV,
  EMAIL,
  Magnetic,
  useLenis,
  socialData,
  AnchorButton,
  ScrambleText,
} from "@/shared";

const MARQUEE_WORDS = [
  "Let's build something great",
  "Open for collaborations",
  "Front-end · Motion · UI",
];

export const Footer: React.FC = () => {
  const { scrollTo } = useLenis();

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
    <footer id="footer" className="relative z-10">

      <div className="relative flex overflow-hidden border-y border-line bg-surface py-5">
        <div className="animate-marquee flex shrink-0 [--marquee-duration:38s]">

          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {MARQUEE_WORDS.map((word) => (
                <span
                  key={`${copy}-${word}`}
                  className="flex shrink-0 items-center gap-6 whitespace-nowrap px-6 font-display text-xl font-bold text-fg-muted sm:text-3xl"
                >
                  {word}
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4 } }}
        className="relative overflow-hidden bg-bg-elevated text-fg"
      >

        <div
          className="pointer-events-none absolute inset-0 [background-size:20px_20px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--grid) 1px, transparent 0)",
          }}
        />

        <div className="relative mx-auto max-w-[1400px] px-6 py-16 sm:px-10 xl:px-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              className="md:col-span-2 [transform-style:preserve-3d]"
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
                t.style.transform = `rotateX(${(-cy / r.height) * 6}deg) rotateY(${
                  (cx / r.width) * 6
                }deg)`;
              }}
            >
              <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Let’s build something great
              </h3>

              <p className="mt-3 max-w-sm text-sm text-fg-muted">
                Frontend, motion, and delightful interactions. Drop me a line —
                I’m open for collaborations.
              </p>

              <a
                href={`mailto:${EMAIL}`}
                className="mt-6 inline-block font-mono text-sm text-accent"
              >
                <ScrambleText text={EMAIL} />
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h4 className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-fg-subtle">
                Navigation
              </h4>

              <div className="flex flex-col space-y-3">
                {NAV.map((item) => (
                  <AnchorButton
                    key={item.id}
                    href={`#${item.id}`}
                    whileHover={{ x: 3 }}
                    className="group text-sm text-fg-muted hover:text-fg"
                    motionSpanClass="flex flex-row items-center gap-2"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent/80 transition-all duration-300 ease-out group-hover:w-full" />
                    </span>
                  </AnchorButton>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h4 className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-fg-subtle">
                Elsewhere
              </h4>

              <div className="flex flex-wrap items-center gap-3">
                {socialData.map((s, idx) => (
                  <motion.a
                    key={s.id}
                    href={s.href}
                    rel="noreferrer"
                    aria-label={s.label}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    whileHover={{ y: -3 }}
                    viewport={{ once: true }}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.35 }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-fg-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <s.Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
            className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center"
          >
            <p>© {year} — .Hrytsenko Danylo’s portfolio</p>

            <div className="flex items-center gap-6">
              <p className="hidden sm:block">Developed and designed by .Hrytsenko</p>

              <Magnetic>
                <button
                  onClick={() => scrollTo(0)}
                  aria-label="Back to top"
                  data-cursor-text="top"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};
