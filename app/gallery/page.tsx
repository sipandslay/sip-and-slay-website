import { galleryItems } from "@/data/gallery";

export default function GalleryPage() {
  return (
    <main className="min-h-screen sip-bg sip-grain sip-text">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-fuchsia-500/25 via-violet-500/15 to-amber-400/10 blur-3xl" />
        <div className="absolute bottom-[-220px] left-[-120px] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-violet-500/20 via-fuchsia-500/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="text-sm text-white/70 hover:text-white">
          ← Back to Home
        </a>
        <div className="text-sm text-white/70">Sip & Slay LLC • Gallery</div>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 pb-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Gallery
        </h1>
        <p className="mt-2 text-sm text-white/65">
          Photos & videos that show the real vibe — cocktails, luxury setups, and unforgettable moments.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              ) : (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={
                    // expects something like /gallery/clip3-poster.jpg to exist
                    item.src.replace(".mp4", "-poster.jpg")
                  }
                  className="h-full w-full object-cover"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              )}

              {/* MUST NOT block clicks */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />

              {"tag" in item && item.tag ? (
                <div className="pointer-events-none absolute bottom-3 left-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/80 backdrop-blur opacity-0 transition group-hover:opacity-100">
                  {item.tag}
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
