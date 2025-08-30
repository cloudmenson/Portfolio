"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Img, socialData } from "@/shared";

export const AboutSection = () => {
  return (
    <section
      id="about-section"
      className="w-full h-dvh flex flex-col gap-20 pt-20 pb-20 px-30"
    >
      <h2 className="text-7xl font-bold flex items-center gap-0.5 cursor-default">
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

      <div className="flex flex-col gap-12">
        <div className="flex flex-row gap-10">
          <Image
            alt="Avatar"
            loading="lazy"
            src={Img.AboutAvatar}
            className="rounded-full w-[120px] h-auto pointer-events-none"
          />

          <div className="flex flex-row items-center gap-5">
            {socialData.map((soc) => (
              <motion.a
                key={soc.id}
                href={soc.href}
                whileTap={{ scale: 1 }}
                whileHover={{ scale: 1.1, color: "#10B981" }}
              >
                <soc.Icon width={30} height="auto" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="flex flex-row gap-15">
          <motion.p
            viewport={{ once: true }}
            className="w-1/2 text-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, opacity: { delay: 0.2 } }}
          >
            I'm <span className="font-semibold text-emerald-400">Danylo</span>,
            25 y.o from
            <span className="italic text-yellow-400"> Ukraine</span>. Skilled in
            building modern and dynamic web apps using
            <span className="text-sky-400"> React</span>,
            <span className="text-sky-400"> Next.js</span>,
            <span className="text-sky-400"> Tailwind</span>.
          </motion.p>

          <motion.p
            viewport={{ once: true }}
            className="w-1/2 text-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1, delay: 0.2, opacity: { delay: 0.6 } }}
          >
            Experienced with MongoDB and Firebase for handling data and
            authentication, as well as bringing Figma designs to life in
            pixel-perfect web pages. Always learning, improving my English for
            travel and international collaboration, and striving to grow as a
            developer.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
