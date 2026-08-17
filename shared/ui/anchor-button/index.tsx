"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/shared/lib/cn";
import { useLenis } from "@/shared/ui/lenis-provider";

interface IAnchorButton extends React.ComponentProps<typeof motion.span> {

  href: string;
  className?: string;
  children: ReactNode;
  motionSpanClass?: string;

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
