"use client";

import { motion } from "framer-motion";

import { cn } from "@/shared/lib/cn";

interface ISection {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export const Section = ({ id, className, children }: ISection) => (
  <section
    id={id}
    className={cn(
      "relative z-10 mx-auto w-full max-w-[1400px] scroll-mt-24 px-6 py-16 sm:px-10 sm:py-24 xl:px-24",
      className
    )}
  >
    {children}
  </section>
);

interface ISectionHeading {
  title: string;

  index?: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading = ({
  title,
  index,
  subtitle,
  className,
}: ISectionHeading) => (
  <div className={cn("mb-10 flex flex-col gap-3 sm:mb-16", className)}>
    {index && (
      <motion.span
        viewport={{ once: true }}
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-xs tracking-[0.35em] text-accent"
      >
        {index} —
      </motion.span>
    )}

    <h2 className="flex items-center gap-0.5 text-3xl font-bold sm:text-5xl lg:text-7xl">
      <span className="select-none text-accent">.</span>

      <span className="flex select-none items-center">
        {title.split("").map((char, idx) => (
          <motion.span
            key={`${char}-${idx}`}
            whileHover={{ y: -8 }}
            className="inline-block transition-colors duration-200 hover:text-accent"
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </h2>

    {subtitle && (
      <motion.p
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-2xl text-sm text-fg-muted sm:text-base"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);
