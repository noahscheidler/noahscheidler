"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import FilmStrip from "@/components/FilmStrip";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import { useLang } from "@/contexts/LangContext";
import { FILMS } from "@/data/films";

const QUOTES = [
  {
    fr: "« Elle n'avait pas de visage qu'il pouvait retenir, seulement une présence qui arrivait sans prévenir et repartait sans s'expliquer. »",
    en: "« She had no face he could hold onto, only a presence that arrived without warning and left without explanation. »",
    label: "La Femme Sans Visage · 2025",
  },
  {
    fr: "« Il m'arrive souvent de croire que je rêve dans la réalité et que je vis réellement dans mes rêves. Je différencie les deux par ma façon de respirer. »",
    en: "« I often find myself believing I am dreaming in reality and truly living in my dreams. I tell the two apart by the way I breathe. »",
    label: "La Femme Sans Visage · 2025",
  },
  {
    fr: "« Qui serait-tu si personne ne te regardait ? »",
    en: "« Who would you be if no one was watching? »",
    label: "L'Être Seul · 2026",
  },
  {
    fr: "« Une création prend vie lorsqu'elle est vue. L'interaction forme le premier battement et l'œil transmet la magie. »",
    en: "« A creation comes to life when it is seen. Interaction forms the first heartbeat and the eye carries the magic. »",
    label: "L'Être Seul · 2026",
  },
  {
    fr: "« Je ne l'aurais jamais trouvée si rien ne brûlait. C'est le temps qui m'y a emmené. »",
    en: "« I would never have found her if nothing was burning. It is time that led me there. »",
    label: "Traversées — L'épine · 2024",
  },
  {
    fr: "« J'inverse la main dans laquelle je la tiens. Et je signe en rouge sur cette page blanche le mot amour. »",
    en: "« I switch the hand in which I hold her. And I sign in red on this blank page the word love. »",
    label: "Traversées — L'épine · 2024",
  },
  {
    fr: "« Nous nous sommes simplement croisés. »",
    en: "« We simply crossed paths. »",
    label: "Traversées — L'étincelle · 2024",
  },
  {
    fr: "« Que j'aime cette idée d'être plongé dans ces pupilles qui me donnent des ailes, comme si chaque battement me libérait un peu plus de l'illusion du temps. »",
    en: "« How I love this idea of being plunged into those pupils that give me wings, as if each beat freed me a little more from the illusion of time. »",
    label: "Traversées — L'escalier de Penrose · 2024",
  },
  {
    fr: "« Ne m'être pas rendu compte du bonheur, qui m'est passé comme on raye un jour du calendrier, aussi facilement qu'un rayon de soleil transperce l'eau un mois de juillet. »",
    en: "« Not having noticed the happiness, which passed me by like crossing a day off a calendar, as easily as a ray of sun pierces the water in a month of July. »",
    label: "Traversées — Une nuit étoilée · 2024",
  },
  {
    fr: "« Les feuilles mortes au sol chuchotent les mots d'un été. »",
    en: "« The dead leaves on the ground whisper the words of a summer. »",
    label: "Traversées — Demain · 2024",
  },
  {
    fr: "« La poussière me donne cette grimace que je suis comme elle. »",
    en: "« The dust gives me this grimace that I am like it. »",
    label: "Traversées — Poussière · 2024",
  },
  {
    fr: "« La peur est inévitable mais jamais irréversible. »",
    en: "« Fear is inevitable but never irreversible. »",
    label: "Émotions — Hante moi · 2026",
  },
  {
    fr: "« Un esprit qui pleure est un ouragan qui traverse l'âme. »",
    en: "« A mind that weeps is a hurricane crossing the soul. »",
    label: "Émotions — Le Voyage d'une Larme · 2026",
  },
  {
    fr: "« Le rêve s'envole sans permission vers une autre dimension. »",
    en: "« The dream takes flight without permission toward another dimension. »",
    label: "Émotions — Miroir de l'Âme · 2026",
  },
  {
    fr: "« Le sang coule par amour. L'empreinte reste pour toujours. »",
    en: "« Blood flows for love. The imprint remains forever. »",
    label: "Émotions — Cupidon · 2026",
  },
  {
    fr: "« Une vie c'est l'histoire de vos pensées, alors écrivez-la. »",
    en: "« A life is the story of your thoughts, so write it. »",
    label: "Une Pensée · 2023",
  },
  {
    fr: "« Le chagrin de notre histoire est conducteur à la prospérité de notre art. »",
    en: "« The grief of our story is the conductor of our art. »",
    label: "Ma Prose · 2023",
  },
  {
    fr: "« Ainsi j'aime autant mon bonheur que mon malheur, étant donné que l'un offre l'autre. »",
    en: "« I love my happiness as much as my sorrow, for one gives rise to the other. »",
    label: "Note à Moi Même · 2023",
  },
];

