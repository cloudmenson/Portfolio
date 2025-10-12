"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { EMAIL } from "@/shared/config/constants";
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
      className="w-full h-full flex flex-col items-start sm:items-center sm:flex-row sm:justify-between gap-15 pt-20 pb-10 px-6 sm:gap-5 sm:pt-20 sm:pb-10 sm:px-10 xl:gap-10 xl:pt-50 xl:pb-30 xl:px-30"
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
              className="select-none inline-block text-4xl sm:text-6xl md:text-7xl xl:text-9xl font-bold transition-colors duration-200 hover:text-emerald-500"
              transition={{
                damping: 10,
                type: "spring",
                stiffness: 400,
                opacity: {
                  delay: idx * 0.06,
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <div className="flex items-center mb-10 sm:mb-24">
          <motion.div
            viewport={{ once: true }}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              opacity: {
                delay: 0.54,
              },
            }}
          >
            <Icons.Code className="w-15 h-12 mr-4 border-2 rounded-2xl sm:border-1 sm:mr-8 sm:rounded-2xl sm:border-2 xl:border-4 md:rounded-2xl xl:rounded-4xl sm:w-15 sm:h-15 md:w-20 md:h-12.5 xl:w-40 xl:h-25" />
          </motion.div>

          {"developer".split("").map((char, idx) => (
            <motion.span
              key={`${char}-${idx}`}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="select-none inline-block text-4xl sm:text-6xl md:text-7xl xl:text-9xl font-bold transition-colors duration-200 hover:text-emerald-500 italic"
              transition={{
                damping: 10,
                type: "spring",
                stiffness: 400,
                opacity: {
                  delay: 0.54 + idx * 0.06,
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <p className="hidden xl:inline-block text-gray-400 text-sm italic mb-10 select-none">
          ✨ Try hovering or clicking on the elements to see the magic!
        </p>

        <div className="flex flex-row gap-5 sm:gap-10">
          <Button
            mount
            variant="outline"
            className="rounded-2xl text-base py-2 px-4 sm:py-4 sm:px-8 sm:rounded-4xl sm:text-2xl md:text-2xl xl:text-3xl text-white"
          >
            <a href="https://t.me/cloudmenson">Contact me</a>
          </Button>

          <DownloadLink
            mount
            href="/cv/Danylo_Hrytsenko_Front-end.pdf"
            className="text-base sm:text-2xl md:text-2xl xl:text-3xl"
            rightIcon={
              <div className="rounded-4xl bg-emerald-500 text-black">
                <ArrowUpRight className="w-[15px] h-[15px] md:w-[20px] md:h-[20px] xl:w-[24px] xl:h-[24px]" />
              </div>
            }
          >
            Download CV
          </DownloadLink>
        </div>
      </motion.div>

      <div className="w-full sm:w-auto flex flex-col gap-40 sm:gap-25 items-center">
        <div className="flex flex-row sm:flex-col gap-8 sm:gap-5">
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
                  delay: 1.1 + idx * 0.2,
                },
              }}
            >
              <soc.Icon className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px]" />
            </motion.a>
          ))}
        </div>

        <AnchorButton
          href="#about-section"
          initial={{ opacity: 0 }}
          viewport={{ once: true }}
          animate={{ y: [0, -8, 0] }}
          whileInView={{ opacity: 1 }}
          motionSpanClass="border-[2px] rounded-3xl py-5 px-2"
          transition={{
            duration: 1.4,
            repeatDelay: 0,
            repeat: Infinity,
            opacity: {
              delay: 2.2,
            },
          }}
        >
          <ArrowDown />
        </AnchorButton>
      </div>
    </section>
  );
};
