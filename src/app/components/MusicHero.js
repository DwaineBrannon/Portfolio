"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SongPlayer from "@/app/components/SongPlayer";

export default function MusicHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blurAmount = Math.min(scrollY / 45, 8);

  return (
    <header className="relative min-h-120 w-full overflow-hidden bg-zinc-900 md:min-h-136">
      <div
        className="absolute -inset-2 transition-[filter] duration-150"
        style={{
          filter: `blur(${blurAmount}px)`,
          transform: `scale(${1 + blurAmount / 180})`,
        }}
      >
        <Image
          src="/musicheader.png"
          alt="Music header"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-black/65 via-black/25 to-black/45" />
      <div className="relative z-10 mx-auto flex min-h-120 w-full max-w-6xl flex-col items-start px-6 pt-10 text-white md:min-h-136 md:px-12 md:pt-14">
        <p className="music-hero-font max-w-xl text-left text-base leading-[1.35] text-white/95 drop-shadow-lg md:text-lg">
          <span className="font-semibold text-pink-300">ROZEPOP</span>{" "}is my music project. My music is a mix of pop, electronic, and experimental sounds.
          I&apos;ve always been fascinated by music as an art form, and I credit Lady Gaga and Madonna as my biggest influences.
          I&apos;ve been writing and releasing music for nearly a decade, and I&apos;ve been working hard on getting more music out there.
          You can find my music below, on Spotify, Apple Music, YouTube, Bandcamp, and... everywhere!<br /> <br /> 
          
          <span className="text-[9px] opacity 75">*Not available in Israel</span>
        </p>
        <div className="mt-8 w-full max-w-xl text-shadow-lg">
          <p className="music-hero-font mb-3 text-left text-sm font-semibold uppercase tracking-wide text-white drop-shadow-lg">
            Check Out <span className="text-blue-300">Blue</span>
          </p>
          <SongPlayer src="blue.wav" />
        </div>
        <a
          href="#music-content"
          aria-label="Scroll to music content"
          className="absolute bottom-5 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center"
        >
          <span className="h-3 w-3 rotate-45 border-b-2 border-r-2 border-white/90 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
