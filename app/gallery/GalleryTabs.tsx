"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/gallery", label: "Event Photos" },
  { href: "/gallery/menus", label: "Custom Menus" },
  { href: "/gallery/sips", label: "Sips & Sweets" },
];

export default function GalleryTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Gallery categories"
      className="mx-auto mt-8 flex w-full max-w-xl flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-black/40 p-2 backdrop-blur sm:gap-1.5"
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "flex-1 whitespace-nowrap rounded-full bg-gradient-to-r from-[#FFC86A] to-[#FF4FB8] px-4 py-2.5 text-center text-xs font-semibold tracking-wide text-black shadow-[0_10px_30px_rgba(255,79,184,0.25)] sm:text-sm"
                : "flex-1 whitespace-nowrap rounded-full px-4 py-2.5 text-center text-xs font-medium tracking-wide text-white/65 transition hover:bg-white/5 hover:text-white sm:text-sm"
            }
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
