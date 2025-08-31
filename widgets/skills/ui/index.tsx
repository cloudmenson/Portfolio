'use client';

import { useState } from "react";
import { motion, Reorder } from "framer-motion";

import { skills } from "@/shared";

export const SkillsSection = () => {
  const [items, setItems] = useState(skills);

  return (
    <section
      id="skills-section"
      className="w-full h-full flex flex-col gap-8 pt-10 pb-10 px-6 sm:gap-20 sm:pt-20 sm:pb-20 sm:px-10 xl:px-30"
    >
      <h2 className="text-3xl sm:text-7xl font-bold flex items-center gap-0.5">
        <span className="text-emerald-500 select-none">.</span>

        <div className="flex items-center gap-0.5 select-none">
          {"Skills".split("").map((char, idx) => (
            <motion.span
              key={`${char}-${idx}`}
              whileHover={{ y: -8 }}
              className="inline-block transition-colors duration-200 hover:text-emerald-500"
              transition={{
                damping: 10,
                type: "spring",
                stiffness: 400,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </h2>

      <p className="hidden sm:inline-block text-gray-400 text-sm italic select-none">
        💡 Tip: You can drag &amp; drop the skills to reorder them!
      </p>

      <Reorder.Group
        axis="x"
        values={items}
        onReorder={setItems}
        className="flex flex-row flex-wrap w-full max-w-[800px] gap-4 justify-start"
      >
        {items.map((skill, idx) => (
          <Reorder.Item
            key={skill}
            value={skill}
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="px-3 py-1 rounded-xl sm:px-4 sm:py-2 sm:rounded-full border border-white/50 text-white duration-100 hover:text-emerald-500 hover:border-emerald-500"
          >
            {skill}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </section>
  );
};
