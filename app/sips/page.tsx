const sipsItems = [
  {
    type: "video" as const,
    src: "/Sips/clip1.mov",
    poster: "/Sips/clip1-poster.png",
    label: "Video",
    mime: 'video/quicktime',
  },
  {
    type: "video" as const,
    src: "/Sips/clip2.mov",
    poster: "/Sips/clip2-poster.png",
    label: "Video",
    mime: 'video/quicktime',
  },
  {
    type: "video" as const,
    src: "/Sips/clip3.mp4",
    poster: "/Sips/clip3-poster.jpg",
    label: "Video",
    mime: 'video/mp4',
  },
];

export default function SipsPage() {
  return (
    <main className="min-h-screen sip-bg sip-grain sip-text">
      <div className="sip-sparkles" />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="text-sm text-white/70 hover:text-white">
          ← Back to Home
        </a>
        <div className="text-sm text-white/70">Sip &amp; Slay LLC • Sips</div>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 pb-16">
        <h1 className="sip-heading text-3xl font-semibold tracking-tight md:text-4xl">Sips</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/65">
          Signature cocktails, drink visuals, and event clips that show the vibe in motion.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sipsItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_90px_rgba(255,79,184,0.14)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,200,106,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,79,184,0.12),transparent_30%)] opacity-90" />

              <video
                controls
                playsInline
                preload="metadata"
                poster={item.poster}
                className="relative z-10 block h-full w-full bg-black object-contain"
              >
                <source src={item.src} type={item.mime} />
              </video>

              <div className="pointer-events-none absolute top-3 left-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/80 backdrop-blur">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}