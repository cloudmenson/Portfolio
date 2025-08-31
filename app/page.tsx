import {
  Header,
  Footer,
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
} from "@/widgets";
import {} from "@/widgets/footer";

export default function Home() {
  return (
    <div className="font-sans flex flex-col">
      <Header />

      <main className="flex flex-col">
        <HeroSection />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
