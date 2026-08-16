"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

import { Section, experience, SectionHeading } from "@/shared";

export const ExperienceSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  // The rail fills in as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 65%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    mass: 0.2,
    damping: 30,
    stiffness: 160,
  });

  return (
    <Section id="experience-section">
      <SectionHeading
        index="03"
        title="Experience"
        subtitle="Where I have worked and what I actually shipped there."
      />

      <div ref={trackRef} className="relative">
        {/* Rail */}
        <div className="absolute left-[7px] top-2 hidden h-full w-px bg-line sm:block">
          <motion.div
            style={{ scaleY }}
            className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent/20"
          />
        </div>

        <div className="flex flex-col gap-10 sm:gap-14">
          {experience.map((entry, idx) => (
            <motion.article
              key={entry.id}
              viewport={{ once: true, margin: "-80px" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative sm:pl-12"
            >
              {/* Node */}
              <span className="absolute left-0 top-2 hidden h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-accent bg-bg sm:flex">
                {!entry.end && (
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                )}
              </span>

              <div className="glass rounded-2xl p-6 transition-colors hover:border-accent/40 sm:p-8">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-xl font-bold sm:text-2xl">
                    {entry.role}
                  </h3>

                  <span className="font-mono text-xs text-accent">
                    {entry.period}
                  </span>
                </div>

                <p className="mb-4 text-sm font-semibold text-fg-muted">
                  {entry.company}
                  {!entry.end && (
                    <span className="ml-2 rounded-full bg-accent/12 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent">
                      current
                    </span>
                  )}
                </p>

                <p className="mb-5 text-sm leading-relaxed text-fg-muted sm:text-base">
                  {entry.summary}
                </p>

                <ul className="mb-6 flex flex-col gap-2">
                  {entry.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm text-fg-muted"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {entry.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
};
