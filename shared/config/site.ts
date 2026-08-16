export const SITE = {
  name: "Danylo Hrytsenko",
  handle: ".Hrytsenko",
  role: "Front-end developer",
  url: "https://hrytsenko.dev",
  locale: "en_US",
  description:
    "Front-end developer crafting fast, accessible and delightful interfaces with React, Next.js and TypeScript.",
} as const;

export const NAV = [
  { id: "hero-section", label: "Welcome" },
  { id: "about-section", label: "About" },
  { id: "skills-section", label: "Skills" },
  { id: "experience-section", label: "Experience" },
  { id: "projects-section", label: "Projects" },
  { id: "contact-section", label: "Contact" },
] as const;

export type NavItem = (typeof NAV)[number];
