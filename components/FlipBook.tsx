"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ════════════════════════════════════════════════════════════
   PALETTE — magazine d'art contemporain
   Références : Purple, Aperture, The Gentlewoman
════════════════════════════════════════════════════════════ */
const PAPER   = "#f0ebe0";          // papier crème léger — offset 120g
const INK     = "#1c1917";          // encre chaude
const COVER   = "#1a1815";          // couverture nuit

// Grain papier — très subtil, imperceptible à distance
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='0.028'/%3E%3C/svg%3E")`;

/* ════════════════════════════════════════════════════════════
   TYPES
════════════════════════════════════════════════════════════ */
type PageContent =
  | { type: "empty" }
  | { type: "cover-back" }
  | { type: "cover-front" }
  | { type: "word";       text: string }
  | { type: "quote";      text: string }
  | { type: "poem";       text: string }
  | { type: "image";      src: string; alt: string }
  | { type: "painting";   src: string; alt: string }
  | { type: "polaroid";   src: string; alt: string }
  | { type: "manuscript"; src: string; alt: string };

interface Spread { left: PageContent; right: PageContent }

/* ════════════════════════════════════════════════════════════
   SÉQUENCE ÉDITORIALE — 20 doubles pages
════════════════════════════════════════════════════════════ */
const SPREADS: Spread[] = [
  { left: { type: "cover-back" }, right: { type: "cover-front" } },

  {
    left:  { type: "empty" },
    right: { type: "quote", text: "Elle était ici sans être là —\npour signer dans mes yeux\nson premier battement." },
  },
  {
    left:  { type: "image", src: "/films/hante-moi/hante-moi-03.jpg",  alt: "Hante Moi" },
    right: { type: "image", src: "/films/hante-moi/hante-moi-01.jpg",  alt: "Hante Moi" },
  },
  {
    left:  { type: "empty" },
    right: { type: "painting", src: "/paintings/la-femme.png", alt: "La Femme" },
  },
  {
    left:  { type: "painting", src: "/paintings/prolixe.png", alt: "Prolixe" },
    right: { type: "quote", text: "Le pinceau glissait\nd'une simplicité alarmante." },
  },
  {
    left:  { type: "quote", text: "À chaque immersion,\nje la vois." },
    right: { type: "image", src: "/films/miroir-de-l-ame/miroir-de-l-ame-01.jpg", alt: "Miroir de l'Âme" },
  },
  {
    left:  { type: "painting", src: "/paintings/self-portrait.png", alt: "Self Portrait" },
    right: { type: "empty" },
  },
  {
    left:  { type: "image", src: "/films/amour-diistant/amour-diistant-04.jpg", alt: "Amour Diistant" },
    right: { type: "image", src: "/films/amour-diistant/amour-diistant-07.jpg", alt: "Amour Diistant" },
  },
  {
    left:  { type: "polaroid", src: "/polaroids/polaroid-04.jpg", alt: "Polaroid" },
    right: { type: "quote", text: "Je lui ai donné mes yeux\nen guise de réconciliation,\nd'acceptation." },
  },
  {
    left:  { type: "manuscript", src: "/writings/poeme-01.jpg", alt: "Poème manuscrit" },
    right: { type: "empty" },
  },
  {
    left:  { type: "painting", src: "/paintings/stoique.png",         alt: "Stoïque"  },
    right: { type: "image",   src: "/films/untilted/untilted-15.jpg", alt: "Untilted" },
  },
  {
    left:  { type: "empty" },
    right: { type: "quote", text: "Il m'arrive souvent de croire\nque je rêve dans la réalité\net que je vis réellement dans mes rêves.\nJe différencie les deux\npar ma façon de respirer." },
  },
  {
    left:  { type: "quote", text: "Je préfère être le fou\nplutôt qu'être celui\nqui s'ignore." },
    right: { type: "polaroid", src: "/polaroids/polaroid-01.jpg", alt: "Polaroid" },
  },
  {
    left:  { type: "image",   src: "/films/voyage-d-une-larme/voyage-d-une-larme-08.jpg", alt: "Voyage d'une larme" },
    right: { type: "painting", src: "/paintings/toi-et-moi.png", alt: "Toi et Moi" },
  },
  {
    left:  { type: "quote", text: "À mes risques et périls\nsi un jour je confonds mes rêves et la réalité.\nMais lorsque je tends la main dans le vide,\nune chaleur toujours me répond." },
    right: { type: "empty" },
  },
  {
    left:  { type: "painting", src: "/paintings/la-dance.png",          alt: "La Dance"  },
    right: { type: "image",   src: "/films/au-paradis/au-paradis-05.jpg", alt: "Au Paradis" },
  },
  {
    left:  { type: "polaroid", src: "/polaroids/polaroid-06.jpg", alt: "Polaroid" },
    right: { type: "quote", text: "Son absence n'est pas un vide :\nc'est une tension,\nune direction invisible\nqui continue de m'orienter." },
  },
  {
    left:  { type: "empty" },
    right: { type: "quote", text: "Ma vérité n'était pas terrestre.\nElle n'était pas sociale.\nElle n'était pas négociable." },
  },
  {
    left:  { type: "quote", text: "La tourterelle ne m'a rien promis.\nElle s'est simplement posée." },
    right: { type: "empty" },
  },
  {
    left:  { type: "empty" },
    right: { type: "quote", text: "Un silence habité.\nUn dernier battement\noù le temps s'estompe\nnon parce que tout finit,\nmais parce que tout commence ailleurs." },
  },
];

