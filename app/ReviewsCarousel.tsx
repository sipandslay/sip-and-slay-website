"use client";

import { useCallback, useEffect, useState } from "react";

const reviews = [
  { src: "/Reviews/review1.jpeg", width: 888, height: 351 },
  { src: "/Reviews/review2.jpeg", width: 1320, height: 412 },
  { src: "/Reviews/review3.jpeg", width: 1318, height: 422 },
  { src: "/Reviews/review4.jpeg", width: 851, height: 444 },
  { src: "/Reviews/review5.jpg", width: 853, height: 294 },
];

const ROTATE_MS = 6000;

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (paused) return;

    // Honour the OS "reduce motion" setting by not auto-rotating at all.
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
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

        {/* Every slide occupies the same grid cell, so the frame takes the height
            of the tallest review and never jumps as it rotates. */}
        <div className="grid bg-black/60">
          {reviews.map((review, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={review.src}
              src={review.src}
              alt="Customer review of Sip & Slay LLC"
              width={review.width}
              height={review.height}
              aria-hidden={i !== index}
              className={`col-start-1 row-start-1 h-auto w-full self-center transition-opacity duration-700 ease-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

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

      <div className="mt-6 flex items-center justify-center gap-2.5">
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
