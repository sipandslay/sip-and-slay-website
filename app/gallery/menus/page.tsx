import { MenuCard, type Photo } from "../GalleryCards";

export const metadata = {
  title: "Custom Menus | Sip & Slay LLC Gallery",
  description:
    "Themed cocktail and mocktail menus designed for each event — holidays, birthdays, showers and corporate parties across Chicagoland.",
};

// Dimensions are per file rather than shared: the newer menus are photographed
// or exported at different sizes, and a wrong width/height here reserves the
// wrong space and makes the grid jump as each one loads.
const files: { file: string; width: number; height: number }[] = [
  { file: "menu1.jpeg", width: 1024, height: 1536 },
  { file: "menu2.png", width: 1024, height: 1536 },
  { file: "menu3.png", width: 1024, height: 1536 },
  { file: "menu4.png", width: 1024, height: 1536 },
  { file: "menu5.png", width: 1024, height: 1536 },
  { file: "menu6.png", width: 1024, height: 1536 },
  { file: "menu7.png", width: 1024, height: 1536 },
  { file: "menu8.png", width: 1024, height: 1536 },
  { file: "menu9.png", width: 1024, height: 1536 },
  { file: "menu10.png", width: 1024, height: 1536 },
  { file: "menu11.jpeg", width: 4284, height: 5712 },
  { file: "menu12.jpeg", width: 1597, height: 2400 },
  { file: "menu13.jpeg", width: 1597, height: 2400 },
  { file: "menu14.png", width: 1024, height: 1536 },
  { file: "menu15.png", width: 1023, height: 1537 },
];

const menus: Photo[] = files.map(({ file, width, height }, i) => ({
  src: `/gallery/menus/${file}`,
  width,
  height,
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
