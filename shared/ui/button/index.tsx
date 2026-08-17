"use client";

import { FC } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/shared/lib/cn";

type ButtonProps = HTMLMotionProps<"button"> & {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "ghost";

  mount?: boolean;

  withHover?: boolean;

  withTap?: boolean;

  hoverScale?: number;

  tapScale?: number;
};

export const Button: FC<ButtonProps> = ({
  children,
  className,
  size = "md",
  mount = false,
  withTap = true,
  tapScale = 0.97,
  withHover = true,
  hoverScale = 1.03,
  variant = "primary",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-md";

  const variants: Record<string, string> = {
    ghost: "text-fg hover:text-accent",
    primary: "bg-accent text-accent-contrast hover:bg-accent-strong",
    secondary: "bg-surface-strong text-fg border border-line hover:border-accent",
    outline: "border-2 border-line-strong text-fg hover:border-accent hover:text-accent",
  };

  const sizes: Record<string, string> = {
    lg: "px-6 py-3 text-lg",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
  };

  return (
    <motion.button
      className={cn(base, variants[variant], sizes[size], className)}
      initial={mount ? { y: 6, opacity: 0 } : undefined}
      animate={mount ? { y: 0, opacity: 1 } : undefined}
      whileTap={withTap ? { scale: tapScale } : undefined}
      whileHover={withHover ? { scale: hoverScale } : undefined}
      transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.6 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
