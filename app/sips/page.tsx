export default function SipsPage() {

  const videos = [
    {
      src: "/Sips/clip1.mov",
      poster: "/Sips/clip1-poster.png"
    },
    {
      src: "/Sips/clip2.mov",
      poster: "/Sips/clip2-poster.png"
    },
    {
      src: "/Sips/clip3.mp4",
      poster: "/Sips/clip3-poster.jpg"
    }
  ];

  return (
    <main className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory sip-bg sip-text">

      <div className="sip-sparkles" />

      {/* header */}

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">

        <a
          href="/"
          className="text-sm text-white/80 hover:text-white"
        >
          ← Back
        </a>

        <div className="text-sm text-white/70">
          Sip & Slay • Sips
        </div>

      </header>

      {/* VIDEO FEED */}

      {videos.map((video, i) => (

        <section
          key={i}
          className="snap-start flex items-center justify-center h-screen w-full"
        >

          <div className="relative w-full h-full max-w-3xl flex items-center justify-center">

            <video
              className="h-full w-full object-cover rounded-2xl shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
              controls
              playsInline
              autoPlay
              muted
              loop
              preload="metadata"
              poster={video.poster}
            >
              <source src={video.src} />
            </video>

          </div>

        </section>

      ))}

    </main>
  );

}