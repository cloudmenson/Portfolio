"use client";

import { FC } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/shared/lib/cn";

type ButtonProps = HTMLMotionProps<"button"> & {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Увімкнути анімацію появи */
  mount?: boolean;
  /** Увімкнути/вимкнути анімацію наведення */
  withHover?: boolean;
  /** Увімкнути/вимкнути анімацію кліку */
  withTap?: boolean;
  /** Масштаб при hover */
  hoverScale?: number;
  /** Масштаб при tap */
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
    ghost: "text-gray-900",
    primary: "bg-blue-600 text-white",
    secondary: "bg-gray-600 text-white",
    outline: "border-2 border-gray-300 text-gray-900 hover:border-emerald-500",
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
