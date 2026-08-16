"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sun,
  Moon,
  Mail,
  Send,
  Copy,
  Phone,
  Search,
  Github,
  Sparkles,
  Linkedin,
  CornerDownLeft,
  FileDown,
  ArrowRight,
} from "lucide-react";

import { cn } from "@/shared/lib/cn";
import { useToast } from "@/shared/ui/toast";
import { fireConfetti } from "@/shared/lib/confetti";
import { NAV } from "@/shared/config/site";
import { EMAIL, PHONE } from "@/shared/config/constants";
import { useTheme } from "@/shared/ui/theme-provider";
import { useLenis } from "@/shared/ui/lenis-provider";
import { COMMAND_PALETTE_EVENT } from "@/shared/lib/command-palette-bus";

interface Command {
  id: string;
  label: string;
  group: "Navigation" | "Actions" | "Links";
  hint?: string;
  keywords?: string;
  Icon: React.ComponentType<{ className?: string }>;
  run: () => void;
}

/**
 * ⌘K launcher. Every action the site offers — jumping to a section, copying
 * contact details, switching theme — is reachable from here without a mouse.
 */
export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();
  const { lenis, scrollTo } = useLenis();
  const { theme, toggleTheme } = useTheme();

  const copy = async (value: string, message: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({ message, icon: <Copy /> });
    } catch {
      toast({ message: "Clipboard is blocked in this browser" });
    }
  };

  const commands = useMemo<Command[]>(() => {
    const navCommands: Command[] = NAV.map((item) => ({
      id: `nav-${item.id}`,
      label: `Go to ${item.label}`,
      group: "Navigation",
      keywords: item.label,
      Icon: ArrowRight,
      run: () => scrollTo(`#${item.id}`, -80),
    }));

    return [
      ...navCommands,
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        hint: EMAIL,
        keywords: "mail contact",
        Icon: Mail,
        run: () => copy(EMAIL, "Email copied to clipboard"),
      },
      {
        id: "copy-phone",
        label: "Copy phone number",
        group: "Actions",
        hint: PHONE,
        keywords: "call tel",
        Icon: Phone,
        run: () => copy(PHONE, "Phone number copied"),
      },
      {
        id: "download-cv",
        label: "Download CV",
        group: "Actions",
        hint: "PDF",
        keywords: "resume pdf",
        Icon: FileDown,
        run: () => {
          window.open("/cv/Danylo_Hrytsenko_Front-end.pdf", "_blank");
          fireConfetti({ x: 0.5, y: 0.45 });
        },
      },
      {
        id: "toggle-theme",
        label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        group: "Actions",
        keywords: "dark light appearance colour color",
        Icon: theme === "dark" ? Sun : Moon,
        run: toggleTheme,
      },
      {
        id: "confetti",
        label: "Throw confetti",
        group: "Actions",
        hint: "why not",
        keywords: "party fun celebrate",
        Icon: Sparkles,
        run: () => fireConfetti({ x: 0.5, y: 0.5 }, 180),
      },
      {
        id: "github",
        label: "Open GitHub",
        group: "Links",
        Icon: Github,
        run: () => window.open("https://github.com/cloudmenson", "_blank"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        group: "Links",
        Icon: Linkedin,
        run: () =>
          window.open(
            "https://www.linkedin.com/in/hrytsenko-danylo/",
            "_blank"
          ),
      },
      {
        id: "telegram",
        label: "Open Telegram",
        group: "Links",
        Icon: Send,
        run: () => window.open("https://t.me/cloudmenson", "_blank"),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, toggleTheme, scrollTo]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;

    return commands.filter((c) =>
      `${c.label} ${c.keywords ?? ""} ${c.hint ?? ""}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Open / close shortcut, registered once for the lifetime of the page.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };

    const onRequestOpen = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(COMMAND_PALETTE_EVENT, onRequestOpen);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(COMMAND_PALETTE_EVENT, onRequestOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    setQuery("");
    setActive(0);

    // Lenis owns the scroll position, so `overflow: hidden` on <body> would
    // not stop it — the instance has to be paused directly.
    lenis?.stop();
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const runCommand = (command: Command) => {
    setOpen(false);
    // Let the overlay unmount first so scroll locking is already released.
    requestAnimationFrame(command.run);
  };

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    }
    if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      runCommand(results[active]);
    }
  };

  let renderedGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[140] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-bg-elevated shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-fg-subtle" />

              <input
                autoFocus
                value={query}
                aria-label="Search commands"
                onKeyDown={onInputKeyDown}
                placeholder="Search sections, actions, links…"
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent py-4 text-sm text-fg outline-none placeholder:text-fg-subtle"
              />

              <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle sm:block">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-fg-subtle">
                  Nothing matches “{query}”.
                </p>
              )}

              {results.map((command, idx) => {
                const showGroup = command.group !== renderedGroup;
                renderedGroup = command.group;

                return (
                  <div key={command.id}>
                    {showGroup && (
                      <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
                        {command.group}
                      </p>
                    )}

                    <button
                      data-index={idx}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => runCommand(command)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        idx === active
                          ? "bg-accent/12 text-fg"
                          : "text-fg-muted"
                      )}
                    >
                      <command.Icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          idx === active ? "text-accent" : "text-fg-subtle"
                        )}
                      />

                      <span className="flex-1 truncate">{command.label}</span>

                      {command.hint && (
                        <span className="hidden truncate font-mono text-[11px] text-fg-subtle sm:block">
                          {command.hint}
                        </span>
                      )}

                      {idx === active && (
                        <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-accent" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-fg-subtle">
              <span>↑ ↓ to navigate · ↵ to select</span>
              <span>{results.length} results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
