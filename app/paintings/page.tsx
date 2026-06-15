"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SubpageLayout from "@/components/SubpageLayout";
import { useLang } from "@/contexts/LangContext";

const DRAWINGS = [
  { file: "IMG_2737.jpg" },  // P1
  { file: "IMG_2802.jpg" },  // P2
  { file: "IMG_8240.JPG" },  // P3
  { file: "IMG_2786.JPG" },  // P4
  { file: "IMG_2792.jpg" },  // P5
  { file: "IMG_8253.jpg" },  // P6
  { file: "IMG_2219.JPG" },  // P7
  { file: "IMG_2784.jpg" },  // P8
  { file: "IMG_2789.jpg" },  // P9
  { file: "IMG_2791.jpg" },  // P10
  { file: "IMG_8227.jpg" },  // P11
  { file: "IMG_8286.jpg" },  // P12
  { file: "IMG_8234.jpg" },  // P13
  { file: "IMG_2812.jpg" },  // P14
  { file: "IMG_2201.jpg" },  // P15
  { file: "IMG_8232.jpg" },  // P16
  { file: "IMG_2810.jpg" },  // P17
  { file: "IMG_8231.jpg" },  // P18
  { file: "IMG_8239.jpg" },  // P19
  { file: "IMG_2807.JPG" },  // P20
  { file: "IMG_2803.jpg" },  // P21
  { file: "IMG_2795.jpg" },  // P22
  { file: "IMG_8248.jpg" },  // P23
  { file: "IMG_2816.JPG" },  // P24
  { file: "IMG_8243.JPG" },  // P25
  { file: "IMG_2808.jpg" },  // P26
  { file: "IMG_2788.jpg" },  // P27
  { file: "IMG_8246.jpg" },  // P28
  { file: "IMG_8233.JPG" },  // P29
  { file: "IMG_8250.jpg" },  // P30
  { file: "IMG_8247.jpg" },  // P31
  { file: "IMG_8230.jpg" },  // P32
  { file: "IMG_8279.jpg" },  // P33
];

const PAINTINGS = [
  { title: "LA DANSE",                              file: "la-dance.jpg",      ratio: "1097/1434", year: "2026" },
  { title: "TOI ET MOI",                            file: "toi-et-moi.jpg",    ratio: "1446/1088", year: "2023" },
  { title: "DOUX REGARD",                           file: "doux-regard.jpg",   ratio: "1424/1104", year: "2023" },
  { title: "PILOTE",                                file: "pilote.jpg",        ratio: "2272/1728", year: "2023" },
  { title: "LA FEMME",                              file: "la-femme.jpg",      ratio: "1096/1435", year: "2025" },
  { title: "PROLIXE",                               file: "prolixe.jpg",       ratio: "1097/1434", year: "2024" },
  { title: "LE BUCHER",                             file: "le-bucher.jpg",     ratio: "2354/2089", year: "2023" },
  { title: "SELF PORTRAIT WHEN I WAS 19 AND BOLD", file: "self-portrait.jpg", ratio: "1461/1077", year: "2023" },
  { title: "STOIQUE",                               file: "stoique.jpg",       ratio: "1402/1122", year: "2023" },
  { title: "L'ARTISTE",                             file: "l-artiste.jpg",     ratio: "1/1",       year: "2023" },
];

const LS_KEY          = "ncs-drawings-order";
const LS_PAINTINGS_KEY = "ncs-paintings-order";

