"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Command, Copy } from "lucide-react";

import {
  cn,
  Icons,
  EMAIL,
  Magnetic,
  useToast,
  socialData,
  DownloadLink,
  AnchorButton,
  ScrambleText,
  usePrefersReducedMotion,
} from "@/shared";

const ROTATING = ["interfaces", "animations", "design systems", "experiences"];

const STATS = [
  { value: "3+", label: "years building for the web" },
  { value: "20+", label: "shipped interfaces" },
  { value: "∞", label: "cups of coffee" },
];

export const HeroSection = () => {
  const { toast } = useToast();
  const [wordIndex, setWordIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(
      () => setWordIndex((i) => (i + 1) % ROTATING.length),
      2600
    );
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast({ message: "Email copied to clipboard", icon: <Copy /> });
    } catch {
      toast({ message: "Clipboard is blocked in this browser" });
    }
  };

  const letter = (char: string, idx: number, delay = 0, italic = false) => (
    <motion.span
      key={`${char}-${idx}`}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 400,
        opacity: { delay: delay + idx * 0.05 },
      }}
      className={cn(
        "inline-block select-none font-display text-5xl font-bold leading-[0.95] transition-colors duration-200 hover:text-accent sm:text-7xl md:text-8xl xl:text-[9rem]",
        italic && "italic"
      )}
    >
      {char}
    </motion.span>
  );

  return (
    <section
      id="hero-section"
      className="relative z-10 mx-auto flex w-full max-w-[1400px] scroll-mt-24 flex-col justify-center gap-14 px-6 pb-16 pt-14 sm:px-10 sm:pb-24 sm:pt-20 xl:min-h-[calc(100svh-88px)] xl:px-24"
    >
      <div className="flex flex-col items-start gap-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full">

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-fg-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for new projects
          </motion.div>

          <h1 className="mb-8 sm:mb-10">
            <span className="sr-only">
              Danylo Hrytsenko — Front-end developer
            </span>

            <span aria-hidden className="mb-3 flex flex-wrap items-center">
              {"Front-end".split("").map((char, idx) => letter(char, idx))}
            </span>

            <span
              aria-hidden
              className="flex flex-wrap items-center gap-x-2"
            >
              <motion.span
                className="inline-flex"
                viewport={{ once: true }}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.04, rotate: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ opacity: { delay: 0.5 } }}
              >
                <Icons.Code className="mr-3 h-12 w-16 rounded-2xl border-2 sm:mr-6 sm:h-16 sm:w-20 xl:h-24 xl:w-36 xl:rounded-[2rem] xl:border-4" />
              </motion.span>

              {"developer"
                .split("")
                .map((char, idx) => letter(char, idx, 0.5, true))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mb-10 flex flex-wrap items-baseline gap-x-2 text-lg text-fg-muted sm:text-2xl"
          >
            I build fast, accessible
            <span className="relative inline-grid h-[1.4em] overflow-hidden text-accent">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={ROTATING[wordIndex]}
                  exit={{ y: "-100%", opacity: 0 }}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="font-semibold"
                >
                  {ROTATING[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Magnetic>
              <a
                target="_blank"
                rel="noreferrer"
                data-cursor-text="say hi"
                href="https://t.me/cloudmenson"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-accent-contrast transition-colors hover:bg-accent-strong sm:px-8 sm:py-4 sm:text-xl"
              >
                Contact me
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </Magnetic>

            <Magnetic>
              <DownloadLink
                mount
                celebrate
                download
                target="_blank"
                rel="noreferrer"
                data-cursor-text="grab it"
                href="/cv/Danylo_Hrytsenko_Front-end.pdf"
                className="text-base sm:text-xl"
                rightIcon={
                  <span className="rounded-full bg-accent p-1 text-accent-contrast">
                    <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                }
              >
                Download CV
              </DownloadLink>
            </Magnetic>

            <button
              onClick={copyEmail}
              className="hidden items-center gap-2 font-mono text-sm text-fg-subtle transition-colors hover:text-accent lg:flex"
            >
              <Copy className="h-3.5 w-3.5" />
              <ScrambleText text={EMAIL} />
            </button>
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-between gap-10 sm:w-auto sm:flex-col sm:justify-center sm:gap-24">
          <div className="flex flex-row gap-6 sm:flex-col sm:gap-5">
            {socialData.map((soc, idx) => (
              <motion.a
                key={soc.id}
                href={soc.href}
                rel="noreferrer"
                aria-label={soc.label}
                data-cursor-text={soc.label}
                target={soc.href.startsWith("http") ? "_blank" : undefined}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.25, color: "var(--accent)" }}
                transition={{ opacity: { delay: 1.1 + idx * 0.12 } }}
                className="text-fg-muted"
              >
                <soc.Icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </motion.a>
            ))}
          </div>

          <AnchorButton
            href="#about-section"
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -8, 0] }}
            whileInView={{ opacity: 1 }}
            motionSpanClass="rounded-full border-2 border-line-strong p-3 text-fg-muted"
            transition={{
              duration: 1.6,
              repeat: Infinity,
              opacity: { delay: 2 },
            }}
          >
            <ArrowDown className="h-5 w-5" />
          </AnchorButton>
        </div>
      </div>

      <motion.div
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3"
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 bg-bg-elevated px-6 py-5"
          >
            <span className="font-display text-3xl font-bold text-accent">
              {stat.value}
            </span>
            <span className="text-sm text-fg-muted">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      <p className="hidden items-center gap-2 text-sm italic text-fg-subtle lg:flex">
        <Command className="h-3.5 w-3.5" />
        Press <kbd className="rounded border border-line px-1.5 font-mono not-italic">⌘K</kbd>
        for the command palette — or try the Konami code.
      </p>
    </section>
  );
};
