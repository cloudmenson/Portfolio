"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/shared/lib/cn";
import { fireConfetti } from "@/shared/lib/confetti";

export interface DownloadLinkProps
  extends Omit<React.ComponentPropsWithoutRef<"a">, "ref"> {
  href: string;
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
  /** Салют з конфеті по кліку */
  celebrate?: boolean;
}

export const DownloadLink: React.FC<DownloadLinkProps> = ({
  href,
  onClick,
  children,
  leftIcon,
  rightIcon,
  className,
  mount = false,
  withTap = true,
  tapScale = 0.97,
  withHover = true,
  hoverScale = 1.03,
  celebrate = false,
  ...linkProps
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (celebrate) {
      // Burst from the link itself so the effect reads as caused by the click.
      const rect = e.currentTarget.getBoundingClientRect();
      fireConfetti({
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      });
    }

    onClick?.(e);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      {...linkProps}
      className={cn("group inline-flex", className)}
    >
      <motion.span
        initial={mount ? { y: 6, opacity: 0 } : undefined}
        animate={mount ? { y: 0, opacity: 1 } : undefined}
        whileTap={withTap ? { scale: tapScale } : undefined}
        whileHover={withHover ? { scale: hoverScale } : undefined}
        transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.6 }}
        className="inline-flex items-center gap-2 italic font-extrabold tracking-wide"
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
