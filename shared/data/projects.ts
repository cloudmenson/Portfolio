import type { StaticImageData } from "next/image";

// Imported from the module itself rather than the `@/shared` barrel — going
// through the barrel would make data ↔ ui a cycle.
import { Img } from "@/shared/assets";

export interface Project {
  id: number;
  href: string;
  repo?: string;
  title: string;
  year: string;
  /** Short label shown on the card, e.g. `Commercial`. */
  kind: string;
  featured?: boolean;
  description: string;
  src: StaticImageData;
  skills: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    href: "https://nft-crypto-market.netlify.app",
    title: "OpenSea — NFT Crypto Market",
    year: "2025",
    kind: "Product concept",
    featured: true,
    description:
      "A modern NFT marketplace inspired by OpenSea, featuring live crypto data, trending collections, 3D animations, and a fully responsive design. Built with Next.js 15, TypeScript, and Framer Motion to ensure a smooth and futuristic user experience.",
    src: Img.NFTCryptoMarket,
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "Redux Toolkit",
      "MockAPI",
      "Swiper.js",
      "FSD Architecture",
    ],
  },
  {
    id: 2,
    href: "https://immersive-cinematic-ui.netlify.app",
    title: "Immersive Cinematic UI",
    year: "2025",
    kind: "Experiment",
    featured: true,
    description:
      "An interactive cinematic website inspired by Wakanda Forever. Built with GSAP scroll-driven animations, sticky sections, immersive video backdrops, and 3D models. Optimized for smooth performance and responsive design, with creative replacements of complex 3D for video, parallax, and animated UI elements.",
    src: Img.ImmersiveDesign,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "GSAP",
      "Framer Motion",
      "Three.js",
      "FSD Architecture",
      "Husky",
      "Eslint",
      "Prettier",
    ],
  },
  {
    id: 3,
    href: "https://marta-designer.netlify.app",
    title: "Designer portfolio web",
    year: "2025",
    kind: "Commercial",
    description:
      "This project is an interactive portfolio built to showcase a designer’s work. It combines modern animations, smooth scrolling, and a visually appealing UI to highlight the creator’s style.",
    src: Img.DesignerPortfolio,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "FSD Architecture",
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
    id: 4,
    href: "https://github.com/cloudmenson/SecureNote-Browser-Extention-Manifest-V3",
    repo: "https://github.com/cloudmenson/SecureNote-Browser-Extention-Manifest-V3",
    title: "Secure Note — Browser Extension",
    year: "2024",
    kind: "Open source",
    description:
      "A cross-browser extension for Chrome and IE that allows you to create, encrypt, and store domain-bound notes. It features a floating button, a pop-up UI window, local storage with encryption, and element visibility settings. Pure JS, CSS, and Manifest V3 are used.",
    src: Img.Note,
    skills: [
      "Vanilla JS",
      "Manifest V3",
      "Chrome API",
      "HTML",
      "CSS",
      "Storage API",
      "Encryption",
    ],
  },
  {
    id: 5,
    href: "https://my-project-web-app.netlify.app",
    title: "Apple web",
    year: "2024",
    kind: "Clone",
    description:
      "A modern clone of the official Apple website built with Next.js, TypeScript, and TailwindCSS. Features responsive design, smooth animations, clean UI, and developer tools like ESLint, Prettier, and Husky for code quality.",
    src: Img.Apple,
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "ESLint",
      "Prettier",
      "Husky",
      "Lint-staged",
      "clsx",
    ],
  },
  {
    id: 6,
    href: "https://github.com/cloudmenson",
    repo: "https://github.com/cloudmenson",
    title: "My portfolio web",
    year: "2026",
    kind: "Personal",
    description:
      "A personal portfolio website built with Next.js, TypeScript, and FSD architecture. It showcases my skills, projects, and experience with a focus on modern UI/UX, animations (Framer Motion), smooth scrolling (Lenis), and responsive design using TailwindCSS.",
    src: Img.MyPortfolio,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "FSD Architecture",
      "Lucide",
      "Tailwind",
      "Lenis",
      "Framer-motion",
    ],
  },
];

/** Every distinct `kind`, prefixed with the catch-all used by the filter UI. */
export const projectKinds = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.kind))),
];
