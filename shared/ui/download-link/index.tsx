"use client";

import React from "react";
import { motion } from "framer-motion";
import Link, { LinkProps } from "next/link";

import { cn } from "@/shared/lib/cn";

export interface DownloadLinkProps extends LinkProps {
  children: React.ReactNode;
  /** Іконка зліва від тексту */
  leftIcon?: React.ReactNode;
  /** Іконка справа від тексту */
  rightIcon?: React.ReactNode;
  /** Додаткові класи на зовнішній Link */
  className?: string;
  /** Анімація появи */
  mount?: boolean;
  /** Анімація при наведенні */
  withHover?: boolean;
  /** Анімація при кліку */
  withTap?: boolean;
  /** Масштабування при hover */
  hoverScale?: number;
  /** Масштабування при tap */
  tapScale?: number;
}

export const DownloadLink: React.FC<DownloadLinkProps> = ({
  href,
  children,
  leftIcon,
  rightIcon,
  className,
  mount = false,
  withTap = true,
  tapScale = 0.97,
  withHover = true,
  hoverScale = 1.03,
  ...linkProps
}) => {
  return (
    <Link
      href={href}
      {...linkProps}
      className={cn("group inline-flex items-center", className)}
    >
      <motion.span
        initial={mount ? { y: 6, opacity: 0 } : undefined}
        animate={mount ? { y: 0, opacity: 1 } : undefined}
        whileTap={withTap ? { scale: tapScale } : undefined}
        whileHover={withHover ? { scale: hoverScale } : undefined}
        transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.6 }}
        className={cn(
          "inline-flex items-center gap-2 italic font-extrabold tracking-wide"
        )}
      >
        {leftIcon && (
          <span className="inline-flex items-center justify-center">
            {leftIcon}
          </span>
        )}

        <span>{children}</span>

        {rightIcon && (
          <span className="inline-flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </motion.span>
    </Link>
  );
};