const TOTAL         = SPREADS.length;
const FLIP_DELAY    = 8000;   // 8 s
const FLIP_DURATION = 1.7;    // s — fluide, pas mécanique

/* ════════════════════════════════════════════════════════════
   CONTENU DE PAGE
════════════════════════════════════════════════════════════ */
function Inner({ content }: { content: PageContent }) {
  switch (content.type) {

    case "empty":
      return null;

    case "cover-back":
      return (
        <div style={{
          position:        "absolute",
          inset:           0,
          backgroundColor: COVER,
          backgroundImage: GRAIN,
          backgroundRepeat:"repeat",
        }} />
      );

    case "cover-front":
      return (
        <div style={{
          position:        "absolute",
          inset:           0,
          backgroundColor: COVER,
          backgroundImage: GRAIN,
          backgroundRepeat:"repeat",
          display:         "flex",
          flexDirection:   "column",
          alignItems:      "center",
          justifyContent:  "center",
        }}>
          <p style={{
            fontFamily:    "var(--font-cormorant), serif",
            fontStyle:     "italic",
            fontWeight:    300,
            fontSize:      "clamp(0.68rem, 1.6vw, 0.92rem)",
            letterSpacing: "0.07em",
            color:         "#b8b2a8",
            textAlign:     "center",
            whiteSpace:    "nowrap",
          }}>
            Noah Charlemagne Scheidler
          </p>
          <div style={{
            width:      30,
            height:     0.5,
            background: "#b8b2a8",
            margin:     "0.55rem auto",
            opacity:    0.35,
          }} />
          <p style={{
            fontFamily:    "var(--font-space), sans-serif",
            fontWeight:    300,
            fontSize:      "clamp(0.22rem, 0.55vw, 0.31rem)",
            letterSpacing: "0.44em",
            textTransform: "uppercase",
            color:         "#5c5852",
          }}>
            Œuvres
          </p>
        </div>
      );

    case "word":
      return (
        <span style={{
          fontFamily:    "var(--font-cormorant), serif",
          fontStyle:     "italic",
          fontWeight:    300,
          fontSize:      "clamp(1rem, 2.6vw, 1.35rem)",
          letterSpacing: "0.07em",
          color:         INK,
        }}>
          {content.text}
        </span>
      );

    case "quote":
      return (
        <div style={{
          padding:    "14% 18%",
          display:    "flex",
          alignItems: "center",
          height:     "100%",
          boxSizing:  "border-box",
          textAlign:  "center",
        }}>
          <p style={{
            fontFamily:    "var(--font-cormorant), serif",
            fontStyle:     "italic",
            fontWeight:    300,
            fontSize:      "clamp(0.6rem, 1.38vw, 0.78rem)",
            lineHeight:    1.95,
            letterSpacing: "0.015em",
            color:         INK,
            whiteSpace:    "pre-line",
          }}>
            {content.text}
          </p>
        </div>
      );

    case "poem":
      return (
        <div style={{
          padding:    "20% 16% 10%",
          height:     "100%",
          boxSizing:  "border-box",
          display:    "flex",
          alignItems: "flex-start",
        }}>
          <p style={{
            fontFamily:    "var(--font-cormorant), serif",
            fontWeight:    300,
            fontSize:      "clamp(0.48rem, 1.1vw, 0.62rem)",
            lineHeight:    2.05,
            color:         INK,
            whiteSpace:    "pre-line",
          }}>
            {content.text}
          </p>
        </div>
      );

    /* Photographie — imprimée pleine page */
    case "image":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={content.src}
          alt={content.alt}
          draggable={false}
          style={{
            position:   "absolute",
            inset:      0,
            width:      "100%",
            height:     "100%",
            objectFit:  "contain",
            display:    "block",
            userSelect: "none",
          }}
        />
      );

    /* Peinture — suspendue dans l'espace */
    case "painting":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={content.src}
          alt={content.alt}
          draggable={false}
          style={{
            maxWidth:   "66%",
            maxHeight:  "76%",
            objectFit:  "contain",
            display:    "block",
            userSelect: "none",
          }}
        />
      );

    /* Polaroid — posé sur le papier crème */
    case "polaroid":
      return (
        <div style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          width:          "100%",
          height:         "100%",
        }}>
          <div style={{
            background: "#faf8f4",
            padding:    "7px 7px 26px",
            boxShadow:  "0 2px 8px rgba(0,0,0,0.09), 0 8px 22px rgba(0,0,0,0.07)",
            transform:  "rotate(-1.5deg)",
            maxWidth:   "72%",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.src}
              alt={content.alt}
              draggable={false}
              style={{
                display:    "block",
                width:      "100%",
                objectFit:  "contain",
                userSelect: "none",
              }}
            />
          </div>
        </div>
      );

    /* Manuscrit — scan de poème */
    case "manuscript":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={content.src}
          alt={content.alt}
          draggable={false}
          style={{
            maxWidth:   "84%",
            maxHeight:  "84%",
            objectFit:  "contain",
            display:    "block",
            userSelect: "none",
          }}
        />
      );

    default:
      return null;
  }
}

