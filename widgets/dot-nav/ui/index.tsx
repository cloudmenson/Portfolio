"use client";

import { motion } from "framer-motion";

import { cn, NAV, useLenis, useActiveSection } from "@/shared";

const NAV_IDS = NAV.map((item) => item.id);

/** Fixed rail of section markers on the right edge of wide viewports. */
export const DotNav = () => {
  const { scrollTo } = useLenis();
  const active = useActiveSection(NAV_IDS);

  return (
    <motion.nav
      aria-label="Section navigation"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      className="fixed right-6 top-1/2 z-[90] hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex"
    >
      {NAV.map((item) => {
        const isActive = active === item.id;

        return (
          <button
            key={item.id}
            aria-current={isActive}
            aria-label={`Go to ${item.label}`}
            onClick={() => scrollTo(`#${item.id}`, -80)}
            className="group flex items-center gap-3"
          >
            <span
              className={cn(
                "text-xs font-medium opacity-0 transition-all duration-300 group-hover:opacity-100",
                isActive ? "text-accent" : "text-fg-muted"
              )}
            >
              {item.label}
            </span>

            <span
              className={cn(
                "block rounded-full transition-all duration-300",
                isActive
                  ? "h-2.5 w-2.5 bg-accent"
                  : "h-2 w-2 bg-line-strong group-hover:bg-fg-muted"
              )}
            />
          </button>
        );
      })}
    </motion.nav>
  );
};
