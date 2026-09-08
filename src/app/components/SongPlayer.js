"use client";
import { useEffect, useRef, useState } from "react";

export default function SongPlayer({ src, title = "Blue" }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => {
      window.dispatchEvent(
        new CustomEvent("shared-audio-play", { detail: audio }),
      );
    };
    const handleOtherAudioPlay = (event) => {
      if (event.detail !== audio) {
        audio.pause();
        setIsPlaying(false);
      }
    };
    const handleNativeMediaPlay = (event) => {
      if (event.target === audio) return;

      window.dispatchEvent(
        new CustomEvent("shared-audio-play", { detail: event.target }),
      );
      audio.pause();
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    window.addEventListener("shared-audio-play", handleOtherAudioPlay);
    document.addEventListener("play", handleNativeMediaPlay, true);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      window.removeEventListener("shared-audio-play", handleOtherAudioPlay);
      document.removeEventListener("play", handleNativeMediaPlay, true);
    };
  }, []);

  const onPlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const onSeek = (event) => {
    const nextTime = Number(event.target.value);
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const onVolumeChange = (event) => {
    const nextVolume = Number(event.target.value);
    audioRef.current.volume = nextVolume;
    setVolume(nextVolume);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onPlayPause}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-sm text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 dark:bg-white dark:text-black dark:focus:ring-offset-zinc-950"
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="truncate font-semibold">{title}</span>
            <span className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.01"
            value={currentTime}
            onChange={onSeek}
            disabled={!duration}
            className="h-1.5 w-full cursor-pointer accent-pink-500 disabled:cursor-default"
            aria-label={`Seek through ${title}`}
          />
        </div>

        <label className="hidden items-center gap-2 text-zinc-500 sm:flex" aria-label="Volume">
          <span aria-hidden="true">♪</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={onVolumeChange}
            className="w-16 cursor-pointer accent-pink-500"
            aria-label="Volume"
          />
        </label>
      </div>
    </div>
  );
}