/* ════════════════════════════════════════════════════════════
   PAGE FACE — surface d'une page
════════════════════════════════════════════════════════════ */
function PageFace({
  content,
  side,
  shade,
}: {
  content: PageContent;
  side:    "left" | "right";
  shade?:  boolean;
}) {
  const isCover = content.type === "cover-back" || content.type === "cover-front";

  /* Ombre de reliure intérieure — légère */
  const spineInset = side === "left"
    ? "inset -10px 0 18px -7px rgba(0,0,0,0.13)"
    : "inset  10px 0 18px -7px rgba(0,0,0,0.10)";

  return (
    <div style={{
      position:        "absolute",
      inset:           0,
      backgroundColor: isCover ? COVER : PAPER,
      backgroundImage: isCover ? undefined : GRAIN,
      backgroundRepeat:"repeat",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      overflow:        "hidden",
      boxShadow:       spineInset,
    }}>
      <Inner content={content} />

      {/* Ombre de retournement */}
      {shade && (
        <div style={{
          position:      "absolute",
          inset:         0,
          background:    side === "right"
            ? "linear-gradient(to right, rgba(0,0,0,0.26) 0%, rgba(0,0,0,0.07) 38%, transparent 70%)"
            : "linear-gradient(to left,  rgba(0,0,0,0.26) 0%, rgba(0,0,0,0.07) 38%, transparent 70%)",
          zIndex:        5,
          pointerEvents: "none",
        }} />
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   FLIPBOOK
════════════════════════════════════════════════════════════ */
export default function FlipBook() {
  const [spreadIdx, setSpreadIdx] = useState(0);
  const [turning,   setTurning]   = useState(false);
  const [instant,   setInstant]   = useState(false);

  const [bookW, setBookW] = useState(720);
  const [bookH, setBookH] = useState(496);

  useEffect(() => {
    const calc = () => {
      if (window.innerWidth < 480) {
        setBookW(298); setBookH(206);
      } else if (window.innerWidth < 860) {
        setBookW(480); setBookH(332);
      } else {
        setBookW(720); setBookH(496);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const cur   = SPREADS[spreadIdx];
  const nxt   = SPREADS[(spreadIdx + 1) % TOTAL];
  const pageW = bookW / 2;

  useEffect(() => {
    if (turning) return;
    const t = setTimeout(() => setTurning(true), FLIP_DELAY);
    return () => clearTimeout(t);
  }, [turning, spreadIdx]);

  const onFlipDone = () => {
    setSpreadIdx(s => (s + 1) % TOTAL);
    setInstant(true);
    setTurning(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)));
  };

  /* ── Magazine fin : 5 couches fore-edge, 3 spine, 5 tête ── */
  const FORE  = 5;
  const SPINE = 3;
  const HEAD  = 5;

  return (
    <div style={{
      display:        "flex",
      justifyContent: "center",
      alignItems:     "center",
      padding:        "4.5rem 1rem 6rem",
      position:       "relative",
    }}>

      {/* Ombre portée — propre, studio */}
      <div style={{
        position:      "absolute",
        bottom:        "3.2rem",
        left:          "50%",
        transform:     "translateX(-50%)",
        width:         bookW * 1.35,
        height:        80,
        background:    "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 55%, transparent 75%)",
        filter:        "blur(10px)",
        pointerEvents: "none",
      }} />

      {/* Scène */}
      <div style={{ perspective: "1800px", perspectiveOrigin: "50% 30%", position: "relative" }}>

        {/* ══ LIVRE ══ */}
        <div style={{
          position:       "relative",
          width:          bookW,
          height:         bookH,
          transform:      "rotateX(8deg) rotateY(-3deg)",
          transformStyle: "preserve-3d",
          boxShadow: [
            "0 2px 5px rgba(0,0,0,0.07)",
            "0 8px 20px rgba(0,0,0,0.10)",
            "0 24px 56px rgba(0,0,0,0.14)",
          ].join(", "),
        }}>

          {/* TRANCHE DROITE — magazine fin */}
          {Array.from({ length: FORE }).map((_, i) => (
            <div key={`f${i}`} style={{
              position:     "absolute",
              right:        -(i * 2 + 2),
              top:          i * 0.5,
              width:        "2px",
              height:       `calc(100% - ${i}px)`,
              background:   i % 2 === 0 ? "hsl(38, 14%, 76%)" : "hsl(38, 10%, 81%)",
              borderRadius: "0 1px 1px 0",
              zIndex:       -i - 1,
            }} />
          ))}

          {/* DOS GAUCHE — reliure discrète */}
          {Array.from({ length: SPINE }).map((_, i) => (
            <div key={`s${i}`} style={{
              position:     "absolute",
              left:         -(i * 2 + 1),
              top:          i * 0.4,
              width:        "2px",
              height:       `calc(100% - ${i * 0.6}px)`,
              background:   `hsl(28, 8%, ${48 - i * 3}%)`,
              borderRadius: "1px 0 0 1px",
              zIndex:       -i - 1,
            }} />
          ))}

          {/* TRANCHE HAUTE */}
          {Array.from({ length: HEAD }).map((_, i) => (
            <div key={`h${i}`} style={{
              position:   "absolute",
              top:        -(i * 1.4 + 1),
              left:       i * 0.4,
              width:      `calc(100% - ${i * 0.6}px)`,
              height:     "1.4px",
              background: i % 2 === 0 ? "hsl(38, 12%, 74%)" : "hsl(38, 8%, 80%)",
              zIndex:     -i - 1,
            }} />
          ))}

          {/* PAGE GAUCHE */}
          <div style={{
            position:     "absolute",
            left: 0, top: 0,
            width:        pageW,
            height:       "100%",
            overflow:     "hidden",
            borderRadius: "2px 0 0 2px",
          }}>
            <PageFace content={cur.left} side="left" />
          </div>

          {/* PAGE DROITE — statique */}
          <div style={{
            position:     "absolute",
            right: 0, top: 0,
            width:        pageW,
            height:       "100%",
            overflow:     "hidden",
            borderRadius: "0 3px 3px 0",
          }}>
            <PageFace
              content={turning ? nxt.right : cur.right}
              side="right"
            />
          </div>

          {/* PAGE TOURNANTE — portée par le vent */}
          <motion.div
            style={{
              position:        "absolute",
              right: 0, top:   0,
              width:           pageW,
              height:          "100%",
              transformOrigin: "left center",
              transformStyle:  "preserve-3d",
              zIndex:          turning ? 20 : 1,
            }}
            animate={turning ? {
              rotateY: [0,   -10,  -90, -170, -180],
              rotateX: [0,    1.8,  3.5,  0.8,    0],
              scaleX:  [1,    1.0, 0.93,  1.0,    1],
            } : {
              rotateY: 0,
              rotateX: 0,
              scaleX:  1,
            }}
            transition={
              instant
                ? { duration: 0 }
                : turning
                  ? {
                      duration: FLIP_DURATION,
                      times:    [0, 0.14, 0.52, 0.88, 1],
                      ease:     "easeInOut",
                    }
                  : { duration: 0 }
            }
            onAnimationComplete={() => { if (turning) onFlipDone(); }}
          >
            {/* Face avant */}
            <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", overflow: "hidden" }}>
              <PageFace content={cur.right} side="right" shade={turning} />
            </div>

            {/* Face arrière */}
            <div style={{
              position:           "absolute",
              inset:              0,
              backfaceVisibility: "hidden",
              transform:          "rotateY(180deg)",
              overflow:           "hidden",
            }}>
              <PageFace content={nxt.left} side="left" shade={turning} />
            </div>
          </motion.div>

          {/* RELIURE — gouttière centrale */}
          <div style={{
            position:      "absolute",
            left:          pageW - 2,
            top:           0,
            width:         5,
            height:        "100%",
            background:    "linear-gradient(to right, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.06) 30%, rgba(255,255,255,0.03) 50%, rgba(0,0,0,0.06) 70%, rgba(0,0,0,0.28) 100%)",
            zIndex:        30,
            pointerEvents: "none",
          }} />
        </div>
      </div>
    </div>
  );
}
