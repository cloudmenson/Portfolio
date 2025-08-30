"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Img, projects, DownloadLink } from "@/shared";

export const ProjectsSection = () => {
  return (
    <section
      id="projects-section"
      className="w-full h-full flex flex-col gap-20 pt-20 pb-20 px-30"
    >
      <h2 className="text-7xl font-bold flex items-center gap-0.5 cursor-default">
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
            className="flex flex-row gap-10 border-t pt-5 pb-5 border-emerald-900 items-center justify-between"
          >
            <Image
              width={300}
              height="auto"
              loading="lazy"
              alt="My portfolio"
              src={Img.MyPortfolio}
              className="pointer-events-none"
            />

            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>

              <p className="text-sm font-semibold mb-4">
                {project.description}
              </p>

              <div className="flex flow-row flew-wrap w-full gap-2 justify-start">
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
              className="ml-auto text-3xl hover:text-emerald-500 duration-200"
              rightIcon={
                <div className="ml-2 rounded-4xl bg-emerald-500 text-black">
                  <ArrowUpRight width={30} height={30} />
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
