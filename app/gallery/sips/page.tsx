import { ClipCard, PhotoCard, SectionLabel, type Clip, type Photo } from "../GalleryCards";

export const metadata = {
  title: "Sips & Sweets | Sip & Slay LLC Gallery",
  description:
    "Signature cocktails, mocktails, waffle pops and ice cream sundaes in motion — the Sip & Slay product up close.",
};

const clips: Clip[] = [
  // Dimensions are the VIDEO's, not the poster's. The posters are cropped
  // stills at different ratios, and sizing the card to them letterboxed the
  // actual 9:16 footage inside it.
  { src: "/gallery/sips/clip1.mp4", poster: "/gallery/sips/clip1-poster.png", width: 480, height: 854 },
  { src: "/gallery/sips/clip2.mp4", poster: "/gallery/sips/clip2-poster.png", width: 480, height: 854 },
  { src: "/gallery/sips/clip3.mp4", poster: "/gallery/sips/clip3-poster.jpg", width: 576, height: 1024 },
];

const stills: Photo[] = [
  {
    src: "/gallery/sips/event-drinks.jpg",
    alt: "Sip & Slay signature mocktails poured and garnished at a Chicago event",
    width: 1469,
    height: 1918,
  },
  {
    src: "/gallery/sips/dessert-drink-spread.png",
    alt: "Sip & Slay dessert and drink spread — waffle pops, ice cream sundaes and flavored drinks under the neon sign",
    width: 1122,
    height: 1402,
  },
  {
    src: "/gallery/sips/sip.jpg",
    alt: "Sip & Slay signature drink served at a Chicagoland event",
    width: 4284,
    height: 5712,
  },
];

export default function SipsAndSweetsPage() {
  return (
    <>
      <p className="mx-auto mb-10 max-w-2xl text-center text-sm font-light leading-relaxed tracking-wide text-white/65 md:text-base">
        The sips that start the night, and the sweets that finish it.
      </p>

      <SectionLabel>In Motion</SectionLabel>

      <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {clips.map((item) => (
          <ClipCard key={item.src} item={item} />
        ))}
      </div>

      <div className="mt-14">
        <SectionLabel>The Spread</SectionLabel>

        <div className="grid items-start gap-5 sm:gap-6 sm:grid-cols-2">
          {stills.map((item) => (
            <PhotoCard key={item.src} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
