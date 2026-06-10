"use client";

import { useMusic } from "@/contexts/MusicContext";
import GlobalMusicPlayer from "@/components/GlobalMusicPlayer";

// Toujours monté — visibilité gérée par CSS dans GlobalMusicPlayer
export default function MusicPlayerGate() {
  const { hasVisited } = useMusic();
  return <GlobalMusicPlayer forceHide={!hasVisited} />;
}
