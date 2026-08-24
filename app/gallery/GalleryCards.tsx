const cardShell =
  "group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_28px_100px_rgba(255,79,184,0.16)]";

const cornerGlow =
  "pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,200,106,0.14),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,79,184,0.14),transparent_34%)] opacity-90";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type Clip = {
  src: string;
  poster: string;
};

export function PhotoCard({ item }: { item: Photo }) {
  return (
    <figure className={cardShell}>
      <div className={cornerGlow} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        loading="lazy"
        className="relative block h-auto w-full bg-black object-contain"
      />

      {item.caption ? (
        <figcaption className="relative z-20 border-t border-white/10 bg-black/50 px-5 py-3.5 text-center text-xs font-medium uppercase tracking-[0.24em] text-[#FFC86A] backdrop-blur">
          {item.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Menus are text-heavy documents people want to actually read, so each one
 * links to the full-size file. A plain anchor keeps this working with no
 * JavaScript and no lightbox library.
 */
export function MenuCard({ item }: { item: Photo }) {
  return (
    <a
      href={item.src}
      target="_blank"
      rel="noopener noreferrer"
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC86A]/70"
      aria-label={`${item.caption ?? item.alt} — open full size`}
    >
      <figure className={cardShell}>
        <div className={cornerGlow} />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          loading="lazy"
          className="relative block h-auto w-full bg-black object-contain"
        />

        <figcaption className="relative z-20 flex items-center justify-center gap-2 border-t border-white/10 bg-black/50 px-5 py-3.5 text-center text-xs font-medium uppercase tracking-[0.24em] text-[#FFC86A] backdrop-blur">
          {item.caption}
          <span className="text-white/40 transition group-hover:text-white/70">&#8599;</span>
        </figcaption>
      </figure>
    </a>
  );
}

export function ClipCard({ item }: { item: Clip }) {
  return (
    <div className={cardShell}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,200,106,0.14),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,79,184,0.14),transparent_34%)] opacity-90" />

      <video
        controls
        playsInline
        preload="metadata"
        poster={item.poster}
        className="relative z-10 block h-full w-full bg-black object-contain"
      >
        <source src={item.src} type="video/mp4" />
      </video>
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-3">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#FFC86A]/60" />
      <h2 className="text-[11px] font-medium uppercase tracking-[0.34em] text-white/70">
        {children}
      </h2>
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#FFC86A]/60" />
    </div>
  );
}
