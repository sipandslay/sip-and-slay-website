type GalleryItem =
  | {
      type: "video";
      src: string;
      poster: string;
      mime: string;
      label: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      label: string;
    };

const galleryItems: GalleryItem[] = [
  {
    type: "video",
    src: "/Sips/clip1.mp4",
    poster: "/Sips/clip1-poster.png",
    mime: "video/mp4",
    label: "Sips",
  },
  {
    type: "video",
    src: "/Sips/clip2.mp4",
    poster: "/Sips/clip2-poster.png",
    mime: "video/mp4",
    label: "Sips",
  },
  {
    type: "video",
    src: "/Sips/clip3.mp4",
    poster: "/Sips/clip3-poster.jpg",
    mime: "video/mp4",
    label: "Sips",
  },
  {
    type: "image",
    src: "/Slays/signature package.png",
    alt: "Signature package",
    label: "Slays",
  },
  {
    type: "image",
    src: "/Slays/ice cream.png",
    alt: "Ice cream",
    label: "Slays",
  },
  {
    type: "image",
    src: "/Slays/waffle pop.png",
    alt: "Waffle pop",
    label: "Slays",
  },
  {
    type: "image",
    src: "/Slays/Bday Bash.png",
    alt: "Birthday bash menu",
    label: "Slays",
  },
  {
    type: "image",
    src: "/Slays/St. Patty's.png",
    alt: "St. Patty's menu",
    label: "Slays",
  },
  {
    type: "image",
    src: "/Slays/holidays.png",
    alt: "Holiday menu",
    label: "Slays",
  },
];

export default function GalleryPage() {
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
          ← Back to Home
        </a>
        <div className="text-sm text-white/70">Sip &amp; Slay LLC • Gallery</div>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-4 md:pt-8">
        <div className="mb-10 text-center md:mb-12">
          <h1 className="sip-heading text-3xl font-semibold tracking-tight md:text-5xl">
            Gallery
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/65 md:text-base">
            Signature cocktails, elevated dessert styling, and the real moments from our events — all in one place.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_28px_100px_rgba(255,79,184,0.16)]"
            >
              <div
                className={
                  item.label === "Sips"
                    ? "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,200,106,0.14),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,79,184,0.14),transparent_34%)] opacity-90"
                    : "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,79,184,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,200,106,0.14),transparent_32%)] opacity-90"
                }
              />

              {item.type === "video" ? (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={item.poster}
                  className="relative z-10 block h-full w-full bg-black object-contain"
                >
                  <source src={item.src} type={item.mime} />
                </video>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="relative z-10 block h-full w-full bg-black object-contain transition duration-500 group-hover:scale-[1.03]"
                />
              )}

              <span className="pointer-events-none absolute left-3 top-3 rounded-xl border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur">
                {item.label}
              </span>

              {item.type === "image" ? (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="/#contact"
            className="rounded-xl border border-white/5 bg-gradient-to-r from-[#FFC86A] to-[#FF4FB8] px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-[#FF4FB8]/10 transition hover:brightness-110"
          >
            Request a Quote
          </a>
        </div>
      </section>
    </main>
  );
}
