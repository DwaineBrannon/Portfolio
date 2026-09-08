import { musicLinks, spotifyEmbed } from "@/lib/music";
import MusicHero from "@/app/components/MusicHero";
import SpotifyPlayer from "@/app/components/SpotifyPlayer";
import ImageCarousel from "@/app/components/ImageCarousel";


export default function MusicPage() {
  return (
    <main className="flex flex-col items-center">
      <MusicHero />

      <div id="music-content" className="grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[minmax(13rem,18rem)_minmax(0,1fr)_minmax(13rem,18rem)] lg:items-start lg:px-12">
        <aside className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">Listen</h2>
          <SpotifyPlayer uri={`spotify:${spotifyEmbed.type}:${spotifyEmbed.id}`} />

          <div className="flex flex-col gap-3">
            {musicLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full border px-5 py-3 font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </aside>

        <section className="min-w-0">
          <h2 className="mb-5 text-xl font-semibold">Videos</h2>
          <div className="flex aspect-video items-center justify-center border border-dashed border-zinc-300 bg-zinc-100 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/A5gGsIHINiY?si=J5hjzpAjQPOXSQW2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </section>

        <aside className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">Gallery</h2>
          <ImageCarousel />
        </aside>
      </div>
    </main>
  );
}