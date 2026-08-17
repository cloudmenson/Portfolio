"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Star } from "lucide-react";

import {
  cn,
  Section,
  projects,
  TiltCard,
  projectKinds,
  SectionHeading,
  type Project,
} from "@/shared";

const ProjectCard = ({ project }: { project: Project }) => (
  <TiltCard maxTilt={4} spotlight={false} className="group h-full">

    <article className="relative isolate aspect-[4/5] overflow-hidden rounded-3xl bg-bg-elevated [transform:translateZ(0)]">
      <Image
        fill
        loading="lazy"
        src={project.src}
        alt={project.title}
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/85 via-40% to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/70 to-transparent to-30%" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[15] flex items-start justify-between gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-line-strong bg-bg/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fg-muted">
            {project.kind}
          </span>

          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-contrast">
              <Star className="h-2.5 w-2.5" />
              Featured
            </span>
          )}
        </div>

        <span className="shrink-0 font-mono text-xs text-fg-muted">
          {project.year}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] flex flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-end justify-between gap-3">
          <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">
            {project.title}
          </h3>

          <span className="shrink-0 rounded-full bg-accent p-2 text-accent-contrast transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-fg-muted">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-line-strong bg-bg/80 px-2.5 py-1 font-mono text-[10px] text-fg-muted"
            >
              {skill}
            </span>
          ))}

          {project.skills.length > 4 && (
            <span className="px-1.5 py-1 font-mono text-[10px] text-accent">
              +{project.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[16] rounded-[inherit] border border-line transition-colors duration-300 group-hover:border-accent/50"
      />

      <a
        target="_blank"
        rel="noreferrer"
        href={project.href}
        data-cursor-text="open"
        aria-label={`Open ${project.title}`}
        className="absolute inset-0 z-20 rounded-[inherit]"
      />

      {project.repo && (
        <a
          target="_blank"
          rel="noreferrer"
          href={project.repo}
          aria-label={`${project.title} source code`}
          className="absolute right-5 top-14 z-30 rounded-full border border-line-strong bg-bg/92 p-2 text-fg-muted transition-colors hover:border-accent hover:text-accent"
        >
          <Github className="h-4 w-4" />
        </a>
      )}
    </article>
  </TiltCard>
);

export const ProjectsSection = () => {
  const [kind, setKind] = useState("All");

  const visible = useMemo(
    () => (kind === "All" ? projects : projects.filter((p) => p.kind === kind)),
    [kind]
  );

  return (
    <Section id="projects-section">
      <SectionHeading
        index="04"
        title="Projects"
        subtitle="Things I designed, built and shipped — pick a category to filter."
      />

      <div className="mb-10 flex flex-wrap gap-2">
        {projectKinds.map((option) => (
          <button
            key={option}
            onClick={() => setKind(option)}
            className={cn(
              "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              kind === option
                ? "border-accent text-accent"
                : "border-line text-fg-muted hover:border-line-strong hover:text-fg"
            )}
          >
            {kind === option && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-accent/10"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{option}</span>
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, idx) => (
            <motion.div
              layout
              key={project.id}
              exit={{ opacity: 0, scale: 0.94 }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.45,
                delay: (idx % 3) * 0.08,
                layout: { duration: 0.35 },
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
};
