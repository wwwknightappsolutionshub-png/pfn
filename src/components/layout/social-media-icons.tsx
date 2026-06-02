import Link from "next/link";
import {
  normalizeSocialLinks,
  SOCIAL_PLATFORM_META,
} from "@/lib/social-links";
import { cn } from "@/lib/utils";

type Props = {
  links?: { platform?: string | null; url: string }[] | null;
  className?: string;
  variant?: "dark" | "light";
};

export function SocialMediaIcons({
  links,
  className,
  variant = "dark",
}: Props) {
  const social = normalizeSocialLinks(links);
  const isDark = variant === "dark";

  return (
    <div className={cn(className)}>
      <p
        className={cn(
          "mb-4 font-sans text-xs font-semibold uppercase tracking-[0.25em]",
          isDark ? "text-pln-gold" : "text-pln-gold-on-light",
        )}
      >
        Follow us
      </p>
      <ul className="flex flex-wrap gap-3">
        {social.map(({ platform, url }) => {
          const meta = SOCIAL_PLATFORM_META[platform];
          const Icon = meta.Icon;
          return (
            <li key={platform}>
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border transition",
                  isDark
                    ? "border-pln-ivory/20 bg-pln-ivory/5 text-pln-ivory hover:border-pln-gold hover:bg-pln-gold/15 hover:text-pln-gold"
                    : "border-pln-navy/12 bg-white text-pln-section-light-heading hover:border-pln-gold-on-light hover:text-pln-gold-on-light",
                )}
                aria-label={`${meta.label} (opens in new tab)`}
              >
                <Icon size={18} strokeWidth={1.5} aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
