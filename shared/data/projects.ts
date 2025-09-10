import { Img } from "@/shared";

export const projects = [
  {
    id: 1,
    href: "#",
    title: "Programmer portfolio",
    description:
      "A personal portfolio website built with Next.js, TypeScript, and FSD architecture. It showcases my skills, projects, and experience with a focus on modern UI/UX, animations (Framer Motion), smooth scrolling (Lenis), and responsive design using TailwindCSS.",
    src: Img.MyPortfolio,
    skills: [
      "React",
      "Next",
      "TypeScript",
      "FSD",
      "Lucide",
      "Tailwind",
      "Lenis",
      "Framer-motion",
    ],
  },
  {
    id: 2,
    href: "https://marta-designer.netlify.app",
    title: "Designer portfolio",
    description:
      "This project is an interactive portfolio built to showcase a designer’s work. It combines modern animations, smooth scrolling, and a visually appealing UI to highlight the creator’s style.",
    src: Img.DesignerPortfolio,
    skills: [
      "React",
      "Next",
      "TypeScript",
      "FSD",
      "Lucide",
      "Tailwind",
      "Lenis",
      "React-bits",
      "Pixi.js",
      "GSAP",
      "Motion",
    ],
  },
];
