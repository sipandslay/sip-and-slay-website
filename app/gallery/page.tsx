import { galleryItems } from "@/data/gallery";

export default function GalleryPage() {
  return (
    <main className="min-h-screen sip-bg sip-grain sip-text">
      <div className="sip-sparkles" />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="text-sm text-white/70 hover:text-white">
          ← Back to Home
        </a>
        <div className="text-sm text-white/70">Sip & Slay LLC • Gallery</div>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 pb-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl sip-heading">Gallery</h1>
        <p className="mt-2 text-sm text-white/65">
          Photos & videos that show the real vibe — cocktails, luxury setups, and unforgettable moments.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_12px_50px_rgba(0,0,0,0.45)]"
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={(item as any).poster ?? undefined}
                  className="h-full w-full object-cover"
                />
              )}

              {/* overlay that does NOT block clicks */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />

              {"tag" in item && (item as any).tag ? (
                <div className="pointer-events-none absolute bottom-3 left-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/80 backdrop-blur opacity-0 transition group-hover:opacity-100">
                  {(item as any).tag}
                </div>
              ) : null}

              {item.type === "video" ? (
                <div className="pointer-events-none absolute top-3 left-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/80 backdrop-blur">
                  Video
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}