function WritingsCarousel() {
  const { lang } = useLang();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => {
          let next;
          do { next = Math.floor(Math.random() * QUOTES.length); } while (next === i);
          return next;
        });
        setVisible(true);
      }, 600);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const q = QUOTES[index];

  return (
    <div style={{ maxWidth: "600px" }}>
      <Link href="/writings" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        <div style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}>
          <blockquote style={{
            fontFamily:    "var(--font-cormorant), serif",
            fontStyle:     "italic",
            fontWeight:    300,
            fontSize:      "clamp(1.01rem, 2.31vw, 1.67rem)",
            color:         "#1a1a1a",
            lineHeight:    1.48,
            letterSpacing: "-0.01em",
            marginBottom:  "2.2rem",
            minHeight:     "unset",
            cursor:        "pointer",
          }}>
            {lang === "FR" ? q.fr : q.en}
          </blockquote>

          <p style={{
            fontFamily:    "var(--font-space), sans-serif",
            fontSize:      "0.45rem",
            letterSpacing: "0.2em",
            color:         "#b0aca7",
            textTransform: "uppercase",
          }}>
            {q.label}
          </p>
        </div>
      </Link>
    </div>
  );
}

const POLAROID_PREVIEW = [
  "IMG_3699.jpg", "NOAH 23.jpg", "polaroid-03.jpg", "Scan 8.JPG",
  "POLA B 6.jpg", "IMG_7837.JPG", "NOAH 25.JPG", "polaroid-04.jpg",
  "Scan 14.JPG", "IMG_2235.JPG", "NOAH 49.jpg", "polaroid-06.jpg",
];

const PAINTING_FILES = [
  "doux-regard.jpg", "toi-et-moi.jpg", "pilote.jpg", "la-dance.jpg",
  "la-femme.jpg", "prolixe.jpg", "le-bucher.jpg", "self-portrait.jpg",
  "stoique.jpg", "l-artiste.jpg",
];

