// /app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email: string;
  phone: string;
  date: string;
  city: string;
  guestCount: string;
  eventType: string;
  hours: string;
  vibeTheme: string;
  eventExperiences: string[];
  referredBy?: string;
  website?: string; // honeypot
  formStart?: number; // timing trap
};

function sanitize(v: unknown) {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, 500);
}

function sanitizeStringArray(v: unknown) {
  if (!Array.isArray(v)) return [];
  return v
    .map((item) => sanitize(item))
    .filter(Boolean)
    .slice(0, 10);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}

function looksLikeSpamText(value: string) {
  if (!value) return false;

  const lower = value.toLowerCase();

  if (
    lower.includes("asdf") ||
    lower.includes("qwerty") ||
    lower.includes("testtest") ||
    lower.includes("lorem") ||
    lower.includes("ipsum") ||
    lower.includes("http://") ||
    lower.includes("https://") ||
    lower.includes("www.")
  ) {
    return true;
  }

  if (/(.)\1{5,}/.test(lower)) {
    return true;
  }

  return false;
}

export async function POST(req: Request) {
  try {
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "sipandslayllc@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Sip & Slay <onboarding@resend.dev>";

    if (!resendKey) {
      return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

    const body = (await req.json()) as Partial<Payload>;

    // Honeypot is the one hard block: the field is hidden and has no name
    // attribute, so a real person can never fill it in. Bots only.
    if (sanitize(body.website)) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const payload: Payload = {
      name: sanitize(body.name),
      email: sanitize(body.email),
      phone: sanitize(body.phone),
      date: sanitize(body.date),
      city: sanitize(body.city),
      guestCount: sanitize(body.guestCount),
      eventType: sanitize(body.eventType),
      hours: sanitize(body.hours),
      vibeTheme: sanitize(body.vibeTheme),
      eventExperiences: sanitizeStringArray(body.eventExperiences),
      referredBy: sanitize(body.referredBy),
      website: sanitize(body.website),
      formStart: typeof body.formStart === "number" ? body.formStart : 0,
    };

    const required = [
      "email",
      "phone",
      "date",
      "city",
      "guestCount",
      "eventType",
      "hours",
      "vibeTheme",
    ] as const;

    for (const k of required) {
      if (!payload[k]) {
        return NextResponse.json({ ok: false, error: `Missing ${k}` }, { status: 400 });
      }
    }

    if (payload.eventExperiences.length === 0) {
      return NextResponse.json({ ok: false, error: "Missing event experiences" }, { status: 400 });
    }

    // Everything past this point is a *soft* signal. We still deliver the lead —
    // it just arrives tagged so you can judge it yourself instead of a regex
    // throwing away a real booking.
    const flags: string[] = [];

    if (!payload.formStart || Date.now() - payload.formStart < 4000) {
      flags.push("Form was submitted in under 4 seconds — typical of a bot, but autofill can do it too");
    }

    if (!isValidEmail(payload.email)) {
      flags.push(`Email address does not look valid: "${payload.email}"`);
    }

    if (!isValidPhone(payload.phone)) {
      flags.push(`Phone number has fewer than 10 digits: "${payload.phone}"`);
    }

    if (payload.name && payload.name.length > 80) {
      flags.push(`Name is unusually long (${payload.name.length} characters)`);
    }

    if (payload.vibeTheme.length > 150) {
      flags.push(`Vibe/theme is unusually long (${payload.vibeTheme.length} characters)`);
    }

    const spamFields: string[] = [];
    if (looksLikeSpamText(payload.name || "")) spamFields.push("Name");
    if (looksLikeSpamText(payload.city)) spamFields.push("City");
    if (looksLikeSpamText(payload.eventType)) spamFields.push("Event type");
    if (looksLikeSpamText(payload.vibeTheme)) spamFields.push("Vibe/theme");
    if (payload.eventExperiences.some(looksLikeSpamText)) spamFields.push("Experience(s)");

    if (spamFields.length > 0) {
      flags.push(
        `Gibberish or a web link was found in: ${spamFields.join(", ")} — note that a customer pasting an inspiration link will trip this`
      );
    }

    const resend = new Resend(resendKey);

    const flagged = flags.length > 0;

    const subject = flagged
      ? `[REVIEW] New Quote Request — ${payload.eventType} (${payload.date})`
      : `New Quote Request — ${payload.eventType} (${payload.date})`;

    const header = flagged
      ? [
          "!! FLAGGED FOR YOUR REVIEW !!",
          "",
          `This submission tripped ${flags.length} automated check${flags.length === 1 ? "" : "s"}:`,
          ...flags.map((f) => `  - ${f}`),
          "",
          "It may still be a real customer. Nothing was blocked — the full submission",
          "is below exactly as it was typed. Use your judgment.",
          "",
          "--------------------------------------------------",
          "",
        ]
      : [];

    const text = [
      ...header,
      "NEW SIP & SLAY WEBSITE SUBMISSION",
      "",
      `Name: ${payload.name || "(not provided)"}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      "",
      `Date: ${payload.date}`,
      `City: ${payload.city}`,
      `Guest count: ${payload.guestCount}`,
      `Event type: ${payload.eventType}`,
      `Hours: ${payload.hours}`,
      `Vibe/theme: ${payload.vibeTheme}`,
      `Experience(s) of interest: ${payload.eventExperiences.join(", ")}`,
      `Referred by: ${payload.referredBy || "(not provided)"}`,
      "",
      `Sent: ${new Date().toISOString()}`,
    ].join("\n");

    // Only reply-to the customer when their address is actually valid — a
    // malformed one can make Resend reject the send outright and lose the lead.
    // Falling back to your own address keeps the send safe either way.
    const replyTo = isValidEmail(payload.email) ? payload.email : toEmail;

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo,
      subject,
      text,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
