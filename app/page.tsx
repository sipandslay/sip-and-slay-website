"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

const Accent = ({ children }: { children: ReactNode }) => (
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

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-xs text-white/70">
        {label} {required ? <span className="text-[#FFC86A]">*</span> : null}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/25"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-xs text-white/70">
        {label} {required ? <span className="text-[#FFC86A]">*</span> : null}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-white/25"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function Page() {
  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [eventType, setEventType] = useState("");
  const [hours, setHours] = useState("");
  const [vibeTheme, setVibeTheme] = useState("");
  const [alcoholPreference, setAlcoholPreference] = useState("");

  // honeypot (hidden)
  const [website, setWebsite] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return (
      email.trim() &&
      phone.trim() &&
      date.trim() &&
      city.trim() &&
      guestCount.trim() &&
      eventType.trim() &&
      hours.trim() &&
      vibeTheme.trim() &&
      alcoholPreference.trim()
    );
  }, [email, phone, date, city, guestCount, eventType, hours, vibeTheme, alcoholPreference]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          date,
          city,
          guestCount,
          eventType,
          hours,
          vibeTheme,
          alcoholPreference,
          website, // honeypot
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Could not send. Try again.");
      }

      setStatus("sent");
      // optional: clear form
      // setName(""); setEmail(""); setPhone("");
      // setDate(""); setCity(""); setGuestCount(""); setEventType(""); setHours(""); setVibeTheme(""); setAlcoholPreference("");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Could not send. Try again.");
    }
  }

  return (
    <main className="min-h-screen sip-bg sip-grain sip-text">
      <div className="sip-sparkles" />

      {/* Background glow layers */}
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
            <div className="text-sm text-white/70 sip-glow">Sip &amp; Slay LLC</div>
            <div className="text-xs text-white/45">Luxury Cart Events</div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <a className="hover:text-white" href="#services">
            Services
          </a>
          <a className="hover:text-white" href="#packages">
            Packages
          </a>
          <a className="hover:text-white" href="#gallery">
            Gallery
          </a>
          <a className="hover:text-white" href="#faq">
            FAQ
          </a>
          <a className="hover:text-white" href="#contact">
            Contact
          </a>
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
          {/* Logo */}
          <div className="mt-10 flex justify-center">
            <span className="sip-logo-wrap">
              <Image
                src="/logo.png"
                alt="Sip & Slay logo"
                width={1200}
                height={1200}
                priority
                className="sip-logo-feather h-auto w-full max-w-4xl object-contain drop-shadow-[0_28px_85px_rgba(255,200,106,0.18)]"
              />
            </span>
          </div>

          <h1 className="mt-10 text-4xl font-semibold tracking-tight md:text-6xl leading-tight">
            Make your event feel <Accent>expensive</Accent>.
            <br />
            Keep it <Accent>fun</Accent>.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Sip &amp; Slay brings a high-end, stylish bar experience to your space — signature cocktails, beautiful
            presentation, and the kind of vibe guests remember.
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

          {/* UPDATED PILL TEXT */}
          <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs text-white/60">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              Birthdays • Weddings • Corporate • Private Events
            </span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl sip-heading">Services</h2>
            <p className="mt-2 text-sm text-white/65">Luxury presentation, vibrant energy, and smooth execution.</p>
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
          <Card title="Classic" desc="Perfect for intimate events that still want luxury." bullets={["Up to 4 hours", "Beer/wine + 2 cocktails", "Styled garnish bar"]} badge="Starter" />
          <Card title="Signature" desc="The full Sip & Slay experience — premium + vibrant." bullets={["Up to 5 hours", "3–4 signature cocktails", "Menu + vibe consultation"]} badge="Best Value" />
          <Card title="Ultra" desc="Big events, big energy. Elevated from start to finish." bullets={["6+ hours", "Full custom menu", "Premium presentation upgrades"]} badge="Luxury" />
        </div>

        {/* REMOVED the alcohol purchasing note per your request */}
      </section>

      {/* Gallery */}
      <section id="gallery" className="relative mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl sip-heading">Gallery</h2>
          <p className="mt-2 text-sm text-white/65">
            Photos &amp; videos that show the real vibe — cocktails, luxury setups, and unforgettable moments.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3 items-start">
          <div className="flex justify-center">
            <img
              src="/gallery/Menu.png"
              alt="Slayyed Menu option 1"
              className="w-full max-w-[320px] h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
            />
          </div>

          <div className="flex justify-center">
            <img
              src="/gallery/Menu2.png"
              alt="Slayyed Menu option 2"
              className="w-full max-w-[320px] h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
            />
          </div>

          <div className="flex justify-center">
            <video
              controls
              playsInline
              preload="metadata"
              poster="/gallery/clip3-poster.jpg"
              className="w-full max-w-[320px] h-auto rounded-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
            >
              <source src="/gallery/clip3.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="/gallery"
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
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
            <div className="mt-2">Northwest suburbs + Chicagoland. If you’re unsure, send the city and we’ll confirm.</div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative mx-auto max-w-6xl px-6 pb-16 pt-10">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Ready to <Accent>book</Accent>?
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Submit the form and we’ll respond with availability + options.
              </p>

              <div className="mt-6 space-y-2 text-sm text-white/75">
                <div>
                  <span className="text-white/60">Email:</span>{" "}
                  <span className="font-semibold">sipandslayllc@gmail.com</span>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <div className="text-sm font-semibold">Quick Quote Form</div>
              <p className="mt-2 text-sm text-white/65">
                Required fields are marked with <span className="text-[#FFC86A]">*</span>.
              </p>

              {/* Honeypot (hidden) */}
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Input label="Name" value={name} onChange={setName} placeholder="Your name (optional)" />
                <Input label="Email" value={email} onChange={setEmail} type="email" required placeholder="you@email.com" />
                <Input label="Phone" value={phone} onChange={setPhone} required placeholder="(555) 555-5555" />
                <Input label="Date" value={date} onChange={setDate} required placeholder="MM/DD/YYYY" />
                <Input label="City" value={city} onChange={setCity} required placeholder="Chicago, Arlington Heights, etc." />
                <Input label="Guest count" value={guestCount} onChange={setGuestCount} required placeholder="e.g., 45" />
                <Input label="Event type" value={eventType} onChange={setEventType} required placeholder="Birthday, wedding, corporate, etc." />
                <Input label="Hours" value={hours} onChange={setHours} required placeholder="e.g., 4" />
              </div>

              <div className="mt-4">
                <Input
                  label="Vibe / theme"
                  value={vibeTheme}
                  onChange={setVibeTheme}
                  required
                  placeholder="Elegant, fun, black & gold, Barbie, etc."
                />
              </div>

              <div className="mt-4">
                <Select
                  label="Alcohol preference"
                  value={alcoholPreference}
                  onChange={setAlcoholPreference}
                  required
                  options={["Cocktails", "Mocktails", "Both"]}
                />
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={!canSubmit || status === "sending"}
                  className="rounded-xl bg-gradient-to-r from-[#FFC86A] to-[#FF4FB8] px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-[#FF4FB8]/10 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : "Submit Request"}
                </button>

                {status === "sent" ? (
                  <span className="text-sm text-white/75">✅ Sent! We’ll reach out soon.</span>
                ) : null}

                {status === "error" ? (
                  <span className="text-sm text-red-300">❌ {error}</span>
                ) : null}
              </div>

              <p className="mt-3 text-xs text-white/45">
                By submitting, you agree we can contact you back via email or phone.
              </p>
            </form>
          </div>
        </div>

        <footer className="relative mx-auto mt-10 max-w-6xl px-2 text-center text-xs text-white/45">
          © {new Date().getFullYear()} Sip &amp; Slay LLC • Premium luxury mobile bartending • Chicagoland
        </footer>
      </section>
    </main>
  );
}