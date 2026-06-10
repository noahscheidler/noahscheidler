"use client";

import { useEffect } from "react";
import SubpageLayout from "@/components/SubpageLayout";
import { useMusic, TRACKS, COVER, AUDIO_BASE } from "@/contexts/MusicContext";

function fmt(s: number) {
  if (!s || isNaN(s)) return "—";
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${m}:${ss.toString().padStart(2, "0")}`;
}

export default function MusicPage() {
  const { current, playing, durations, playTrack, setHasVisited } = useMusic();

  useEffect(() => { setHasVisited(true); }, [setHasVisited]);

  return (
    <>
      <SubpageLayout title="SKIPPING RECORD">

        {/* ── EP info ── */}
        <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start", marginBottom: "4rem", flexWrap: "wrap" }}>
          <div style={{ width: "180px", height: "180px", flexShrink: 0, backgroundColor: "#ece9e4", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={COVER} alt="Skipping Record" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "0.4rem" }}>
            <p style={{
              fontFamily:    "var(--font-space), sans-serif",
              fontSize:      "0.54rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "#b0aca7",
              marginBottom:  "0.6rem",
            }}>EP · 2026</p>
            <p style={{
              fontFamily:    "var(--font-space), sans-serif",
              fontSize:      "0.84rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:         "#1a1a1a",
              marginBottom:  "0.4rem",
            }}>Skipping Record</p>
            <p style={{
              fontFamily:    "var(--font-space), sans-serif",
              fontSize:      "0.60rem",
              letterSpacing: "0.12em",
              color:         "#b0aca7",
            }}>Noah Scheidler · 6 titres</p>
          </div>
        </div>

        {/* ── Tracklist ── */}
        <div style={{ borderTop: "1px solid #e8e5e1" }}>
          {TRACKS.map((t, i) => {
            const isActive = i === current;
            return (
              <div
                key={t.id}
                onClick={() => playTrack(i)}
                style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          "1.5rem",
                  padding:      "1.1rem 0",
                  borderBottom: "1px solid #e8e5e1",
                  cursor:       "pointer",
                }}
              >
                <div style={{
                  width:         "1.6rem",
                  textAlign:     "center",
                  fontFamily:    "var(--font-space), sans-serif",
                  fontSize:      "0.60rem",
                  letterSpacing: "0.1em",
                  color:         isActive ? "#1a1a1a" : "#c8c4bf",
                  flexShrink:    0,
                }}>
                  {isActive && playing ? "▶" : String(t.id).padStart(2, "0")}
                </div>

                <div style={{ width: "38px", height: "38px", flexShrink: 0, backgroundColor: "#ece9e4", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={COVER} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>

                <span style={{
                  flex:          1,
                  fontFamily:    "var(--font-space), sans-serif",
                  fontSize:      "0.78rem",
                  letterSpacing: "0.06em",
                  color:         isActive ? "#1a1a1a" : "#3a3a3a",
                  fontWeight:    isActive ? 500 : 400,
                  transition:    "color 0.2s ease",
                }}>
                  {t.title}
                </span>

                <span style={{
                  fontFamily:    "var(--font-space), sans-serif",
                  fontSize:      "0.58rem",
                  letterSpacing: "0.08em",
                  color:         "#c8c4bf",
                  flexShrink:    0,
                }}>
                  {durations[i] ? fmt(durations[i]) : "—"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Padding for fixed player */}
        <div style={{ height: "6rem" }} />
      </SubpageLayout>
    </>
  );
}
