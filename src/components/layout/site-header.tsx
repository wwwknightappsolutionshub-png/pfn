"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/events", label: "Events" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[55] border-b transition-all duration-500",
        scrolled
          ? "border-pln-gold/25 bg-pln-navy/98 shadow-[0_8px_32px_rgba(11,20,38,0.35)] backdrop-blur-md"
          : "border-pln-ivory/10 bg-pln-navy/92 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10 lg:py-5">
        <Link href="/" className="group flex flex-col">
          <span className="font-display text-xl tracking-tight text-pln-ivory lg:text-2xl">
            Profitable Living
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-pln-gold">
            Network
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:text-pln-gold",
                pathname === item.href
                  ? "text-pln-gold"
                  : "text-pln-ivory/85",
              )}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-pln-ivory/75 transition hover:text-pln-gold"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        <button
          type="button"
          className="text-pln-ivory transition hover:text-pln-gold lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-pln-ivory/10 bg-pln-navy px-6 py-6 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block py-3 font-sans text-sm font-semibold uppercase tracking-[0.2em] transition-colors hover:text-pln-gold",
                pathname === item.href
                  ? "text-pln-gold"
                  : "text-pln-ivory/90",
              )}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mt-4 flex items-center gap-2 font-sans text-sm uppercase tracking-[0.2em] text-pln-ivory/80 hover:text-pln-gold"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>
        </div>
      )}
    </header>
  );
}
