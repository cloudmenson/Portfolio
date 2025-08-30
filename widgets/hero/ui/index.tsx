"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import {
  Icons,
  Button,
  socialData,
  DownloadLink,
  AnchorButton,
} from "@/shared";

export const HeroSection = () => {
  return (
    <section
      id="hero-section"
      className="w-full h-dvh flex flex-row items-center gap-10 justify-between pt-50 pb-30 px-30"
    >
      <motion.div
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center mb-4">
          {"Front-end".split("").map((char, idx) => (
            <motion.span
              key={`${char}-${idx}`}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="select-none inline-block text-9xl font-bold cursor-default transition-colors duration-200 hover:text-emerald-500"
              transition={{
                damping: 10,
                type: "spring",
                stiffness: 400,
                opacity: {
                  delay: idx * 0.15,
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <div className="flex items-center mb-24">
          <motion.div
            viewport={{ once: true }}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              opacity: {
                delay: 1.4,
              },
            }}
          >
            <Icons.Code className="border-4 mr-8 rounded-4xl w-40 h-25 cursor-pointer" />
          </motion.div>

          {"developer".split("").map((char, idx) => (
            <motion.span
              key={`${char}-${idx}`}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="select-none inline-block text-9xl font-bold cursor-default transition-colors duration-200 hover:text-emerald-500 italic"
              transition={{
                damping: 10,
                type: "spring",
                stiffness: 400,
                opacity: {
                  delay: 1.6 + idx * 0.15,
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <p className="text-gray-400 text-sm italic mb-10 select-none">
          ✨ Try hovering or clicking on the elements to see the magic!
        </p>

        <div className="flex flex-row gap-10">
          <Button
            mount
            variant="outline"
            className="rounded-4xl text-3xl text-white py-4 px-8"
          >
            Contact me
          </Button>

          <DownloadLink
            mount
            href={"/"}
            className="text-3xl"
            rightIcon={
              <div className="rounded-4xl bg-emerald-500 text-black">
                <ArrowUpRight width={24} height={24} />
              </div>
            }
          >
            Download CV
          </DownloadLink>
        </div>
      </motion.div>

      <div className="flex flex-col gap-25 items-center">
        <div className="flex flex-col gap-5">
          {socialData.map((soc, idx) => (
            <motion.a
              key={soc.id}
              href={soc.href}
              whileTap={{ scale: 1 }}
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.2, color: "#10B981" }}
              transition={{
                opacity: {
                  delay: 3.2 + idx * 0.2,
                },
              }}
            >
              <soc.Icon width={35} height={35} />
            </motion.a>
          ))}
        </div>

        <AnchorButton
          initial={{ opacity: 0 }}
          viewport={{ once: true }}
          animate={{ y: [0, -8, 0] }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1.4,
            repeatDelay: 0,
            repeat: Infinity,
            opacity: {
              delay: 4,
            },
          }}
          href="#about-section"
        />
      </div>
    </section>
  );
};
