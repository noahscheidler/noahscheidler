"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/* ════════════════════════════════════════════════════════════
   ŒUVRES DU MUR
   frame: "photo"    → mat blanc style tirage d'exposition
          "painting" → châssis bois apparent, simple
          "polaroid" → bande blanche + bas épais
          "document" → mat crème, document encadré
════════════════════════════════════════════════════════════ */
type Frame = "photo" | "painting" | "polaroid" | "document";

interface Work {
  src:   string;
  label: string;
  href:  string;
  frame: Frame;
}

const WORKS: Work[] = [
  { src: "/films/hante-moi/hante-moi-01.jpg",                    label: "Films",     href: "/films",     frame: "photo"    },
  { src: "/paintings/la-femme.png",                               label: "Peintures", href: "/paintings", frame: "painting" },
  { src: "/films/miroir-de-l-ame/miroir-de-l-ame-04.jpg",        label: "Films",     href: "/films",     frame: "photo"    },
  { src: "/polaroids/polaroid-04.jpg",                            label: "Polaroids", href: "/polaroids", frame: "polaroid" },
  { src: "/paintings/prolixe.png",                                label: "Peintures", href: "/paintings", frame: "painting" },
  { src: "/films/amour-diistant/amour-diistant-04.jpg",           label: "Films",     href: "/films",     frame: "photo"    },
  { src: "/paintings/self-portrait.png",                          label: "Peintures", href: "/paintings", frame: "painting" },
  { src: "/writings/poeme-01.jpg",                                label: "Écrits",    href: "/writings",  frame: "document" },
  { src: "/films/voyage-d-une-larme/voyage-d-une-larme-05.jpg",  label: "Films",     href: "/films",     frame: "photo"    },
  { src: "/paintings/stoique.png",                                label: "Peintures", href: "/paintings", frame: "painting" },
  { src: "/polaroids/polaroid-01.jpg",                            label: "Polaroids", href: "/polaroids", frame: "polaroid" },
  { src: "/films/au-paradis/au-paradis-05.jpg",                   label: "Films",     href: "/films",     frame: "photo"    },
  { src: "/paintings/la-dance.png",                               label: "Peintures", href: "/paintings", frame: "painting" },
  { src: "/writings/poeme-02.jpg",                                label: "Écrits",    href: "/writings",  frame: "document" },
  { src: "/films/saint-esprit/saint-esprit-03.jpg",               label: "Films",     href: "/films",     frame: "photo"    },
  { src: "/paintings/toi-et-moi.png",                             label: "Peintures", href: "/paintings", frame: "painting" },
  { src: "/polaroids/polaroid-06.jpg",                            label: "Polaroids", href: "/polaroids", frame: "polaroid" },
  { src: "/films/hante-moi/hante-moi-03.jpg",                    label: "Films",     href: "/films",     frame: "photo"    },
  { src: "/paintings/doux-regard.png",                            label: "Peintures", href: "/paintings", frame: "painting" },
  { src: "/films/untilted/untilted-12.jpg",                       label: "Films",     href: "/films",     frame: "photo"    },
  { src: "/polaroids/polaroid-02.jpg",                            label: "Polaroids", href: "/polaroids", frame: "polaroid" },
  { src: "/paintings/l-artiste.png",                              label: "Peintures", href: "/paintings", frame: "painting" },
  { src: "/films/mariage-mort/mariage-mort-03.jpg",               label: "Films",     href: "/films",     frame: "photo"    },
  { src: "/writings/poeme-03.jpg",                                label: "Écrits",    href: "/writings",  frame: "document" },
  { src: "/films/amour-diistant/amour-diistant-07.jpg",           label: "Films",     href: "/films",     frame: "photo"    },
  { src: "/paintings/le-bucher.jpg",                              label: "Peintures", href: "/paintings", frame: "painting" },
  { src: "/films/chez-emma/chez-emma-02.jpg",                     label: "Films",     href: "/films",     frame: "photo"    },
  { src: "/polaroids/polaroid-07.jpg",                            label: "Polaroids", href: "/polaroids", frame: "polaroid" },
  { src: "/films/saint-esprit/saint-esprit-08.jpg",               label: "Films",     href: "/films",     frame: "photo"    },
  { src: "/paintings/self-portrait.png",                          label: "Peintures", href: "/paintings", frame: "painting" },
];

/* ════════════════════════════════════════════════════════════
   ROTATIONS — accrochage naturel (déterministe par index)
════════════════════════════════════════════════════════════ */
const ROTS = [-1.3, 0.6, -0.2, 1.4, -0.7, 0.3, -1.6, 0.8, -0.4, 1.1, -0.9, 0.5];
const rot  = (i: number) => ROTS[i % ROTS.length];

