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
  alcoholPreference: string;
  website?: string; // honeypot
  formStart?: number; // timing trap
};

function sanitize(v: unknown) {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, 500);
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

  // obvious junk / filler / bot-ish patterns
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

  // way too many repeated same chars
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

    // basic bot trap: hidden field filled out
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
      alcoholPreference: sanitize(body.alcoholPreference),
      website: sanitize(body.website),
      formStart: typeof body.formStart === "number" ? body.formStart : 0,
    };

    // timing trap: humans take time, bots don't
    if (!payload.formStart || Date.now() - payload.formStart < 4000) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // required fields
    const required = [
      "email",
      "phone",
      "date",
      "city",
      "guestCount",
      "eventType",
      "hours",
      "vibeTheme",
      "alcoholPreference",
    ] as const;

    for (const k of required) {
      if (!payload[k]) {
        return NextResponse.json({ ok: false, error: `Missing ${k}` }, { status: 400 });
      }
    }

    // basic sanity validation
    if (!isValidEmail(payload.email)) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!isValidPhone(payload.phone)) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (payload.name && payload.name.length > 80) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (payload.vibeTheme.length > 150) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (
      looksLikeSpamText(payload.name || "") ||
      looksLikeSpamText(payload.city) ||
      looksLikeSpamText(payload.eventType) ||
      looksLikeSpamText(payload.vibeTheme)
    ) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const resend = new Resend(resendKey);

    const subject = `New Quote Request — ${payload.eventType} (${payload.date})`;

    const text = [
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
      `Alcohol preference: ${payload.alcoholPreference}`,
      "",
      `Sent: ${new Date().toISOString()}`,
    ].join("\n");

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: payload.email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}