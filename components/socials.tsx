import { site } from "@/config/site";
import { GitHubIcon, TwitterIcon, LinkedInIcon, MailIcon, FileIcon, DiscordIcon, MediumIcon } from "./icons";

const items = [
  { key: "github", href: site.socials.github, label: "GitHub", Icon: GitHubIcon },
  { key: "twitter", href: site.socials.twitter, label: "Twitter / X", Icon: TwitterIcon },
  { key: "linkedin", href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { key: "medium", href: (site.socials as any).medium, label: "Medium", Icon: MediumIcon },
  { key: "email", href: site.socials.email, label: "Email", Icon: MailIcon },
  { key: "resume", href: site.socials.resume, label: "Résumé", Icon: FileIcon },
  { key: "discord", href: (site.socials as any).discord, label: "Discord", Icon: DiscordIcon },
];



export function Socials({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items
        .filter((i) => i.href)
        .map(({ key, href, label, Icon }) => (
          <a
            key={key}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="group grid h-10 w-10 place-items-center rounded-xl border bg-surface/40 text-muted transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
          >
            <Icon className="transition-transform group-hover:scale-110" />
          </a>
        ))}
    </div>
  );
}
