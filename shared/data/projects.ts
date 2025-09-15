import { Img } from "@/shared";

export const projects = [
  {
    id: 1,
    href: "https://marta-designer.netlify.app",
    title: "Designer portfolio app",
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
  {
    id: 2,
    href: "#",
    title: "IN DEVELOPMENT",
    description:
      "The project is designed to manage business processes, track key metrics (customers, orders, revenue, goal achievement), and interactively visualize data.",
    src: Img.Adminpanel,
    skills: [
      "React",
      "Next",
      "TypeScript",
      "FSD",
      "Tailwind",
      "Firebase",
      "MongoDB",
      "Husky",
      "Eslint",
      "Prettier",
      "Framer-motion",
    ],
  },
  {
    id: 3,
    href: "#",
    title: "My portfolio app",
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
];
