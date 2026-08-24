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
];

export default function EventPhotosPage() {
  return (
    <div className="grid items-start gap-5 sm:gap-6 sm:grid-cols-2">
      {photos.map((item) => (
        <PhotoCard key={item.src} item={item} />
      ))}
    </div>
  );
}
