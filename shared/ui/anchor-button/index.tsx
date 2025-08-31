"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/shared/lib/cn";

interface IAnchorButton extends React.ComponentProps<typeof motion.span> {
  href: string;
  className?: string;
  children: ReactNode;
  motionSpanClass?: string;
}

export const AnchorButton = ({
  href,
  children,
  className,
  motionSpanClass,
  ...motionProps
}: IAnchorButton) => {
  const anchorClass = cn(
    "inline-flex items-center gap-2 text-lg font-medium",
    className
  );

  function smoothScrollTo(targetY: number, duration = 1000) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let start: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const percent = Math.min(time / duration, 1);

      window.scrollTo(0, startY + diff * percent);

      if (time < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(y, 400);
    }
  };

  return (
    <Link onClick={onClick} href={href} className={anchorClass}>
      <motion.span className={motionSpanClass} {...motionProps}>
        {children}
      </motion.span>
    </Link>
  );
};
