"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const reviews = [
  { src: "/Reviews/review1.jpeg", width: 888, height: 351 },
  { src: "/Reviews/review2.jpeg", width: 1320, height: 412 },
  { src: "/Reviews/review3.jpeg", width: 1318, height: 422 },
  { src: "/Reviews/review4.jpeg", width: 851, height: 444 },
  { src: "/Reviews/review5.jpg", width: 853, height: 294 },
  { src: "/Reviews/review6.png", width: 605, height: 137 },
  { src: "/Reviews/review7.png", width: 591, height: 129 },
  { src: "/Reviews/review8.png", width: 600, height: 131 },
  { src: "/Reviews/review9.png", width: 599, height: 339 },
];

const ROTATE_MS = 6000;

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + reviews.length) % reviews.length);
  }, []);

  // Randomise which review is shown first. This runs in a timeout rather than
  // straight in the effect body so the server and the client still agree on the
  // initial HTML (both start on the first review) and hydration stays valid --
  // the jump happens a tick later, hidden by the fade.
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const t = window.setTimeout(() => {
      setIndex(Math.floor(Math.random() * reviews.length));
    }, 0);

    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (paused) return;

    // Honour the OS "reduce motion" setting by not auto-rotating at all.
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      // Each hop is random rather than sequential, so no two visits run the
      // reviews in the same order. Randomising at mount instead would give the
      // server and the client different HTML and trip a hydration error.
      setIndex((current) => {
        const choice = Math.floor(Math.random() * (reviews.length - 1));
        // Shift past the current index so a review never repeats back to back.
        return choice >= current ? choice + 1 : choice;
      });
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="mx-auto w-full max-w-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur">
        <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_top_left,rgba(255,200,106,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,79,184,0.16),transparent_36%)]" />

        {/* Fixed frame with object-contain. The screenshots range from 1.77 to
            4.58 in aspect ratio, so sizing the frame to the tallest one would
            leave the wide ones floating in dead space. Letterboxing costs
            nothing here because the screenshots are dark on a dark card. */}
        <div className="grid aspect-[2/1] bg-black/60 sm:aspect-[12/5]">
          {reviews.map((review, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={review.src}
              src={review.src}
              alt="Customer review of Sip & Slay LLC"
              width={review.width}
              height={review.height}
              aria-hidden={i !== index}
              className={
                "col-start-1 row-start-1 h-full w-full object-contain p-1.5 transition-opacity duration-700 ease-out sm:p-4 " +
                (i === index ? "opacity-100" : "pointer-events-none opacity-0")
              }
            />
          ))}
        </div>

        {/* A wide screenshot downscaled into a phone-width frame is simply
            small; no amount of frame height changes that. So give people a way
            to open the current review at full size instead. */}
        <a
          href={reviews[index].src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open this review full size"
          className="absolute bottom-2.5 right-2.5 z-30 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#FFC86A] backdrop-blur transition hover:border-[#FFC86A]/60 hover:bg-black/85 active:scale-95"
        >
          Full Size
          <span aria-hidden="true" className="text-white/50">&#8599;</span>
        </a>

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous review"
          className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/10 bg-black/55 p-2.5 text-[#FFC86A] backdrop-blur transition hover:border-[#FFC86A]/60 hover:bg-black/80 active:scale-95"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next review"
          className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/10 bg-black/55 p-2.5 text-[#FFC86A] backdrop-blur transition hover:border-[#FFC86A]/60 hover:bg-black/80 active:scale-95"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {reviews.map((review, i) => (
          <button
            key={review.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show review ${i + 1} of ${reviews.length}`}
            aria-current={i === index ? "true" : undefined}
            className={
              i === index
                ? "h-1.5 w-7 rounded-full bg-gradient-to-r from-[#FFC86A] to-[#FF4FB8] transition-all duration-300"
                : "h-1.5 w-1.5 rounded-full bg-white/25 transition-all duration-300 hover:bg-white/50"
            }
          />
        ))}
      </div>
    </div>
  );
}
