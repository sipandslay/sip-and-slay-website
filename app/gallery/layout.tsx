import type { ReactNode } from "react";
import GalleryTabs from "./GalleryTabs";

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return (
    <main className="sip-bg sip-grain sip-text min-h-screen">
      <div className="sip-sparkles" />

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-56 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,200,106,0.22),transparent_60%)] blur-3xl" />
        <div className="absolute -top-20 right-[-220px] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,79,184,0.18),transparent_62%)] blur-3xl" />
        <div className="absolute bottom-[-420px] left-[-260px] h-[860px] w-[860px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,200,106,0.14),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="text-sm text-white/70 transition hover:text-white">
          &larr; Back to Home
        </a>
        <div className="text-sm text-white/70">Sip &amp; Slay LLC &bull; Gallery</div>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-4 md:pt-8">
        <div className="text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#FFC86A]/70" />
            <span className="text-[11px] font-medium uppercase tracking-[0.38em] text-[#FFC86A]">
              The Portfolio
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#FFC86A]/70" />
          </div>

          <h1 className="sip-heading text-4xl font-semibold tracking-tight md:text-6xl">
            Gallery
          </h1>

          <div className="mx-auto mt-4 h-[2px] w-20 rounded-full bg-gradient-to-r from-[#FFC86A] via-[#FF4FB8] to-[#FFC86A]" />

          <GalleryTabs />
        </div>

        <div className="mt-12 md:mt-14">{children}</div>

        <div className="mt-14 flex justify-center">
          <a
            href="/#contact"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/5 bg-gradient-to-r from-[#FFC86A] to-[#FF4FB8] px-6 py-3 text-sm font-semibold tracking-wide text-black shadow-[0_18px_40px_rgba(255,79,184,0.22)] transition hover:brightness-110"
          >
            Request a Quote
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>
      </section>
    </main>
  );
}
