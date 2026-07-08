import { site } from "@/config/site";
import { Reveal, SectionHeader } from "./reveal";

const getIconSlug = (skill: string) => {
  const map: Record<string, string> = {
    TypeScript: "ts",
    JavaScript: "js",
    React: "react",
    "Next.js": "nextjs",
    "Node.js": "nodejs",
    "Express.js": "express",
    "Tailwind CSS": "tailwind",
    PostgreSQL: "postgres",
    MongoDB: "mongodb",
    Prisma: "prisma",
    Supabase: "supabase",
    Firebase: "firebase",
    Git: "git",
    GitHub: "github",
    Postman: "postman",
    Vercel: "vercel",
    Figma: "figma",
    "C++": "cpp",
    C:"C",
    Python: "python",
    "REST APIs": "fastapi",
    "Shadcn UI": "shadcnui",
  };
  return map[skill];
};


export function Skills() {
  if (!site.skills.length) return null;

  return (
    <section className="mx-auto w-full max-w-content px-6 py-16">
      <SectionHeader id="skills" index="04" title="Skills & Technologies" />

      <Reveal>
        <div className="flex flex-wrap gap-2.5">
          {site.skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-2 cursor-default rounded-full border bg-surface/30 px-3.5 py-1.5 text-sm text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg"
            >
              {getIconSlug(skill) && (
                <img
                  src={`https://skillicons.dev/icons?i=${getIconSlug(skill)}`}
                  alt={`${skill} icon`}
                  className="w-4 h-4"
                />
              )}
              {skill}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