export default function PaintingsPage() {
  const { t, lang } = useLang();
  const [hovered, setHovered] = useState<string | null>(null);
  const [focusEnabled, setFocusEnabled] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [drawings, setDrawings]   = useState(DRAWINGS);
  const [paintings, setPaintings] = useState(PAINTINGS);
  const dragIndex = useRef<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "1") setIsAdmin(true);

    const savedD = localStorage.getItem(LS_KEY);
    if (savedD) {
      try {
        const order: string[] = JSON.parse(savedD);
        const reordered = order
          .map(f => DRAWINGS.find(d => d.file === f))
          .filter(Boolean) as typeof DRAWINGS;
        if (reordered.length === DRAWINGS.length) setDrawings(reordered);
      } catch {}
    }

    const savedP = localStorage.getItem(LS_PAINTINGS_KEY);
    if (savedP) {
      try {
        const order: string[] = JSON.parse(savedP);
        const reordered = order
          .map(f => PAINTINGS.find(p => p.file === f))
          .filter(Boolean) as typeof PAINTINGS;
        if (reordered.length === PAINTINGS.length) setPaintings(reordered);
      } catch {}
    }
  }, []);

  const onDragStart = (i: number) => { dragIndex.current = i; };
  const onDragOver  = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    if (dragIndex.current === null || dragIndex.current === i) return;
    setDrawings(prev => {
      const next = [...prev];
      const [item] = next.splice(dragIndex.current!, 1);
      next.splice(i, 0, item);
      dragIndex.current = i;
      localStorage.setItem(LS_KEY, JSON.stringify(next.map(d => d.file)));
      return next;
    });
  };
  const onDragEnd = () => { dragIndex.current = null; };

  const toggle = (
    <div className="focus-toggle" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
      <span style={{
        fontFamily: "var(--font-space), sans-serif",
        fontSize: "0.43rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#aaa",
      }}>
        Focus
      </span>

      <button
        onClick={() => setFocusEnabled((v) => !v)}
        style={{
          position: "relative",
          width: "2.6rem",
          height: "1.2rem",
          borderRadius: "999px",
          border: "1.5px solid #1a1a1a",
          background: "linear-gradient(180deg, #ffffff 0%, #ececec 100%)",
          boxShadow: "inset 0 1px 3px rgba(255,255,255,0.95), inset 0 -1px 2px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.1)",
          cursor: "pointer",
          padding: 0,
        }}
        aria-label={focusEnabled ? "Désactiver le focus" : "Activer le focus"}
      >
        <span style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: focusEnabled ? "calc(100% - 0.82rem - 0.18rem)" : "0.18rem",
          width: "0.82rem",
          height: "0.82rem",
          borderRadius: "50%",
          background: focusEnabled
            ? "linear-gradient(180deg, #ff4444 0%, #cc0000 100%)"
            : "linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)",
          border: "none",
          boxShadow: focusEnabled
            ? "inset 0 1px 1px rgba(255,255,255,0.25), 0 1px 4px rgba(180,0,0,0.4)"
            : "inset 0 1px 1px rgba(255,255,255,0.1), 0 1px 4px rgba(0,0,0,0.35)",
          transition: "left 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",
        }} />
      </button>

      <span style={{
        fontFamily: "var(--font-space), sans-serif",
        fontSize: "0.43rem",
        letterSpacing: "0.15em",
        color: focusEnabled ? "#1a1a1a" : "#ccc",
        transition: "color 0.25s ease",
        minWidth: "1.2rem",
      }}>
        {focusEnabled ? "ON" : "OFF"}
      </span>
    </div>
  );

  return (
    <SubpageLayout title={t("page.paintings.title")} action={toggle}>
      <div>
        {(paintings.length ? paintings : PAINTINGS).map((p) => (
          <div
            key={p.title}
            className="painting-item"
            onMouseEnter={() => focusEnabled && setHovered(p.title)}
            onMouseLeave={() => focusEnabled && setHovered(null)}
            style={{
              marginBottom: "6rem",
              opacity: focusEnabled && hovered && hovered !== p.title ? 0.4 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            <div style={{
              width: "100%",
              maxWidth: "576px",
              margin: "0 auto",
              position: "relative",
              aspectRatio: p.ratio,
              overflow: "hidden",
            }}>
              <Image
                src={`/paintings/${p.file}`}
                alt={p.title}
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
            <p style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.12em",
              color: "#999",
              textAlign: "center",
              marginTop: "1rem",
            }}>
              {p.title}
            </p>
            <p style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "0.42rem",
              letterSpacing: "0.16em",
              color: "#c8c4bf",
              textAlign: "center",
              marginTop: "0.3rem",
            }}>
              {p.year}
            </p>
          </div>
        ))}
      </div>

      {/* ── DESSINS ── */}
      <div style={{
        marginTop: "10rem",
        marginLeft: "calc(-1 * clamp(1.5rem, 10%, 7rem))",
        marginRight: "calc(-1 * clamp(1.5rem, 10%, 7rem))",
        paddingLeft: "clamp(1.5rem, 10%, 7rem)",
        paddingRight: "clamp(1.5rem, 10%, 7rem)",
        paddingBottom: "2.2rem",
        borderBottom: "1px solid #e8e5e1",
      }}>
        <h2 style={{
          fontFamily:    "var(--font-cormorant), serif",
          fontStyle:     "italic",
          fontWeight:    300,
          fontSize:      "clamp(1.46rem, 3.64vw, 2.82rem)",
          letterSpacing: "-0.025em",
          color:         "#1a1a1a",
          lineHeight:    0.92,
        }}>
          {lang === "FR" ? "Dessins" : "Drawings"}
        </h2>
      </div>

      {/* ── LES INCONNUS ── */}
      <div style={{ marginTop: "5rem" }}>
        <div style={{
          paddingBottom: "2.2rem",
          marginBottom: "4rem",
        }}>
          <h2 style={{
            fontFamily:    "var(--font-cormorant), serif",
            fontStyle:     "italic",
            fontWeight:    300,
            fontSize:      "clamp(1.24rem, 3.09vw, 2.40rem)",
            letterSpacing: "-0.025em",
            color:         "#1a1a1a",
            lineHeight:    0.92,
            marginBottom:  "0.75rem",
          }}>
            Les Inconnus
          </h2>
          <p style={{
            fontFamily:    "var(--font-space), sans-serif",
            fontSize:      "0.54rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "#b0aca7",
          }}>
            {lang === "FR" ? "Carnet de dessins, 2023–2026" : "Drawing journal, 2023–2026"}
          </p>
        </div>

        {drawings.map((d, i) => (
          <div
            key={d.file}
            draggable={isAdmin}
            onDragStart={() => onDragStart(i)}
            onDragOver={e => onDragOver(e, i)}
            onDragEnd={onDragEnd}
            style={{
              marginBottom: "10rem",
              cursor: isAdmin ? "grab" : "default",
              outline: isAdmin ? "1px dashed #ccc" : "none",
              position: "relative",
            }}
          >
            {isAdmin && (
              <p style={{
                position: "absolute", top: "-1.5rem", left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--font-space), sans-serif",
                fontSize: "0.4rem", letterSpacing: "0.1em",
                color: "#bbb", userSelect: "none",
              }}>
                {i + 1} — {d.file}
              </p>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/drawings/les-inconnus/${d.file}`}
              alt=""
              style={{
                display:     "block",
                width:       "73%",
                maxWidth:    "523px",
                height:      "auto",
                marginLeft:  "auto",
                marginRight: "auto",
                pointerEvents: isAdmin ? "none" : "auto",
              }}
            />
          </div>
        ))}
      </div>
    </SubpageLayout>
  );
}
