export type GalleryItem =
  | { type: "image"; src: string; alt: string; tag: string }
  | { type: "video"; src: string; poster: string; title: string; tag: string };

export const galleryItems: GalleryItem[] = [
  // ✅ IMPORTANT:
  // Use MP4 for best compatibility. If your files are .mov right now,
  // convert them to .mp4 and update the src below.

  { type: "video", src: "/gallery/clip1.mov", poster: "/gallery/clip1-poster.png", title: "Event clip 1", tag: "Highlights" },
  { type: "video", src: "/gallery/clip2.mov", poster: "/gallery/clip2-poster.png", title: "Event clip 2", tag: "Highlights" },
  { type: "video", src: "/gallery/clip3.mp4", poster: "/gallery/clip3-poster.jpg", title: "Event clip 3", tag: "Highlights" },

]