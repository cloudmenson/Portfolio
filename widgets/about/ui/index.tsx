"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Img, Emoji, socialData, LottieEmoji } from "@/shared";

export const AboutSection = () => {
  return (
    <section
      id="about-section"
      className="w-full h-full flex flex-col gap-8 pt-10 pb-10 px-6 sm:gap-10 sm:gap-20 sm:pt-20 sm:pb-20 sm:px-10 xl:px-30"
    >
      <h2 className="gap-0.5 text-3xl sm:text-5xl lg:text-7xl font-bold flex items-center">
        <span className="text-emerald-500 select-none">.</span>

        <div className="flex items-center select-none">
          {"About".split("").map((char, idx) => (
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

      <div className="flex flex-col gap-8 sm:gap-12">
        <div className="flex flex-row gap-8 sm:gap-10">
          <Image
            alt="Avatar"
            loading="lazy"
            src={Img.AboutAvatar}
            className="rounded-full w-[80px] h-auto sm:w-[120px] pointer-events-none"
          />

          <div className="flex flex-row items-center gap-5">
            {socialData.map((soc) => (
              <motion.a
                key={soc.id}
                href={soc.href}
                whileTap={{ scale: 1 }}
                whileHover={{ scale: 1.1, color: "#10B981" }}
              >
                <soc.Icon className="w-[25px] h-auto sm:w-[30px]" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="w-full text-base sm:text-2xl flex flex-col gap-4 max-w-5xl sm:gap-6">
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, opacity: { delay: 0.4 } }}
          >
            <LottieEmoji
              animationData={Emoji.WaveEmoji}
              className="inline-flex mr-1.5 w-5 h-5 sm:w-6 sm:h-6 align-middle"
            />
            Hi, I’m <span className="text-emerald-400">Danylo</span>!
            <LottieEmoji
              animationData={Emoji.SunglassEmoji}
              className="inline-flex w-7 h-7 sm:w-8 sm:h-8 align-middle"
            />
            I started my journey as a{" "}
            <span className="text-emerald-400">Front-End Developer</span> in{" "}
            <span className="italic text-yellow-400">Hillel IT School</span>,
            where I learned to build modern web apps, practiced teamwork, and
            explored application architecture and state management. That period
            gave me a strong foundation in React and collaboration, from Git
            versioning to real project discussions.
          </motion.div>

          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, opacity: { delay: 0.8 } }}
          >
            <LottieEmoji
              animationData={Emoji.RocketEmoji}
              className="inline-flex mr-1.5 w-5 h-5 sm:w-6 sm:h-6 align-middle"
            />
            Later, I joined{" "}
            <span className="italic text-yellow-400">NDA project</span>,
            contributing to the development of a large-scale multi-module
            platform. There I worked closely with designers, backend developers,
            and product managers to deliver high-quality features, integrate
            APIs, and improve UI/UX across different modules. It was a true step
            up in building scalable, maintainable, and dynamic applications.
          </motion.div>

          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, opacity: { delay: 1.2 } }}
          >
            <LottieEmoji
              animationData={Emoji.SparklesEmoji}
              className="inline-flex w-5 h-5 sm:w-6 sm:h-6 mr-1.5 align-middle"
            />
            Alongside, I worked with the tools like{" "}
            <span className="text-sky-400">React</span>,{" "}
            <span className="text-sky-400">Next.js</span>,{" "}
            <span className="text-sky-400">TailwindCSS</span>,{" "}
            <span className="text-sky-400">Framer-motion</span>,{" "}
            <span className="text-sky-400">MongoDB</span>, and{" "}
            <span className="text-sky-400">Firebase</span>. I enjoy turning
            Figma designs into pixel-perfect interfaces, focusing on
            performance, accessibility, and delightful user experiences.
          </motion.div>

          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, opacity: { delay: 1.6 } }}
          >
            <LottieEmoji
              animationData={Emoji.FireEmoji}
              className="inline-flex w-5 h-5 sm:w-8 sm:h-8 align-top"
            />
            Outside of coding, I’m passionate about guitar, cats, gaming, and
            exploring new ideas in front-end. Always learning, always growing,
            and ready to collaborate on projects that inspire!
          </motion.div>
        </div>
      </div>
    </section>
  );
};
