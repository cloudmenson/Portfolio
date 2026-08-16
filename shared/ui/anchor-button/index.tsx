"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/shared/lib/cn";
import { useLenis } from "@/shared/ui/lenis-provider";

interface IAnchorButton extends React.ComponentProps<typeof motion.span> {
  /** In-page target, e.g. `#about-section`. */
  href: string;
  className?: string;
  children: ReactNode;
  motionSpanClass?: string;
  /** Extra offset applied to the scroll target, in px. */
  offset?: number;
}

export const AnchorButton = ({
  href,
  children,
  className,
  offset = -80,
  motionSpanClass,
  ...motionProps
}: IAnchorButton) => {
  const { scrollTo } = useLenis();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo(href, offset);
    // Keep the URL shareable without letting the browser jump the scroll.
    window.history.replaceState(null, "", href);
  };

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 text-lg font-medium",
        className
      )}
    >
      <motion.span className={motionSpanClass} {...motionProps}>
        {children}
      </motion.span>
    </a>
  );
};
