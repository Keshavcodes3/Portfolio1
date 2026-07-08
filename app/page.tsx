import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Writing } from "@/components/writing";
import { GitHubGraph } from "@/components/github-graph";
import { ScrollProgress } from "@/components/scroll-progress";


export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Writing />
      <GitHubGraph />
    </>
  );
}
