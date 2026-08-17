"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import {
  Img,
  Emoji,
  Section,
  socialData,
  LottieEmoji,
  SectionHeading,
} from "@/shared";

const PARAGRAPHS = [
  {
    id: "start",
    emoji: Emoji.WaveEmoji,
    content: (
      <>
        Hi, I’m <span className="text-accent">Danylo</span>! I started my
        journey as a <span className="text-accent">Front-End Developer</span> at{" "}
        <span className="italic text-amber-400">Hillel IT School</span>, where I
        learned to build modern web apps, practiced teamwork, and explored
        application architecture and state management. That period gave me a
        strong foundation in React and collaboration, from Git versioning to
        real project discussions.
      </>
    ),
  },
  {
    id: "work",
    emoji: Emoji.RocketEmoji,
    content: (
      <>
        Later, I joined <span className="italic text-amber-400">NDA (iGaming)</span>
        , contributing to the development of a large-scale multi-module
        platform. There I worked closely with designers, backend developers, and
        product managers to deliver high-quality features, integrate APIs, and
        improve UI/UX across different modules. It was a true step up in
        building scalable, maintainable, and dynamic applications.
      </>
    ),
  },
  {
    id: "stack",
    emoji: Emoji.SparklesEmoji,
    content: (
      <>
        Alongside, I worked with tools like{" "}
        <span className="text-sky-400">React</span>,{" "}
        <span className="text-sky-400">Next.js</span>,{" "}
        <span className="text-sky-400">TailwindCSS</span>,{" "}
        <span className="text-sky-400">Framer Motion</span>,{" "}
        <span className="text-sky-400">MongoDB</span>, and{" "}
        <span className="text-sky-400">Firebase</span>. I enjoy turning Figma
        designs into pixel-perfect interfaces, focusing on performance,
        accessibility, and delightful user experiences.
      </>
    ),
  },
  {
    id: "life",
    emoji: Emoji.FireEmoji,
    content: (
      <>
        Outside of coding, I’m passionate about guitar, cats, gaming, and
        exploring new ideas in front-end. Always learning, always growing, and
        ready to collaborate on projects that inspire!
      </>
    ),
  },
];

export const AboutSection = () => {
  return (
    <Section id="about-section">
      <SectionHeading
        index="01"
        title="About"
        subtitle="A short version of how I got here and what I like to work on."
      />

      <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">

        <motion.aside
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass h-max rounded-3xl p-6 lg:sticky lg:top-28"
        >
          <div className="relative mb-5 aspect-square w-24 overflow-hidden rounded-2xl">
            <Image
              fill
              alt="Danylo Hrytsenko"
              src={Img.AboutAvatar}
              sizes="96px"
              className="object-cover"
            />
          </div>

          <p className="font-display text-xl font-bold">Danylo Hrytsenko</p>
          <p className="mb-4 text-sm text-fg-muted">Front-end developer</p>

          <p className="mb-6 flex items-center gap-1.5 text-sm text-fg-subtle">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            Ukraine · remote friendly
          </p>

          <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5">
            {socialData.map((soc) => (
              <motion.a
                key={soc.id}
                href={soc.href}
                rel="noreferrer"
                aria-label={soc.label}
                target={soc.href.startsWith("http") ? "_blank" : undefined}
                whileHover={{ y: -3, color: "var(--accent)" }}
                className="text-fg-muted"
              >
                <soc.Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </motion.aside>

        <div className="flex max-w-3xl flex-col gap-5 text-base leading-relaxed text-fg-muted sm:gap-6 sm:text-lg">
          {PARAGRAPHS.map((paragraph, idx) => (
            <motion.p
              key={paragraph.id}
              viewport={{ once: true, margin: "-80px" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <LottieEmoji
                animationData={paragraph.emoji}
                className="mr-2 inline-flex h-5 w-5 align-middle sm:h-6 sm:w-6"
              />
              {paragraph.content}
            </motion.p>
          ))}
        </div>
      </div>
    </Section>
  );
};
