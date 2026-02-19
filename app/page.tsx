import Image from "next/image";

const Accent = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-[#FFC86A] via-[#FF4FB8] to-[#FFC86A] bg-clip-text text-transparent">
    {children}
  </span>
);

const Card = ({
  title,
  desc,
  bullets,
  badge,
}: {
  title: string;
  desc: string;
  bullets: string[];
  badge?: string;
}) => (
  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur">
    <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-[#FFC86A]/18 via-[#FF4FB8]/10 to-transparent blur-2xl" />
    <div className="relative">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight sip-glow">{title}</h3>
        {badge ? (
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            {badge}
          </span>
        ) : null}
      </div>

      <p className="mt-2 text-sm leading-relaxed text-white/70">{desc}</p>

      <ul className="mt-4 space-y-2 text-sm text-white/80">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-[#FFC86A] to-[#FF4FB8]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default function Page() {
  return (
    <main className="min-h-screen sip-bg sip-grain sip-text">
      <div className="sip-sparkles" />

      {/* Background glow layers (keep—this is the “breathing” feel on scroll) */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-56 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,200,106,0.22),transparent_60%)] blur-3xl" />
        <div className="absolute -top-20 right-[-220px] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,79,184,0.18),transparent_62%)] blur-3xl" />
        <div className="absolute bottom-[-420px] left-[-260px] h-[860px] w-[860px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,200,106,0.14),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />

        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      {/* Header */}
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <div className="text-sm text-white/70 sip-glow">Sip & Slay LLC</div>
            <div className="text-xs text-white/45">
              Luxury Cart Events • Northwest Suburbs + Chicagoland
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <a className="hover:text-white" href="#services">Services</a>
          <a className="hover:text-white" href="#packages">Packages</a>
          <a className="hover:text-white" href="#gallery">Gallery</a>
          <a className="hover:text-white" href="#faq">FAQ</a>
          <a className="hover:text-white" href="#contact">Contact</a>
        </nav>

        <a
          href="#contact"
          className="rounded-xl bg-gradient-to-r from-[#FFC86A] to-[#FF4FB8] px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-[#FF4FB8]/10 hover:brightness-110"
        >
          Request a Quote
        </a>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/75">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#FFC86A] to-[#FF4FB8]" />
            Premium luxury, vibrant energy, flawless service
          </div>

          <div className="mt-10 flex justify-center">
            <Image
              src="/logo.png"
              alt="Sip & Slay logo"
              width={1200}
              height={1200}
              priority
              className="w-full max-w-4xl h-auto object-contain drop-shadow-[0_28px_85px_rgba(255,200,106,0.18)]"
            />
          </div>

          <h1 className="mt-10 text-4xl font-semibold tracking-tight md:text-6xl leading-tight">
            Make your event feel <Accent>expensive</Accent>.
            <br />
            Keep it <Accent>fun</Accent>.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Sip & Slay brings a high-end, stylish bar experience to your space —
            signature cocktails, beautiful presentation, and the kind of vibe guests remember.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#contact"
              className="rounded-xl px-6 py-3 text-sm font-semibold text-black hover:brightness-110 bg-gradient-to-r from-[#FFC86A] to-[#D6A24A] shadow-[0_18px_40px_rgba(255,200,106,0.14)] border border-white/5"
            >
              Get availability + pricing
            </a>
            <a
              href="#packages"
              className="rounded-xl px-6 py-3 text-sm font-semibold text-black hover:brightness-110 bg-gradient-to-r from-[#FF4FB8] to-[#FF86D1] shadow-[0_18px_40px_rgba(255,79,184,0.12)] border border-white/5"
            >
              View packages
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs text-white/60">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Northwest Suburbs</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Chicagoland</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Weddings • Birthdays • Corporate</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl sip-heading">Services</h2>
            <p className="mt-2 text-sm text-white/65">
              Luxury presentation, vibrant energy, and smooth execution.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Card
            title="Mobile Bartending"
            desc="Professional bartending for private + corporate events across the NW suburbs and Chicagoland."
            bullets={["Setup + breakdown included", "Fast, clean service flow", "Guest-first hospitality"]}
            badge="Most Popular"
          />
          <Card
            title="Signature Cocktails"
            desc="Custom menus built around your theme — bold flavors, gorgeous garnish, elevated glassware."
            bullets={["Menu consultation", "Mocktails available", "Seasonal specials"]}
          />
          <Card
            title="Premium Aesthetic"
            desc="A bar that looks like it belongs at a luxury venue — because it does."
            bullets={["Styled presentation", "Photo-ready setup", "Modern, vibrant vibe"]}
          />
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="relative mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl sip-heading">Packages</h2>
          <p className="mt-2 text-sm text-white/65">
            Pricing depends on guest count, hours, and menu. These are clean starting points.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Card
            title="Classic"
            desc="Perfect for intimate events that still want luxury."
            bullets={["Up to 4 hours", "Beer/wine + 2 cocktails", "Styled garnish bar"]}
            badge="Starter"
          />
          <Card
            title="Signature"
            desc="The full Sip & Slay experience — premium + vibrant."
            bullets={["Up to 5 hours", "3–4 signature cocktails", "Menu + vibe consultation"]}
            badge="Best Value"
          />
          <Card
            title="Ultra"
            desc="Big events, big energy. Elevated from start to finish."
            bullets={["6+ hours", "Full custom menu", "Premium presentation upgrades"]}
            badge="Luxury"
          />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70 backdrop-blur">
          <span className="text-white font-semibold">Note:</span> Alcohol purchasing rules vary by event setup. We’ll guide you to the cleanest, legal option for your format.
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="relative mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl sip-heading">Gallery</h2>
          <p className="mt-2 text-sm text-white/65">
            Photos & videos that show the real vibe — cocktails, luxury setups, and unforgettable moments.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img src="/gallery/bottles.jpg" alt="Premium bottle display" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="absolute bottom-3 left-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/80 backdrop-blur opacity-0 transition group-hover:opacity-100">
              Top Shelf Liqour
            </div>
          </div>

          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img src="/gallery/luxary-setup.png" alt="Luxury bar setup" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="absolute bottom-3 left-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/80 backdrop-blur opacity-0 transition group-hover:opacity-100">
              Luxury Bar Setup
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/50">
            <video controls className="h-full w-full object-cover" src="/gallery/clip3.mp4" />
            <div className="absolute top-3 left-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/80 backdrop-blur">
              Video Highlight
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <a href="/gallery" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
            View Full Gallery →
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl sip-heading">FAQ</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 backdrop-blur">
            <div className="text-white font-semibold">Do you provide alcohol?</div>
            <div className="mt-2">
              Typically, clients purchase alcohol and we provide the expertise, menu, and service. We’ll tell you exactly what to buy and how much.
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 backdrop-blur">
            <div className="text-white font-semibold">What areas do you serve?</div>
            <div className="mt-2">
              Northwest suburbs + Chicagoland. If you’re unsure, send the city and we’ll confirm.
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative mx-auto max-w-6xl px-6 pb-16 pt-10">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Ready to <Accent>book</Accent>?
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Email us with your date, city, guest count, and event type. We’ll respond with availability + options.
              </p>

              <div className="mt-6 space-y-2 text-sm text-white/75">
                <div>
                  <span className="text-white/60">Email:</span>{" "}
                  <span className="font-semibold">sipandslayllc@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <div className="text-sm font-semibold">Quick Quote Template</div>
              <p className="mt-2 text-sm text-white/65">Copy/paste into your email:</p>
              <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">
Date:
City:
Guest count:
Event type:
Hours:
Vibe/theme:
Alcohol preference (cocktails / mocktails / both):
              </pre>
            </div>
          </div>
        </div>

        <footer className="relative mx-auto mt-10 max-w-6xl px-2 text-center text-xs text-white/45">
          © {new Date().getFullYear()} Sip & Slay LLC • Premium luxury mobile bartending • Chicagoland
        </footer>
      </section>
    </main>
  );
}
