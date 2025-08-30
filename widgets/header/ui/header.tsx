"use client";

import { motion, Variants } from "framer-motion";

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
  return (
    <motion.header
      id="header"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="w-full flex flex-row items-center border-b border-emerald-900 px-30 py-6"
    >
      <motion.p
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl font-bold flex items-center gap-0.5"
      >
        <span className="text-emerald-500 select-none">.</span>
        Hrytsenko
      </motion.p>

      <motion.div className="flex flex-row gap-10 ml-auto text-l font-bold">
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
      </motion.div>
    </motion.header>
  );
};
