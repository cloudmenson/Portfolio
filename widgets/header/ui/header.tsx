"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Command, Mail, Phone } from "lucide-react";

import {
  cn,
  NAV,
  EMAIL,
  PHONE,
  useLenis,
  ThemeToggle,
  useActiveSection,
  openCommandPalette,
} from "@/shared";

const headerVariants: Variants = {
  hidden: { y: -60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

const NAV_IDS = NAV.map((item) => item.id);

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollTo } = useLenis();
  const active = useActiveSection(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(`#${id}`, -80);
  };

  return (
    <motion.header
      id="header"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={cn(
        "sticky top-0 z-[100] w-full transition-all duration-300",
        scrolled
          ? "border-b border-line bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-6 py-4 sm:px-10 xl:px-24">
        <button
          onClick={() => go("hero-section")}
          className="flex shrink-0 items-center gap-0.5 text-2xl font-bold sm:text-3xl"
        >
          <span className="select-none text-accent">.</span>
          Hrytsenko
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                active === item.id
                  ? "text-fg"
                  : "text-fg-muted hover:text-fg"
              )}
            >
              {/* Shared layoutId lets the pill slide between items. */}
              {active === item.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full border border-accent/40 bg-accent/10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={openCommandPalette}
            aria-label="Open command palette"
            className="hidden items-center gap-2 rounded-full border border-line px-3 py-2 text-xs text-fg-muted transition-colors hover:border-accent hover:text-accent md:flex"
          >
            <Command className="h-3.5 w-3.5" />
            <span className="font-mono">K</span>
          </button>

          <ThemeToggle />

          <button
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-full border border-line lg:hidden"
          >
            <span
              className={cn(
                "block h-0.5 w-5 bg-accent transition-transform duration-300",
                open && "translate-y-1.5 rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-accent transition-opacity duration-300",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-accent transition-transform duration-300",
                open && "-translate-y-1.5 -rotate-45"
              )}
            />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4 sm:px-10">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={cn(
                    "w-full rounded-lg px-3 py-2.5 text-left text-base font-semibold transition-colors",
                    active === item.id
                      ? "bg-accent/10 text-accent"
                      : "text-fg-muted"
                  )}
                >
                  {item.label}
                </button>
              ))}

              <div className="mt-3 flex flex-col gap-3 border-t border-line pt-4 text-sm">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 text-fg-muted"
                >
                  <Mail className="h-4 w-4 text-accent" />
                  {EMAIL}
                </a>

                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center gap-2 text-fg-muted"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  {PHONE}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
