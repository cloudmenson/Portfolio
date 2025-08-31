import { Img } from "@/shared";
import test from "../assets/images/projects/test-preview.png";

export const projects = [
  {
    id: 1,
    href: "#",
    title: "My portfolio",
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
    href: "#",
    src: test,
    skills: ["React", "TypeScript", "FSD"],
    title: "Project 1",
    description: "Project description",
  },
  {
    id: 3,
    href: "#",
    src: test,
    skills: ["React", "TypeScript", "FSD"],
    title: "Project 2",
    description: "Project description",
  },
  {
    id: 4,
    href: "#",
    src: test,
    skills: ["React", "TypeScript", "FSD"],
    title: "Project 3",
    description: "Project description",
  },
  {
    id: 5,
    href: "#",
    src: test,
    skills: ["React", "TypeScript", "FSD"],
    title: "Project 4",
    description: "Project description",
  },
];
