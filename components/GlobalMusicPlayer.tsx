"use client";

import { useMusic, TRACKS, COVER } from "@/contexts/MusicContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function fmt(s: number) {
  if (!s || isNaN(s)) return "—";
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${m}:${ss.toString().padStart(2, "0")}`;
}

export default function GlobalMusicPlayer({ forceHide = false }: { forceHide?: boolean }) {
  const {
    current, playing, progress, elapsed, duration, volume,
    audioRef, progressRef, togglePlay, prevTrack, nextTrack, seekTo, setVolume,
  } = useMusic();

  const pathname = usePathname();
  const onMusic  = pathname === "/music";

  const [closed, setClosed] = useState(false);

  // Rouvrir automatiquement quand on revient sur /music
  useEffect(() => {
    if (onMusic) setClosed(false);
  }, [onMusic]);

  // Raccourcis clavier
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (forceHide || closed) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === " ")          { e.preventDefault(); togglePlay(); }
      if (e.key === "ArrowRight") { e.preventDefault(); nextTrack(); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); prevTrack(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [forceHide, closed, togglePlay, nextTrack, prevTrack]);

  const visible = !forceHide && !closed;
  const track   = TRACKS[current];

  return (
    <div style={{
      position:        "fixed",
      bottom:          0,
      left:            0,
      right:           0,
      zIndex:          500,
      backgroundColor: "#ffffff",
      borderTop:       "1px solid #e8e5e1",
      padding:         "0 clamp(1rem, 4vw, 3rem)",
      height:          "72px",
      display:         visible ? "flex" : "none",
      alignItems:      "center",
      gap:             "1.5rem",
    }}>
      {/* Cover + title */}
      <div className="player-cover" style={{ display: "flex", alignItems: "center", gap: "0.85rem", minWidth: "180px", flex: "0 0 auto" }}>
        <div style={{ width: "40px", height: "40px", flexShrink: 0, backgroundColor: "#ece9e4", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={COVER} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div>
          <p style={{
            fontFamily:    "var(--font-space), sans-serif",
            fontSize:      "0.66rem",
            letterSpacing: "0.06em",
            color:         "#1a1a1a",
            marginBottom:  "0.15rem",
            whiteSpace:    "nowrap",
          }}>
            {track.title}
          </p>
          <p style={{
            fontFamily:    "var(--font-space), sans-serif",
            fontSize:      "0.50rem",
            letterSpacing: "0.1em",
            color:         "#b0aca7",
          }}>
            Noah Scheidler
          </p>
        </div>
      </div>

      {/* Controls + progress */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.8rem" }}>
          <button type="button" onClick={prevTrack} style={btnStyle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
          </button>

          <button type="button" onClick={togglePlay} style={{
            ...btnStyle,
            width:          "36px",
            height:         "36px",
            borderRadius:   "50%",
            border:         "1.5px solid #1a1a1a",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
          }}>
            {playing
              ? <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6zm8-14v14h4V5z"/></svg>
              : <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            }
          </button>

          <button type="button" onClick={nextTrack} style={btnStyle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/>
            </svg>
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", width: "100%", maxWidth: "480px" }}>
          <span style={timeStyle}>{fmt(elapsed)}</span>
          <div
            ref={progressRef}
            onClick={seekTo}
            style={{ flex: 1, height: "2px", backgroundColor: "#e8e5e1", cursor: "pointer", position: "relative" }}
          >
            <div style={{
              position:        "absolute",
              left:            0,
              top:             0,
              height:          "100%",
              width:           `${progress * 100}%`,
              backgroundColor: "#1a1a1a",
              transition:      "width 0.1s linear",
            }} />
          </div>
          <span style={timeStyle}>{fmt(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="player-volume" style={{ display: "flex", alignItems: "center", gap: "0.6rem", flex: "0 0 auto" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#b0aca7">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
        </svg>
        <input
          type="range"
          min={0} max={1} step={0.02}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          style={{ width: "72px", accentColor: "#1a1a1a", cursor: "pointer" }}
        />
      </div>

      {/* Bouton fermer — masqué sur /music */}
      {!onMusic && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (audioRef.current) audioRef.current.pause();
            setClosed(true);
          }}
          style={{
            background:  "none",
            border:      "none",
            cursor:      "pointer",
            color:       "#c8c4bf",
            fontSize:    "1.2rem",
            lineHeight:  1,
            padding:     "4px 8px",
            flexShrink:  0,
            transition:  "color 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#1a1a1a")}
          onMouseLeave={e => (e.currentTarget.style.color = "#c8c4bf")}
          aria-label="Fermer le player"
        >
          ✕
        </button>
      )}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  background: "none",
  border:     "none",
  cursor:     "pointer",
  color:      "#1a1a1a",
  padding:    "4px",
  display:    "flex",
  alignItems: "center",
  lineHeight: 1,
};

const timeStyle: React.CSSProperties = {
  fontFamily:    "var(--font-space), sans-serif",
  fontSize:      "0.42rem",
  letterSpacing: "0.06em",
  color:         "#b0aca7",
  minWidth:      "2.4rem",
  textAlign:     "center",
};
