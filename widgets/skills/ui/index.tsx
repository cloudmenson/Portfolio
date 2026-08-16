"use client";

import { useState } from "react";
import { GripHorizontal, RotateCcw } from "lucide-react";
import { motion, Reorder } from "framer-motion";

import { skills, Section, skillGroups, SectionHeading } from "@/shared";

export const SkillsSection = () => {
  const [items, setItems] = useState(skills);
  const reordered = items.join() !== skills.join();

  return (
    <Section id="skills-section">
      <SectionHeading
        index="02"
        title="Skills"
        subtitle="The tools I reach for, grouped by what they actually do."
      />

      <div className="mb-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, groupIdx) => (
          <motion.div
            key={group.id}
            viewport={{ once: true, margin: "-60px" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: groupIdx * 0.06 }}
            className="flex flex-col gap-4 bg-bg/60 p-6 backdrop-blur transition-colors hover:bg-bg-elevated/60"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              {group.label}
            </p>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line px-3 py-1 text-sm text-fg-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Playground — the original drag-to-reorder toy, kept as an easter egg */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm italic text-fg-subtle">
            <GripHorizontal className="h-4 w-4 text-accent" />
            Drag the chips below to reorder them — purely for fun.
          </p>

          {reordered && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setItems(skills)}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-fg-muted transition-colors hover:border-accent hover:text-accent"
            >
              <RotateCcw className="h-3 w-3" />
              Reset order
            </motion.button>
          )}
        </div>

        <Reorder.Group
          axis="x"
          values={items}
          onReorder={setItems}
          className="flex w-full flex-row flex-wrap justify-start gap-3"
        >
          {items.map((skill) => (
            <Reorder.Item
              key={skill}
              value={skill}
              whileDrag={{ scale: 1.08, cursor: "grabbing" }}
              className="cursor-grab rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-fg-muted backdrop-blur transition-colors hover:border-accent hover:text-accent"
            >
              {skill}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </Section>
  );
};
