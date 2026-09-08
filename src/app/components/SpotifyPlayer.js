"use client";

import { useEffect, useRef } from "react";

let spotifyApiPromise;

function loadSpotifyApi() {
  if (spotifyApiPromise) return spotifyApiPromise;

  spotifyApiPromise = new Promise((resolve) => {
    if (window.SpotifyIframeApi) {
      resolve(window.SpotifyIframeApi);
      return;
    }

    window.onSpotifyIframeApiReady = (api) => resolve(api);
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);
  });

  return spotifyApiPromise;
}

export default function SpotifyPlayer({ uri }) {
  const containerRef = useRef(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    loadSpotifyApi().then((spotifyApi) => {
      if (!isMounted || !containerRef.current) return;

      spotifyApi.createController(
        containerRef.current,
        { uri, width: "100%", height: 352 },
        (controller) => {
          controllerRef.current = controller;

          controller.addListener("playback_update", (event) => {
            if (!event.data.isPaused) {
              window.dispatchEvent(
                new CustomEvent("shared-audio-play", {
                  detail: controller,
                }),
              );
            }
          });
        },
      );
    });

    const handleOtherAudioPlay = (event) => {
      if (event.detail !== controllerRef.current) {
        controllerRef.current?.pause();
      }
    };
    const handleNativeMediaPlay = () => {
      controllerRef.current?.pause();
    };

    window.addEventListener("shared-audio-play", handleOtherAudioPlay);
    document.addEventListener("play", handleNativeMediaPlay, true);

    return () => {
      isMounted = false;
      window.removeEventListener("shared-audio-play", handleOtherAudioPlay);
      document.removeEventListener("play", handleNativeMediaPlay, true);
      controllerRef.current?.pause();
      controllerRef.current = null;
    };
  }, [uri]);

  return <div ref={containerRef} className="w-full overflow-hidden rounded-xl" />;
}