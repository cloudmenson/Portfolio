"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { projects, DownloadLink } from "@/shared";
import PixelCard from "@/shared/ui/cards/pixel-card";

export const ProjectsSection = () => {
  return (
    <section
      id="projects-section"
      className="w-full h-full flex flex-col gap-8 pt-10 pb-10 px-6 sm:gap-20 sm:pt-20 sm:pb-20 sm:px-10 xl:px-30"
    >
      <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold flex items-center gap-0.5">
        <span className="text-emerald-500 select-none">.</span>

        <div className="flex items-center gap-0.5 select-none">
          {"Projects".split("").map((char, idx) => (
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

      <div className="flex flex-col">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="flex flex-col gap-5 border-t pt-10 pb-10 border-emerald-900 items-center justify-between lg:flex-row lg:items-center lg:gap-10"
          >
            <PixelCard variant="green">
              <Image
                loading="lazy"
                src={project.src}
                alt="My portfolio"
                className="absolute pointer-events-none w-full h-full object-cover left-0 top-0 z-[-1]"
              />
            </PixelCard>

            <div className="flex flex-col text-center w-full lg:text-start">
              <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>

              <p className="text-sm font-semibold mb-4">
                {project.description}
              </p>

              <div className="flex flow-row flex-wrap w-full gap-2 justify-center lg:justify-start">
                {project.skills.map((skill, idx) => (
                  <p
                    key={idx}
                    className="p-2 border border-white/50 rounded-full text-white text-sm font-normal"
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </div>

            <DownloadLink
              mount
              href={project.href}
              className="ml-auto text-base sm:text-3xl hover:text-emerald-500 duration-200"
              rightIcon={
                <div className="ml-1 rounded-4xl bg-emerald-500 text-black sm:ml-2">
                  <ArrowUpRight className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]" />
                </div>
              }
            >
              View
            </DownloadLink>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
