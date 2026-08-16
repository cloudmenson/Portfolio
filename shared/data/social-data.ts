import {
  Mail,
  Send,
  Github,
  Linkedin,
  CircleArrowOutUpRight,
  type LucideIcon,
} from "lucide-react";

import { EMAIL } from "@/shared/config/constants";

export interface SocialLink {
  id: number;
  label: string;
  href: string;
  Icon: LucideIcon;
}

export const socialData: SocialLink[] = [
  {
    id: 1,
    label: "LinkedIn",
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/hrytsenko-danylo/",
  },
  {
    id: 2,
    label: "GitHub",
    Icon: Github,
    href: "https://github.com/cloudmenson",
  },
  {
    id: 3,
    label: "Email",
    Icon: Mail,
    href: `mailto:${EMAIL}`,
  },
  {
    id: 4,
    label: "Telegram",
    Icon: Send,
    href: "https://t.me/cloudmenson",
  },
  {
    id: 5,
    label: "Linktree",
    Icon: CircleArrowOutUpRight,
    href: "https://linktr.ee/cloudmenson",
  },
];
