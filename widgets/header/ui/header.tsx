"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";

import { cn } from "@/shared";
import { EMAIL, PHONE } from "@/shared/config/constants";

const headerVariants: Variants = {
  hidden: { y: -60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 18, duration: 0.6 },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.15, duration: 0.4 },
  }),
};

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        id="header"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="w-full flex items-center justify-between border-b border-emerald-900 px-6 py-4 sm:px-10 xl:px-30 xl:py-6 xl:px-10"
      >
        <motion.p
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-bold flex items-center gap-0.5 text-2xl sm:text-3xl"
        >
          <span className="text-emerald-500 select-none">.</span>
          Hrytsenko
        </motion.p>

        <motion.nav
          initial="hidden"
          animate="visible"
          variants={linkVariants}
          className="hidden md:flex font-bold flex-row gap-6 lg:gap-10 text-base lg:text-lg"
        >
          <motion.a
            custom={0}
            initial="hidden"
            animate="visible"
            variants={linkVariants}
            href={`mailto:${EMAIL}`}
            className="relative group"
          >
            {EMAIL}

            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-emerald-500/80 transition-all duration-500 ease-out group-hover:w-full" />
          </motion.a>

          <motion.a
            custom={1}
            initial="hidden"
            animate="visible"
            href={`tel:${PHONE}`}
            variants={linkVariants}
            className="relative group"
          >
            {PHONE}

            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-emerald-500/80 transition-all duration-500 ease-out group-hover:w-full" />
          </motion.a>
        </motion.nav>

        {/* Mobile hamburger */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-emerald-900"
        >
          <span className="sr-only">Menu</span>

          <span
            className={cn(
              "relative block h-0.5 w-6 bg-emerald-500 transition-all duration-300",
              open && "translate-y-1.5 rotate-45"
            )}
          />
          <span
            className={cn(
              "relative block h-0.5 w-6 bg-emerald-500 transition-all duration-300 my-1",
              open ? "opacity-0" : "opacity-100"
            )}
          />
          <span
            className={cn(
              "relative block h-0.5 w-6 bg-emerald-500 transition-all duration-300",
              open && "-translate-y-1.5 -rotate-45"
            )}
          />
        </motion.button>
      </motion.header>

      <motion.div
        initial={false}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="md:hidden overflow-hidden border-b border-emerald-900"
        animate={
          open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
      >
        <div className="px-4 sm:px-6 md:px-10 lg:px-30 py-3 flex flex-col gap-3 text-base font-semibold">
          <a
            href={`mailto:${EMAIL}`}
            className="w-max active:text-emerald-500 transition-colors duration-0"
          >
            {EMAIL}
          </a>

          <a
            href={`tel:${PHONE}`}
            className="w-max active:text-emerald-500 transition-colors duration-0"
          >
            {PHONE}
          </a>
        </div>
      </motion.div>
    </>
  );
};
