import {
  DotNav,
  Header,
  Footer,
  HeroSection,
  AboutSection,
  SkillsSection,
  ContactSection,
  ProjectsSection,
  ExperienceSection,
} from "@/widgets";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <DotNav />

      <main className="flex flex-col">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