/* ── Shared animation ──────────────────────────────────── */
const FADE_UP = {
  initial:     { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, amount: 0.15 } as const,
  transition:  { duration: 1.05, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
};

const FADE_UP_DELAYED = {
  ...FADE_UP,
  transition: { duration: 1.05, delay: 0.28, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
};

/* ── Section title ────────────────────────────────────── */
function SectionTitle({ en, fr }: { en: string; fr: string }) {
  const { lang } = useLang();
  return (
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      className="section-title-text"
      style={{
        fontFamily:    "var(--font-cormorant), serif",
        fontStyle:     "italic",
        fontWeight:    300,
        fontSize:      "clamp(1.46rem, 3.64vw, 2.82rem)",
        color:         "#1a1a1a",
        letterSpacing: "-0.025em",
        lineHeight:    0.92,
        marginBottom:  "0",
      }}
    >
      {lang === "FR" ? fr : en}
    </motion.h2>
  );
}

/* ── "Voir tout" link ─────────────────────────────────── */
function ViewAll({ href, en, fr }: { href: string; en: string; fr: string }) {
  const { lang } = useLang();
  return (
    <Link
      href={href}
      style={{
        fontFamily:     "var(--font-space), sans-serif",
        fontSize:       "0.48rem",
        letterSpacing:  "0.24em",
        textTransform:  "uppercase",
        color:          "#9e9a95",
        textDecoration: "none",
        display:        "inline-block",
        marginTop:      "2rem",
        paddingBottom:  "2px",
        borderBottom:   "1px solid transparent",
        transition:     "color 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#1a1a1a";
        e.currentTarget.style.borderBottomColor = "#1a1a1a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#9e9a95";
        e.currentTarget.style.borderBottomColor = "transparent";
      }}
    >
      {lang === "FR" ? fr : en} →
    </Link>
  );
}

/* ── Image caption ────────────────────────────────────── */
function Caption({ title, year, info }: { title: string; year?: string; info?: string }) {
  return (
    <p style={{
      fontFamily:    "var(--font-space), sans-serif",
      fontSize:      "0.45rem",
      letterSpacing: "0.16em",
      color:         "#b0aca7",
      textTransform: "uppercase",
      marginTop:     "0.8rem",
      textAlign:     "right",
    }}>
      {title}{year ? ` — ${year}` : ""}{info ? ` · ${info}` : ""}
    </p>
  );
}

/* ── Page padding (shared) ────────────────────────────── */
const PAD = "clamp(1.5rem, 10%, 7rem)";

/* ── Section padding (réduit, sans hero) ─────────────── */
const SEC = "10vh";
const SEC_B = "12vh";

/* ══════════════════════════════════════════════════════ */
export default function Home() {
  const { lang } = useLang();

  return (
    <div style={{ backgroundColor: "#f8f7f5", minHeight: "100vh" }}>
      <SiteHeader />

      {/* ── Espace initial sous le header fixe ───────── */}
      <div style={{ height: "clamp(5rem, 14vh, 10rem)" }} />

      {/* ── ARGENTIQUE ───────────────────────────────── */}
      <section style={{ padding: `${SEC} 0 ${SEC_B}` }}>
        <div style={{ padding: `0 ${PAD}`, marginBottom: "4rem" }}>
          <SectionTitle en="Film Photography" fr="Argentique" />
          <ViewAll href="/films" en="All series" fr="Toutes les séries" />
        </div>

        <motion.div {...FADE_UP_DELAYED} style={{ maxWidth: "85%", margin: "0 auto" }}>
          <Link href="/films" style={{ display: "block" }}>
            <div className="strip-frame">
              <FilmStrip
                images={FILMS.map(f => ({
                  src: `/films/${f.slug}/${f.images[0]}`,
                  alt: f.title,
                }))}
              />
            </div>
          </Link>
        </motion.div>
      </section>

      {/* ── POLAROIDS ────────────────────────────────── */}
      <section style={{ padding: `${SEC} 0 ${SEC_B}` }}>
        <div style={{ padding: `0 ${PAD}`, marginBottom: "4rem" }}>
          <SectionTitle en="Polaroids" fr="Polaroids" />
          <ViewAll href="/polaroids" en="All polaroids" fr="Tous les polaroids" />
        </div>

        <motion.div {...FADE_UP_DELAYED}>
          <Link href="/polaroids" style={{ display: "block" }}>
            <InfiniteMarquee speed={24} height="clamp(150px, 43vw, 280px)">
              {POLAROID_PREVIEW.map(file => (
                <div key={file} style={{ height: "clamp(150px, 43vw, 280px)", flexShrink: 0, boxShadow: "0 4px 24px rgba(0,0,0,0.13), 0 1px 6px rgba(0,0,0,0.08)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/polaroids/${encodeURIComponent(file)}`}
                    alt="Polaroid"
                    style={{ height: "clamp(150px, 43vw, 280px)", width: "auto", display: "block" }}
                  />
                </div>
              ))}
            </InfiniteMarquee>
          </Link>
        </motion.div>
      </section>

      {/* ── VIDÉO ────────────────────────────────────── */}
      <section style={{ padding: `${SEC} ${PAD} ${SEC_B}` }}>
        <SectionTitle en="Video" fr="Vidéo" />

        <motion.div {...FADE_UP_DELAYED} style={{ maxWidth: "520px" }}>
          <p style={{
            fontFamily:    "var(--font-cormorant), serif",
            fontStyle:     "italic",
            fontWeight:    300,
            fontSize:      "clamp(1.15rem, 2.8vw, 1.7rem)",
            color:         "#9e9a95",
            lineHeight:    1.55,
            letterSpacing: "0.01em",
            marginBottom:  "2.2rem",
          }}>
            Super 8 · VHS · 16 mm
          </p>
          <p style={{
            fontFamily:    "var(--font-space), sans-serif",
            fontSize:      "0.45rem",
            letterSpacing: "0.24em",
            color:         "#c8c4bf",
            textTransform: "uppercase",
          }}>
            {lang === "FR" ? "En développement" : "In development"}
          </p>
        </motion.div>
      </section>

      {/* ── PEINTURES ────────────────────────────────── */}
      <section style={{ padding: `${SEC} 0 ${SEC_B}` }}>
        <div style={{ padding: `0 ${PAD}`, marginBottom: "4rem" }}>
          <SectionTitle en="Paintings & Drawings" fr="Peintures & Dessins" />
          <ViewAll href="/paintings" en="All paintings" fr="Toutes les peintures" />
        </div>

        <motion.div {...FADE_UP_DELAYED}>
          <Link href="/paintings" style={{ display: "block" }}>
            <InfiniteMarquee speed={20} height="clamp(160px, 48vw, 340px)">
              {PAINTING_FILES.map(file => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={file}
                  src={`/paintings/${file}`}
                  alt="Peinture"
                  style={{ height: "clamp(160px, 48vw, 340px)", width: "auto", display: "block" }}
                />
              ))}
            </InfiniteMarquee>
          </Link>
        </motion.div>

      </section>

      {/* ── ÉCRITS ───────────────────────────────────── */}
      <section style={{ padding: `${SEC} ${PAD} ${SEC_B}` }}>
        <div style={{ marginBottom: "4rem" }}>
          <SectionTitle en="Writings" fr="Écrits" />
          <ViewAll href="/writings" en="Read" fr="Lire" />
        </div>

        <motion.div {...FADE_UP_DELAYED}>
          <WritingsCarousel />
        </motion.div>
      </section>

      {/* ── MUSIQUE ──────────────────────────────────── */}
      <section style={{ padding: `${SEC} ${PAD} ${SEC_B}` }}>
        <div style={{ marginBottom: "4rem" }}>
          <SectionTitle en="Music" fr="Musique" />
          <ViewAll href="/music" en="Listen" fr="Écouter" />
        </div>

        <motion.div {...FADE_UP_DELAYED} style={{ display: "flex", alignItems: "flex-start", gap: "2.5rem", flexWrap: "wrap" }}>
          <Link href="/music" style={{ display: "block", flexShrink: 0, lineHeight: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/skipping-record/cover.jpg"
              alt="Skipping Record"
              style={{ width: "160px", height: "160px", objectFit: "cover", display: "block" }}
            />
          </Link>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "0.2rem" }}>
          <p style={{
            fontFamily:    "var(--font-cormorant), serif",
            fontStyle:     "italic",
            fontWeight:    300,
            fontSize:      "clamp(1.3rem, 2.8vw, 2rem)",
            color:         "#1a1a1a",
            lineHeight:    1.4,
            letterSpacing: "-0.01em",
            marginBottom:  "1rem",
          }}>
            SKIPPING RECORD
          </p>
          <p style={{
            fontFamily:    "var(--font-space), sans-serif",
            fontSize:      "0.45rem",
            letterSpacing: "0.2em",
            color:         "#b0aca7",
            textTransform: "uppercase",
          }}>
            EP · 6 {lang === "FR" ? "titres" : "tracks"} · 2026
          </p>
          </div>
        </motion.div>
      </section>

      {/* ── BIOGRAPHIE ───────────────────────────────── */}
      <section style={{ padding: `${SEC} ${PAD} ${SEC_B}` }}>
        <div style={{ marginBottom: "4rem" }}>
          <SectionTitle en="Biography" fr="Biographie" />
          <ViewAll href="/biography" en="Full biography" fr="Biographie complète" />
        </div>

        <motion.div {...FADE_UP_DELAYED} style={{ maxWidth: "540px" }}>
          <p style={{
            fontFamily:    "var(--font-cormorant), serif",
            fontWeight:    300,
            fontSize:      "clamp(0.95rem, 1.8vw, 1.1rem)",
            lineHeight:    1.95,
            color:         "#3a3a3a",
            letterSpacing: "0.01em",
            marginBottom:  "3rem",
          }}>
            {lang === "FR"
              ? "Noah Charlemagne Scheidler est un artiste pluridisciplinaire français né en Bretagne, dans un village proche du Golfe du Morbihan. À seize ans, il s'installe à Paris, où il vit et crée encore aujourd'hui."
              : "Noah Charlemagne Scheidler is a French multidisciplinary artist born in Brittany, in a village near the Gulf of Morbihan. At sixteen, he moved to Paris, where he still lives and creates today."}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {[
              { label: lang === "FR" ? "Basé à" : "Based", text: "Paris",                              href: undefined },
              { label: "Instagram",                         text: "@noahcharlemagne",                   href: "https://instagram.com/noahcharlemagne" },
              { label: "Contact",                           text: "noahcharlemagnescheidler@gmail.com", href: "mailto:noahcharlemagnescheidler@gmail.com" },
            ].map((item) => (
              <div key={item.label} className="bio-info-row" style={{ display: "flex", gap: "2.5rem", alignItems: "baseline" }}>
                <span style={{
                  fontFamily:    "var(--font-space), sans-serif",
                  fontSize:      "0.42rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color:         "#c8c4bf",
                  minWidth:      "72px",
                  flexShrink:    0,
                }}>
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.95rem", color: "#666", textDecoration: "none", transition: "color 0.22s ease" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#1a1a1a")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#666")}
                  >
                    {item.text}
                  </a>
                ) : (
                  <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.95rem", color: "#666" }}>
                    {item.text}
                  </span>
                )}
              </div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer style={{
        padding:        `2.5rem ${PAD}`,
        borderTop:      "1px solid #e8e5e1",
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
        flexWrap:       "wrap",
        gap:            "1rem",
      }}>
        <p style={{
          fontFamily:    "var(--font-space), sans-serif",
          fontSize:      "0.42rem",
          letterSpacing: "0.2em",
          color:         "#c8c4bf",
          textTransform: "uppercase",
        }}>
          © 2026 Noah Charlemagne Scheidler · All rights reserved
        </p>
        <a
          href="mailto:noahcharlemagnescheidler@gmail.com"
          style={{
            fontFamily:    "var(--font-space), sans-serif",
            fontSize:      "0.42rem",
            letterSpacing: "0.2em",
            color:         "#c8c4bf",
            textDecoration: "none",
            textTransform: "uppercase",
            transition:    "color 0.22s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#1a1a1a")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#c8c4bf")}
        >
          Mail
        </a>
      </footer>
    </div>
  );
}
