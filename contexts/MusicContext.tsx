"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from "react";

export const TRACKS = [
  { id: 1, title: "I DO BELIEVE",       file: "01-i-do-believe.m4a" },
  { id: 2, title: "MIND IN THE WIND",   file: "02-my-mind-in-the-wind.m4a" },
  { id: 3, title: "LIKE A DREAM",       file: "03-picture-of-you.m4a" },
  { id: 4, title: "CORNER OF MY SOUL",  file: "04-the-corner-of-my-soul.m4a" },
  { id: 5, title: "MOONLIGHT DRIVE",    file: "05-happy-and-sad.m4a" },
  { id: 6, title: "NOW I'M BORN",       file: "06-now-im-born.m4a" },
];

export const AUDIO_BASE = "/audio/skipping-record/";
export const COVER      = "/images/skipping-record/cover.jpg";

/* ── Singleton audio — vit hors de React, jamais détruit ── */
let _audio: HTMLAudioElement | null = null;
function getAudio(): HTMLAudioElement {
  if (typeof window === "undefined") return null as unknown as HTMLAudioElement;
  if (!_audio) {
    _audio = new Audio();
    _audio.preload = "metadata";
  }
  return _audio;
}

interface MusicContextType {
  current:       number;
  playing:       boolean;
  progress:      number;
  elapsed:       number;
  duration:      number;
  volume:        number;
  durations:     Record<number, number>;
  hasVisited:    boolean;
  progressRef:   React.RefObject<HTMLDivElement>;
  setCurrent:    (i: number) => void;
  setVolume:     (v: number) => void;
  setHasVisited: (v: boolean) => void;
  togglePlay:    () => void;
  playTrack:     (i: number) => void;
  prevTrack:     () => void;
  nextTrack:     () => void;
  seekTo:        (e: React.MouseEvent<HTMLDivElement>) => void;
  audioRef:      React.MutableRefObject<HTMLAudioElement | null>;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const progressRef = useRef<HTMLDivElement>(null);
  const audioRef    = useRef<HTMLAudioElement | null>(null);

  const [current,    setCurrent]    = useState(0);
  const [playing,    setPlaying]    = useState(false);
  const [progress,   setProgress]   = useState(0);
  const [elapsed,    setElapsed]    = useState(0);
  const [duration,   setDuration]   = useState(0);
  const [volume,     setVolume]     = useState(1);
  const [durations,  setDurations]  = useState<Record<number, number>>({});
  const [hasVisited, setHasVisited] = useState(false);

  /* ── Attacher les listeners au singleton audio ── */
  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setElapsed(audio.currentTime);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded  = () => setCurrent(i => (i + 1) % TRACKS.length);

    audio.addEventListener("timeupdate",     onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended",          onEnded);

    /* Cleanup : retire seulement les listeners, NE pause PAS l'audio */
    return () => {
      audio.removeEventListener("timeupdate",     onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended",          onEnded);
    };
  }, []);

  /* ── Pré-charger les durées ── */
  useEffect(() => {
    TRACKS.forEach((t, i) => {
      const a = new Audio();
      a.preload = "metadata";
      a.src = AUDIO_BASE + t.file;
      a.addEventListener("loadedmetadata", () => {
        setDurations(prev => ({ ...prev, [i]: a.duration }));
      });
    });
  }, []);

  /* ── Charger la piste quand current change ── */
  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;
    const wasPlaying = !audio.paused;
    audio.src = AUDIO_BASE + TRACKS[current].file;
    audio.load();
    setProgress(0);
    setElapsed(0);
    setDuration(0);
    if (wasPlaying) audio.play().catch(() => setPlaying(false));
  }, [current]);

  /* ── Volume ── */
  useEffect(() => {
    const audio = getAudio();
    if (audio) audio.volume = volume;
  }, [volume]);

  const togglePlay = useCallback(() => {
    const audio = getAudio();
    if (!audio) return;
    if (!audio.paused) { audio.pause(); setPlaying(false); }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}); }
  }, []);

  const playTrack = useCallback((idx: number) => {
    const audio = getAudio();
    if (!audio) return;
    if (idx === current) { togglePlay(); return; }
    setCurrent(idx);
    setPlaying(true);
    setTimeout(() => {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }, 80);
  }, [current, togglePlay]);

  const prevTrack = useCallback(() => {
    const audio = getAudio();
    if (audio && audio.currentTime > 3) { audio.currentTime = 0; }
    else { setCurrent(i => (i - 1 + TRACKS.length) % TRACKS.length); }
  }, []);

  const nextTrack = useCallback(() => {
    setCurrent(i => (i + 1) % TRACKS.length);
  }, []);

  const seekTo = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = getAudio();
    const bar   = progressRef.current;
    if (!audio || !bar || !audio.duration) return;
    const rect  = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  }, []);

  return (
    <MusicContext.Provider value={{
      current, playing, progress, elapsed, duration, volume, durations, hasVisited,
      audioRef, progressRef,
      setCurrent, setVolume, setHasVisited,
      togglePlay, playTrack, prevTrack, nextTrack, seekTo,
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
