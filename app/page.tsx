"use client";

import Image from "next/image";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";

const Accent = ({ children }: { children: ReactNode }) => (
  <span className="bg-gradient-to-r from-[#FFC86A] via-[#FF4FB8] to-[#FFC86A] bg-clip-text text-transparent">
    {children}
  </span>
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
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/25"
      />
    </label>
  );
}

function CheckboxGroup({
  label,
  values,
  onChange,
  options,
  required,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  options: string[];
  required?: boolean;
}) {
  function toggleOption(option: string) {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...values, option]);
    }
  }

  return (
    <fieldset className="block">
      <legend className="mb-2 text-xs text-white/70">
        {label} {required ? <span className="text-[#FFC86A]">*</span> : null}
      </legend>

      <div className="grid gap-3">
        {options.map((option) => {
          const checked = values.includes(option);

          return (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white transition hover:border-white/20"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleOption(option)}
                className="h-4 w-4 accent-[#FF4FB8]"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

const menuPackages = [
  {
    src: "/Menus/Bar Cart Experience.png",
    alt: "Bar Cart Experience — custom cocktails, professional bar setup, licensed bartender",
    title: "Bar Cart Experience",
  },
  {
    src: "/Menus/In-Home Mixology Classes.png",
    alt: "In-Home Mixology Classes — hands-on cocktail making, bar tools, games, and a professional mixologist",
    title: "In-Home Mixology Classes",
  },
  {
    src: "/Menus/Flavored Boba Lemonade & Mocktail Cart.png",
    alt: "Flavored Boba Lemonade & Mocktail Cart — flavors, custom mocktails, and packages",
    title: "Flavored Boba Lemonade & Mocktail Cart",
  },
  {
    src: "/Menus/Ice Cream Sundae Cart.png",
    alt: "Ice Cream Sundae Cart — flavors, toppings, drizzles, and add-ons",
    title: "Ice Cream Sundae Cart",
  },
  {
    src: "/Menus/Waffle Pop Cart.png",
    alt: "Waffle Pop Cart — freshly made waffle pops, toppings, drizzles, and add-ons",
    title: "Waffle Pop Cart",
  },
];

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [eventType, setEventType] = useState("");
  const [hours, setHours] = useState("");
  const [vibeTheme, setVibeTheme] = useState("");
  const [eventExperiences, setEventExperiences] = useState<string[]>([]);
  const [referredBy, setReferredBy] = useState("");

  const [website, setWebsite] = useState("");
  const [formStart] = useState(Date.now());

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return Boolean(
      email.trim() &&
        phone.trim() &&
        date.trim() &&
        city.trim() &&
        guestCount.trim() &&
        eventType.trim() &&
        hours.trim() &&
        vibeTheme.trim() &&
        eventExperiences.length > 0
    );
  }, [email, phone, date, city, guestCount, eventType, hours, vibeTheme, eventExperiences]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
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
          eventExperiences,
          referredBy,
          website,
          formStart,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Could not send. Try again.");
      }

      setStatus("sent");
      setError("");
      setEventExperiences([]);
      setReferredBy("");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send. Try again.");
    }
  }

  return (
    <main className="sip-bg sip-grain sip-text min-h-screen">
      <div className="sip-sparkles" />

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-56 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,200,106,0.22),transparent_60%)] blur-3xl" />
        <div className="absolute -top-20 right-[-220px] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,79,184,0.18),transparent_62%)] blur-3xl" />
        <div className="absolute bottom-[-420px] left-[-260px] h-[860px] w-[860px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,200,106,0.14),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <div className="sip-glow text-sm text-white/70">Sip &amp; Slay LLC</div>
            <div className="text-xs text-white/45">Luxury Cart Events</div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <a className="hover:text-white" href="#menus">
            Packages
          </a>
          <a className="hover:text-white" href="/gallery">
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
          className="rounded-xl border border-white/5 bg-gradient-to-r from-[#FFC86A] to-[#FF4FB8] px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-[#FF4FB8]/10 hover:brightness-110"
        >
          Request a Quote
        </a>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mt-10 flex justify-center">
            <div className="sip-logo-circle sip-logo-float">
              <span className="sip-logo-backglow" />
              <span className="sip-logo-shimmer" />

              <Image
                src="/logo.png"
                alt="Sip & Slay logo"
                width={1200}
                height={1200}
                priority
                className="sip-logo-image"
              />
            </div>
          </div>

          <h1 className="mt-10 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Sip something <Accent>unforgettable</Accent>.
            <br />
            Slay the whole <Accent>experience</Accent>.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed tracking-wide text-white/75 md:text-lg">
            From <Accent>signature cocktails</Accent> to{" "}
            <Accent>elevated dessert experiences</Accent>, Sip &amp; Slay brings stylish
            presentation and unforgettable moments to every event.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#contact"
              className="rounded-xl border border-white/5 bg-gradient-to-r from-[#FFC86A] to-[#D6A24A] px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(255,200,106,0.14)] hover:brightness-110"
            >
              Get availability + pricing
            </a>
            <a
              href="/gallery"
              className="group inline-flex items-center gap-2 rounded-xl border border-[#FFC86A]/60 bg-black/40 px-6 py-3 text-sm font-semibold tracking-wide text-[#FFC86A] backdrop-blur shadow-[0_10px_30px_rgba(255,200,106,0.14)] transition hover:border-[#FFC86A] hover:bg-[#FFC86A]/10 hover:shadow-[0_14px_40px_rgba(255,200,106,0.25)]"
            >
              View Gallery
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-medium uppercase tracking-[0.32em] text-white/80 sm:gap-x-5">
            <span>Birthdays</span>
            <span className="h-1 w-1 rounded-full bg-gradient-to-r from-[#FFC86A] to-[#FF4FB8]" />
            <span>Weddings</span>
            <span className="h-1 w-1 rounded-full bg-gradient-to-r from-[#FFC86A] to-[#FF4FB8]" />
            <span>Corporate</span>
            <span className="h-1 w-1 rounded-full bg-gradient-to-r from-[#FFC86A] to-[#FF4FB8]" />
            <span>Private Events</span>
          </div>
        </div>
      </section>

      <section id="menus" className="relative mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-12 text-center md:mb-14">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#FFC86A]/70" />
            <span className="text-[11px] font-medium uppercase tracking-[0.38em] text-[#FFC86A]">
              Signature Experiences
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#FFC86A]/70" />
          </div>

          <h2 className="sip-heading text-4xl font-semibold tracking-tight md:text-6xl">
            Packages
          </h2>

          <div className="mx-auto mt-4 h-[2px] w-20 rounded-full bg-gradient-to-r from-[#FFC86A] via-[#FF4FB8] to-[#FFC86A]" />

          <p className="mx-auto mt-5 max-w-2xl text-base font-light tracking-wide text-white/70 md:text-lg">
            Curated cart experiences — signature menus, styled details, and the finishing touches that elevate every event.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
          {menuPackages.map((item) => (
            <figure
              key={item.src}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_28px_100px_rgba(255,79,184,0.16)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,200,106,0.14),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,79,184,0.14),transparent_36%)] opacity-90" />

              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="relative z-10 block h-auto w-full object-contain transition duration-500 group-hover:scale-[1.015]"
              />

              <figcaption className="sr-only">{item.title}</figcaption>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
            </figure>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="/gallery"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/5 bg-gradient-to-r from-[#FFC86A] to-[#FF4FB8] px-6 py-3 text-sm font-semibold tracking-wide text-black shadow-[0_18px_40px_rgba(255,79,184,0.22)] transition hover:brightness-110"
          >
            See the full gallery
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>

      <section id="faq" className="relative mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-6">
          <h2 className="sip-heading text-2xl font-semibold tracking-tight md:text-3xl">FAQ</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 backdrop-blur">
            <div className="font-semibold text-white">Do you provide alcohol?</div>
            <div className="mt-2">
              No, we&apos;re a dry hire service. Which means we bring the bartending expertise, presentation and
              vibes — you provide the alcohol. This allows for more customization and flexibility. We can provide
              guidance on quantities and types of alcohol based on your custom menu and guest count.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 backdrop-blur">
            <div className="font-semibold text-white">What areas do you serve?</div>
            <div className="mt-2">
              Northwest suburbs + Chicagoland. If you&apos;re unsure, send the city and we&apos;ll confirm.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 backdrop-blur">
            <div className="font-semibold text-white">
              Do you provide the food for the waffle cart &amp; ice cream bar experiences?
            </div>
            <div className="mt-2">
              Yes. We provide all the necessary foods &amp; toppings based on guest count and price the package
              accordingly.
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative mx-auto max-w-6xl px-6 pb-16 pt-10">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Ready to <Accent>book</Accent>?
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Submit the form and we&apos;ll respond with availability + options.
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
                <CheckboxGroup
                  label="Experience(s) of interest"
                  values={eventExperiences}
                  onChange={setEventExperiences}
                  required
                  options={[
                    "Ice Cream Sundae Experience",
                    "Waffle Pop Experience",
                    "Mobile Bartending Experience (Alcohol)",
                    "Mobile Bartending Experience (Mocktails)",
                    "In-Home Mixology Classes",
                  ]}
                />
              </div>

              <div className="mt-4">
                <Input
                  label="Referred by (name)"
                  value={referredBy}
                  onChange={setReferredBy}
                  placeholder="Who referred you? (optional)"
                />
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={!canSubmit || status === "sending"}
                  className="rounded-xl bg-gradient-to-r from-[#FFC86A] to-[#FF4FB8] px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-[#FF4FB8]/10 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Submit Request"}
                </button>

                {status === "sent" ? (
                  <span className="text-sm text-white/75">✅ Sent! We&apos;ll reach out soon.</span>
                ) : null}

                {status === "error" ? <span className="text-sm text-red-300">❌ {error}</span> : null}
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
