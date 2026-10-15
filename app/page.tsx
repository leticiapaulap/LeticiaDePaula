import { CertificationsSection } from "@/components/certifications-section";
import { ContactSection } from "@/components/contact-section";
import { EducationSection } from "@/components/education-section";
import { ExperienceSection } from "@/components/experience-section";
import { ModeLabel } from "@/components/experience-navigation";
import { ExplorationRoom } from "@/components/portal/exploration-room";
import { PortalHero } from "@/components/portal/portal-hero";
import { ProfileSection } from "@/components/profile-section";
import { ProjectsSection } from "@/components/projects-section";
import { ResumeSection } from "@/components/resume-section";
import { SkillsSection } from "@/components/skills-section";

export default function Home() {
  return (
    <>
      <PortalHero />
      <ExplorationRoom />

      <div className="nexo-direct" id="portfolio">
        <header className="nexo-direct__intro">
          <ModeLabel />
          <div className="nexo-direct__heading">
            <div>
              <h2>Um portfólio, sem desvios.</h2>
              <p>Trajetória, projetos e competências em uma leitura acessível e objetiva.</p>
            </div>
            <a className="nexo-return-link focusable" href="#portal">
              Retornar ao portal
            </a>
          </div>
        </header>

        <div className="nexo-direct__content">
          <ProfileSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <EducationSection />
          <CertificationsSection />
          <ResumeSection />
          <ContactSection />
        </div>
      </div>
    </>
  );
}
