const slaysItems = [
  {
    src: "/Slays/Bday Bash.png",
    alt: "Bday Bash",
  },
  {
    src: "/Slays/signature package.png",
    alt: "Signature package",
  },
  {
    src: "/Slays/St. Patty's.png",
    alt: "St. Patty's",
  },
  {
    src: "/Slays/waffle pop.png",
    alt: "Waffle pop",
  },
  {
    src: "/Slays/ice cream.png",
    alt: "Ice cream",
  },
];

export default function SlaysPage() {
  return (
    <main className="min-h-screen sip-bg sip-grain sip-text">
      <div className="sip-sparkles" />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="text-sm text-white/70 hover:text-white">
          ← Back to Home
        </a>
        <div className="text-sm text-white/70">Sip &amp; Slay LLC • Slays</div>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 pb-16">
        <h1 className="sip-heading text-3xl font-semibold tracking-tight md:text-4xl">Slays</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/65">
          Menus, signature package styling, and the visual details that make the brand feel elevated.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slaysItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_90px_rgba(255,200,106,0.14)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,79,184,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,200,106,0.12),transparent_28%)] opacity-90" />

              <img
                src={item.src}
                alt={item.alt}
                className="relative z-10 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}