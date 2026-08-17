"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Mail, Phone, Send } from "lucide-react";

import {
  EMAIL,
  PHONE,
  Section,
  Magnetic,
  useToast,
  SectionHeading,
} from "@/shared";

const CONTACTS = [
  { id: "email", label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, Icon: Mail },
  { id: "phone", label: "Phone", value: PHONE, href: `tel:${PHONE}`, Icon: Phone },
  {
    id: "telegram",
    label: "Telegram",
    value: "@cloudmenson",
    href: "https://t.me/cloudmenson",
    Icon: Send,
  },
];

export const ContactSection = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const copy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      toast({ message: `${value} copied`, icon: <Copy /> });
      setTimeout(() => setCopied(null), 1800);
    } catch {
      toast({ message: "Clipboard is blocked in this browser" });
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio enquiry from ${form.name || "someone"}`
    );
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    toast({ message: "Opening your mail client…", icon: <Send /> });
  };

  const fieldClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-accent";

  return (
    <Section id="contact-section">
      <SectionHeading
        index="05"
        title="Contact"
        subtitle="Have a project, a role, or just want to say hi? Pick whichever is easiest."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div className="flex flex-col gap-3">
          {CONTACTS.map((contact, idx) => (
            <motion.div
              key={contact.id}
              viewport={{ once: true }}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-accent/40"
            >
              <span className="rounded-xl border border-line bg-surface p-3 text-accent">
                <contact.Icon className="h-5 w-5" />
              </span>

              <a
                href={contact.href}
                rel="noreferrer"
                className="min-w-0 flex-1"
                target={contact.href.startsWith("http") ? "_blank" : undefined}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-subtle">
                  {contact.label}
                </p>
                <p className="truncate text-sm font-semibold text-fg transition-colors group-hover:text-accent">
                  {contact.value}
                </p>
              </a>

              <button
                aria-label={`Copy ${contact.label}`}
                onClick={() => copy(contact.id, contact.value)}
                className="rounded-lg border border-line p-2 text-fg-subtle transition-colors hover:border-accent hover:text-accent"
              >
                {copied === contact.id ? (
                  <Check className="h-4 w-4 text-accent" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.form
          onSubmit={onSubmit}
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass flex flex-col gap-4 rounded-3xl p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-subtle">
                Name
              </span>
              <input
                required
                value={form.name}
                placeholder="Ada Lovelace"
                className={fieldClass}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-subtle">
                Email
              </span>
              <input
                required
                type="email"
                value={form.email}
                placeholder="ada@example.com"
                className={fieldClass}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-subtle">
              Message
            </span>
            <textarea
              required
              rows={5}
              value={form.message}
              placeholder="Tell me about the project…"
              className={`${fieldClass} resize-none`}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-fg-subtle">
              Opens a prefilled draft in your mail client.
            </p>

            <Magnetic>
              <button
                type="submit"
                data-cursor-text="send"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
              >
                Send message
                <Send className="h-4 w-4" />
              </button>
            </Magnetic>
          </div>
        </motion.form>
      </div>
    </Section>
  );
};
