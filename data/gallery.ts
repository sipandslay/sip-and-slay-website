export type GalleryItem =
  | { type: "image"; src: string; alt: string; tag?: string }
  | { type: "video"; src: string; title: string; tag?: string };

export const galleryItems: GalleryItem[] = [
  // 🎥 Your real videos from /public/gallery
  { type: "video", src: "/gallery/clip1.mov", title: "Event clip 1", tag: "Highlights" },
  { type: "video", src: "/gallery/clip2.mov", title: "Event clip 2", tag: "Highlights" },
  { type: "video", src: "/gallery/clip3.mp4", title: "Event clip 3", tag: "Highlights" },

  // Temporary placeholder images (you can delete later)
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=1600&q=80",
    alt: "Cocktail photo",
    tag: "Cocktails",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1514361892635-e955d7b34d78?auto=format&fit=crop&w=1600&q=80",
    alt: "Bar setup",
    tag: "Setup",
  },
];
