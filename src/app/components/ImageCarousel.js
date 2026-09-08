"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  {
    src: "/WIN_20230720_15_00_04_Pro.jpg",
    alt: "Dwaine Brannon",
    caption: "Dwaine Brannon",
  },
  {
    src: "/musicheader.png",
    alt: "Music artwork",
    caption: "ROZEPOP",
  },
];

export default function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
  };

  const activeImage = images[activeIndex];

  return (
    <div className="relative">
      <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes="(min-width: 1024px) 18rem, 100vw"
          className="object-cover transition-opacity duration-300"
        />
      </div>
      <p className="mt-3 min-h-6 text-center text-sm text-zinc-600 dark:text-zinc-400" aria-live="polite">
        {activeImage.caption}
      </p>

      <button
        type="button"
        onClick={showPrevious}
        aria-label="Show previous image"
        className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-lg text-white/90 transition-colors hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <span aria-hidden="true">&#8249;</span>
      </button>
      <button
        type="button"
        onClick={showNext}
        aria-label="Show next image"
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-lg text-white/90 transition-colors hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <span aria-hidden="true">&#8250;</span>
      </button>

      <div className="mt-2 flex justify-center gap-1.5" aria-label="Choose image">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show image ${index + 1}`}
            aria-current={index === activeIndex}
            className={`h-1.5 w-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 ${
              index === activeIndex ? "bg-pink-400/80" : "bg-zinc-300/60 dark:bg-zinc-700/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
