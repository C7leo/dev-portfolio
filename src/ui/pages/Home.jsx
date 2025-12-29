import { getProfile } from "../../domains/profile/profile.service.js";
import { getProjects } from "../../domains/projects/project.service.js";
import { Hero } from "../components/hero/Hero.jsx";
import { About } from "../components/About.jsx";
import { Projects } from "../components/Projects.jsx";
import { Experience } from "../components/Experience.jsx";
import { Contact } from "../components/Contact.jsx";
import { Footer } from "../components/Footer.jsx";
import { LogoLoop } from "../components/logoloop/LogoLoop.jsx";

import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

const imageLogos = [
  { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
];

export default function Home() {
  const profile = getProfile();
  const projects = getProjects();

  return (
    <div className="app">
      <Hero />
      {/*<div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={48}
        gap={40}
        hoverSpeed={0}
        scaleOnHover
        ariaLabel="Technology partners"
      />
    </div>*/}
      <About profile={profile} />
      <Projects projects={projects} />
      <Experience />
      <Contact profile={profile} />
      <Footer />
    </div>
  );
}
