export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "core",
    label: "Core",
    items: ["HTML", "CSS", "Sass", "JavaScript", "TypeScript"],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    items: ["React", "Next.js", "Redux Toolkit", "MobX", "Zustand"],
  },
  {
    id: "styling",
    label: "Styling & Motion",
    items: ["TailwindCSS", "Framer Motion", "GSAP", "Lenis", "Three.js"],
  },
  {
    id: "backend",
    label: "Data",
    items: ["MongoDB", "Firebase", "REST", "GraphQL"],
  },
  {
    id: "tooling",
    label: "Tooling",
    items: [
      "Vite",
      "Webpack",
      "ESLint",
      "Prettier",
      "Husky",
      "Git",
      "GitLab Enterprise",
      "Jira",
      "Figma",
    ],
  },
];

/** Flat list, kept for the drag-to-reorder playground. */
export const skills = skillGroups.flatMap((group) => group.items);
