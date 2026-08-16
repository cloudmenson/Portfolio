export interface ExperienceEntry {
  id: number;
  role: string;
  company: string;
  period: string;
  /** `null` marks the current position. */
  end: string | null;
  summary: string;
  highlights: string[];
  stack: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: 1,
    role: "Front-end Developer",
    company: "NDA · iGaming",
    period: "2023 — present",
    end: null,
    summary:
      "Building and maintaining a large-scale, multi-module betting platform alongside designers, backend engineers and product managers.",
    highlights: [
      "Shipped features across several independently deployed modules of the platform",
      "Integrated dozens of REST endpoints with typed, resilient client-side layers",
      "Reworked UI/UX flows that reduced friction in core user journeys",
      "Reviewed code and mentored newcomers on the front-end conventions",
    ],
    stack: ["React", "Next.js", "TypeScript", "MobX", "SCSS", "GitLab"],
  },
  {
    id: 2,
    role: "Front-end Developer",
    company: "Freelance & commercial projects",
    period: "2022 — 2023",
    end: "2023",
    summary:
      "Delivered marketing sites, portfolios and small products end to end — from Figma handoff to production deploy.",
    highlights: [
      "Turned Figma files into pixel-accurate, responsive interfaces",
      "Built animation-heavy landing pages with GSAP and Framer Motion",
      "Owned deployment, performance budgets and post-launch iterations",
    ],
    stack: ["React", "Next.js", "TypeScript", "TailwindCSS", "GSAP", "Netlify"],
  },
  {
    id: 3,
    role: "Front-end Student",
    company: "Hillel IT School",
    period: "2021 — 2022",
    end: "2022",
    summary:
      "Learned modern web development in a team setting: architecture, state management, Git workflow and real project reviews.",
    highlights: [
      "Completed team projects using Git flow and code review",
      "Built a strong foundation in React and application architecture",
    ],
    stack: ["JavaScript", "React", "Redux", "Git"],
  },
];
