"use client";

import { useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { createPortal } from "react-dom";

const links = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/gaming", label: "Gaming" },
  { href: "/software", label: "Software" },
  { href: "/substack", label: "Substack" },
  { href: "/acting", label: "Acting" },
  { href: "/contact", label: "Get in Touch" },
];

function useMounted() {
  return useSyncExternalStore(
    () => () => {}, // subscribe: no-op, this value never changes after mount
    () => true, // client snapshot: always true once running in the browser
    () => false // server snapshot: always false during SSR
  );
}

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-transparent px-6 py-2 md:px-10" aria-label="Main navigation">
      <div className="flex items-center justify-end">
        {/* Desktop links */}
        <div className="hidden items-center gap-4 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 shadow-lg ring-1 ring-inset ring-white/10 backdrop-blur-xl md:flex dark:bg-white/5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-xs font-medium transition-colors duration-200
                  ${isActive
                    ? "text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-current"
                    : "text-foreground/65 hover:text-foreground"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Hamburger button, mobile only */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          <div className={`w-6 h-0.5 bg-gray-200 mb-1.5 transition-transform duration-200 ${open ? "rotate-45 translate-y-2" : ""}`}></div>
          <div className={`w-6 h-0.5 bg-gray-200 mb-1.5 transition-opacity duration-200 ${open ? "opacity-0" : ""}`}></div>
          <div className={`w-6 h-0.5 bg-gray-200 transition-transform duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`}></div>
        </button>
      </div>

      {/* Portal: backdrop + dropdown render into document.body, escaping the nav's backdrop-blur containing block */}
      {mounted && open && createPortal(
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/10 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed right-4 top-14 z-50 flex min-w-37.5 flex-col gap-1 rounded-2xl border border-foreground/10 bg-background p-3 shadow-xl md:hidden">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200
                    ${isActive
                      ? "border-l-2 border-current pl-3.5 text-foreground"
                      : "border-l-2 border-transparent pl-3.5 text-foreground/70 hover:text-foreground"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </>,
        document.body
      )}
    </nav>
  );
}