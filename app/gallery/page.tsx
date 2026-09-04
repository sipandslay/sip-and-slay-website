import { PhotoCard, type Photo } from "./GalleryCards";

export const metadata = {
  title: "Event Photos | Sip & Slay LLC Gallery",
  description:
    "Real Sip & Slay event setups across Chicagoland — styled bar carts, custom menus and the details that finish a room.",
};

const photos: Photo[] = [
  {
    src: "/gallery/events/event-setup.jpg",
    alt: "Sip & Slay bar cart styled with a custom mocktail menu, gold accents and tip station",
    width: 1800,
    height: 1350,
  },
  {
    src: "/gallery/events/backyard-bar-cart.jpg",
    alt: "Sip & Slay backyard bar cart setup with custom cocktail menu and string lights",
    width: 1920,
    height: 2400,
  },
  {
    src: "/gallery/events/setup.jpeg",
    alt: "Sip & Slay event setup at a Chicagoland event",
    width: 1795,
    height: 2400,
  },
  {
    src: "/gallery/events/setup1.jpeg",
    alt: "Sip & Slay event setup at a Chicagoland event",
    width: 4284,
    height: 5712,
  },
  {
    src: "/gallery/events/setup2.jpeg",
    alt: "Sip & Slay event setup at a Chicagoland event",
    width: 2400,
    height: 1795,
  },
  {
    src: "/gallery/events/setup3.jpeg",
    alt: "Sip & Slay event setup at a Chicagoland event",
    width: 4284,
    height: 5712,
  },
  {
    src: "/gallery/events/setup4.jpg",
    alt: "Sip & Slay event setup at a Chicagoland event",
    width: 5712,
    height: 4284,
  },
  {
    src: "/gallery/events/setup5.jpg",
    alt: "Sip & Slay event setup at a Chicagoland event",
    width: 4032,
    height: 3024,
  },
  {
    src: "/gallery/events/setup6.jpg",
    alt: "Sip & Slay event setup at a Chicagoland event",
    width: 4284,
    height: 5712,
  },
];

export default function EventPhotosPage() {
  return (
    <>
      <p className="mx-auto mb-10 max-w-2xl text-center text-sm font-light leading-relaxed tracking-wide text-white/65 md:text-base">
        Book with us today and have your event slayed!
      </p>

      <div className="grid items-start gap-5 sm:gap-6 sm:grid-cols-2">
        {photos.map((item) => (
          <PhotoCard key={item.src} item={item} />
        ))}
      </div>
    </>
  );
}
