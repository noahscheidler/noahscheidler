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

        {/* ── Liens streaming ──────────────────────── */}
        <div style={{
          display:    "flex",
          alignItems: "center",
          gap:        "2rem",
          marginTop:  "5rem",
        }}>
          <a
            href="https://open.spotify.com/album/2XKzxgwFLyfZ9AX8TIIrIp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify"
            style={{ color: "#c8c4bf", transition: "color 0.22s ease", display: "flex" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#1a1a1a")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#c8c4bf")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.216.36-.672.48-1.032.24-2.832-1.728-6.396-2.112-10.596-1.156-.42.096-.828-.168-.924-.588-.096-.42.168-.828.588-.924 4.596-1.044 8.532-.6 11.724 1.38.36.216.48.672.24 1.032v.016zm1.464-3.276c-.276.444-.852.6-1.296.324-3.24-1.992-8.184-2.568-12.012-1.404-.504.156-1.044-.132-1.2-.636-.156-.504.132-1.044.636-1.2 4.38-1.332 9.84-.684 13.572 1.62.444.276.6.852.3 1.296zm.12-3.42c-3.888-2.304-10.296-2.52-14.004-1.392-.6.18-1.236-.156-1.416-.756-.18-.6.156-1.236.756-1.416 4.26-1.296 11.328-1.044 15.792 1.62.54.324.72 1.02.396 1.56-.324.54-1.02.72-1.524.384z"/>
            </svg>
          </a>

          <a
            href="https://music.apple.com/us/album/skipping-record-ep/6778211519?uo=4"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apple Music"
            style={{ display: "flex" }}
            onMouseEnter={(e) => { const s = e.currentTarget.querySelector("svg") as SVGElement; if (s) s.style.opacity = "1"; }}
            onMouseLeave={(e) => { const s = e.currentTarget.querySelector("svg") as SVGElement; if (s) s.style.opacity = "0.55"; }}
          >
            <svg width="20" height="20" viewBox="0 0 361 361" style={{ filter: "grayscale(1)", opacity: 0.55, transition: "opacity 0.22s ease" }}>
              <defs>
                <linearGradient id="amGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FA6479"/>
                  <stop offset="100%" stopColor="#FB3F58"/>
                </linearGradient>
              </defs>
              <rect width="361" height="361" rx="80" fill="url(#amGrad)"/>
              <path
                fill="#ffffff"
                d="M254.5 80.6c-3.2-2.4-7-4-11.1-4.6-1-.2-2.1-.3-3.5-.3H121.1c-1.4 0-2.5.1-3.5.3-7.8 1.1-14.2 5.6-17.6 12.4-1.5 3-2.3 6.3-2.5 10.1-.1 1-.1 2-.1 3v149c0 1 0 2 .1 3 .2 3.8 1 7.1 2.5 10.1 3.4 6.8 9.8 11.3 17.6 12.4 1 .2 2.1.3 3.5.3h118.8c1.4 0 2.5-.1 3.5-.3 4.1-.6 7.9-2.2 11.1-4.6 4.7-3.6 7.9-9 8.7-15.1.1-1 .2-2.1.2-3.4V99.1c0-1.3-.1-2.4-.2-3.4-.8-6.1-4-11.5-8.7-15.1zM213 167.8v37.7c0 4.5-1.1 8-3.4 10.6-2.3 2.6-5.5 4.1-9.5 4.7l-7.4 1.1c-3.8.6-7-.1-9.5-2.1-2.5-2-3.8-4.9-3.8-8.7 0-3.3 1-6 3-8.1 2-2.1 4.7-3.5 8.1-4.1l9.2-1.7c1.6-.3 2.7-.8 3.3-1.5.6-.7 1-1.7 1-3.1v-22.9l-29.7 5.9v45.8c0 4.5-1.1 8-3.4 10.6-2.3 2.6-5.5 4.1-9.5 4.7l-7.4 1.1c-3.8.6-7-.1-9.5-2.1-2.5-2-3.8-4.9-3.8-8.7 0-3.3 1-6 3-8.1 2-2.1 4.7-3.5 8.1-4.1l9.2-1.7c1.6-.3 2.7-.8 3.3-1.5.6-.7 1-1.7 1-3.1v-57.2c0-3 .7-5.4 2-7.1 1.4-1.7 3.5-2.9 6.2-3.5l38.7-7.7c2.3-.5 4.2-.4 5.6.3 1.4.7 2.4 1.9 2.9 3.5.3.9.4 2 .4 3.3v23.4z"
              />
            </svg>
          </a>

          <a
            href="https://music.youtube.com/watch?v=oePF5WQzSnA&si=jCtjlDWhrkNSMYQP"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            style={{ color: "#c8c4bf", transition: "color 0.22s ease", display: "flex" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#1a1a1a")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#c8c4bf")}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.546 15.568V8.432L15.818 12l-6.272 3.568z"/>
            </svg>
          </a>
        </div>

        {/* Padding for fixed player */}
        <div style={{ height: "6rem" }} />
      </SubpageLayout>
    </>
  );
}
