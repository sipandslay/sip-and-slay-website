import { MenuCard, type Photo } from "../GalleryCards";

export const metadata = {
  title: "Custom Menus | Sip & Slay LLC Gallery",
  description:
    "Themed cocktail and mocktail menus designed for each event — holidays, birthdays, showers and corporate parties across Chicagoland.",
};

const files = [
  "menu1.jpeg",
  "menu2.png",
  "menu3.png",
  "menu4.png",
  "menu5.png",
  "menu6.png",
  "menu7.png",
  "menu8.png",
  "menu9.png",
];

const menus: Photo[] = files.map((file, i) => ({
  src: `/gallery/menus/${file}`,
  width: 1024,
  height: 1536,
  alt: `Sip & Slay custom themed cocktail and mocktail menu designed for a Chicagoland event (${
    i + 1
  } of ${files.length})`,
}));

export default function CustomMenusPage() {
  return (
    <>
      <p className="mx-auto mb-10 max-w-2xl text-center text-sm font-light leading-relaxed tracking-wide text-white/65 md:text-base">
        Every event gets its own menu, designed around your theme and colors.
      </p>

      <div className="grid items-start gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {menus.map((item) => (
          <MenuCard key={item.src} item={item} />
        ))}
      </div>
    </>
  );
}