/* ════════════════════════════════════════════════════════════
   FRAME — rendu du cadre selon le type d'œuvre
════════════════════════════════════════════════════════════ */
function FramedWork({ work, hovered }: { work: Work; hovered: boolean }) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={work.src}
      alt={work.label}
      draggable={false}
      style={{
        display:    "block",
        width:      "100%",
        height:     "auto",
        userSelect: "none",
      }}
    />
  );

  if (work.frame === "photo") {
    /* Tirage photo — mat blanc, liseré bas légèrement plus épais */
    return (
      <div style={{
        background: "#faf9f7",
        padding:    "10px 10px 22px",
        boxShadow:  hovered
          ? "3px 10px 32px rgba(0,0,0,0.38), 1px 3px 8px rgba(0,0,0,0.22)"
          : "2px 7px 22px rgba(0,0,0,0.30), 1px 2px 6px rgba(0,0,0,0.18)",
        transition: "box-shadow 0.35s ease",
      }}>
        {img}
      </div>
    );
  }

  if (work.frame === "polaroid") {
    /* Polaroid — bande blanche + grand bas blanc */
    return (
      <div style={{
        background: "#fefefe",
        padding:    "8px 8px 32px",
        boxShadow:  hovered
          ? "3px 10px 32px rgba(0,0,0,0.38), 1px 3px 8px rgba(0,0,0,0.22)"
          : "2px 7px 22px rgba(0,0,0,0.30), 1px 2px 6px rgba(0,0,0,0.18)",
        transition: "box-shadow 0.35s ease",
      }}>
        {img}
      </div>
    );
  }

  if (work.frame === "painting") {
    /* Peinture — châssis bois : double liseré sombre simulant le biseau */
    return (
      <div style={{
        outline:      "1px solid rgba(0,0,0,0.30)",
        outlineOffset:"-1px",
        boxShadow:    hovered
          ? "3px 10px 32px rgba(0,0,0,0.40), 0 2px 6px rgba(0,0,0,0.22), inset 0 0 0 3px rgba(0,0,0,0.08)"
          : "2px 7px 22px rgba(0,0,0,0.32), 0 1px 4px rgba(0,0,0,0.18), inset 0 0 0 3px rgba(0,0,0,0.08)",
        transition:   "box-shadow 0.35s ease",
      }}>
        {img}
      </div>
    );
  }

  /* document — mat crème, sobre */
  return (
    <div style={{
      background: "#f5f0e8",
      padding:    "14px 14px 20px",
      outline:    "1px solid rgba(0,0,0,0.14)",
      boxShadow:  hovered
        ? "3px 10px 32px rgba(0,0,0,0.38), 1px 3px 8px rgba(0,0,0,0.22)"
        : "2px 7px 22px rgba(0,0,0,0.30), 1px 2px 6px rgba(0,0,0,0.18)",
      transition: "box-shadow 0.35s ease",
    }}>
      {img}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ANIMATIONS
════════════════════════════════════════════════════════════ */
const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const piece = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

/* ════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════ */
export default function WallPreview() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{
      minHeight:    "100vh",
      position:     "relative",
      overflow:     "hidden",
      fontFamily:   "var(--font-space), sans-serif",

      /* ── Mur plâtre — couleur + grain ── */
      backgroundColor: "#bfb9ad",
      backgroundImage: [
        /* Grain plâtre SVG */
        `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.58' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        /* Variation de luminosité horizontale — simulant l'éclairage d'une galerie */
        "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 18%, transparent 45%, transparent 70%, rgba(0,0,0,0.06) 100%)",
        /* Vignette côtés — profondeur de pièce */
        "radial-gradient(ellipse 110% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.14) 100%)",
      ].join(", "),
    }}>

      {/* ── Liseré de sol — bas de mur ── */}
      <div style={{
        position:   "absolute",
        bottom:     0,
        left:       0,
        right:      0,
        height:     "6px",
        background: "linear-gradient(to top, rgba(0,0,0,0.18), transparent)",
        zIndex:     10,
        pointerEvents: "none",
      }} />

      {/* ── Liseré de plafond — haut de mur ── */}
      <div style={{
        position:   "absolute",
        top:        0,
        left:       0,
        right:      0,
        height:     "48px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.12), transparent)",
        zIndex:     10,
        pointerEvents: "none",
      }} />

      {/* ── Nom — flottant, discret ── */}
      <div style={{
        position:      "fixed",
        top:           "1.4rem",
        left:          "50%",
        transform:     "translateX(-50%)",
        zIndex:        100,
        pointerEvents: "none",
        textAlign:     "center",
      }}>
        <p style={{
          fontWeight:    300,
          fontSize:      "0.42rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.55)",
        }}>
          Noah Charlemagne Scheidler
        </p>
      </div>

      {/* ════════════════════════════════════════════════════
          MUR — masonry columns
      ════════════════════════════════════════════════════ */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          columns:      "5 180px",
          columnGap:    "28px",
          padding:      "72px 40px 60px",
        }}
      >
        {WORKS.map((work, i) => (
          <motion.div
            key={i}
            variants={piece}
            style={{
              breakInside:   "avoid",
              marginBottom:  "28px",
              display:       "block",
              /* Rotation d'accrochage */
              transform:     `rotate(${rot(i)}deg)`,
              transformOrigin: "50% 20%",  // pivot en haut — comme si suspendu
            }}
          >
            <Link
              href={work.href}
              style={{ display: "block", position: "relative" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* L'œuvre encadrée */}
              <motion.div
                animate={{ scale: hovered === i ? 1.022 : 1 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ transformOrigin: "50% 50%" }}
              >
                <FramedWork work={work} hovered={hovered === i} />
              </motion.div>

              {/* Étiquette au survol — style cartel de galerie */}
              <motion.div
                animate={{ opacity: hovered === i ? 1 : 0, y: hovered === i ? 0 : 4 }}
                transition={{ duration: 0.25 }}
                style={{
                  position:       "absolute",
                  inset:          0,
                  display:        "flex",
                  flexDirection:  "column",
                  alignItems:     "center",
                  justifyContent: "center",
                  pointerEvents:  "none",
                  background:     "rgba(0,0,0,0.28)",
                }}
              >
                <p style={{
                  fontWeight:    300,
                  fontSize:      "clamp(0.36rem, 1vw, 0.5rem)",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color:         "rgba(255,255,255,0.92)",
                }}>
                  {work.label}
                </p>
                <div style={{
                  width:      "16px",
                  height:     "0.5px",
                  background: "rgba(255,255,255,0.5)",
                  marginTop:  "0.4rem",
                }} />
              </motion.div>

            </Link>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
