"use client";

import Link from "next/link";
import SubpageLayout from "@/components/SubpageLayout";
import FilmStrip from "@/components/FilmStrip";
import { useLang } from "@/contexts/LangContext";
import { FILMS } from "@/data/films";

export default function FilmsPage() {
  const { lang } = useLang();

  return (
    <SubpageLayout title={lang === "FR" ? "Argentique" : "Film Photography"}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(3.5rem, 11vh, 8rem)",
      }}>
        {FILMS.map((film) => (
          <article key={film.slug}>
            {/* Strip — full-width, scrollable horizontally */}
            {/* Negative margins break out of SubpageLayout padding → edge-to-edge */}
            <Link
              href={`/films/${film.slug}`}
              style={{
                display: "block",
                cursor: "pointer",
                maxWidth: "clamp(260px, 52vw, 580px)",
                margin: "0 auto",
              }}
            >
              <FilmStrip
                slug={film.slug}
                images={film.images.map(img => ({
                  src: `/films/${film.slug}/${img}`,
                  alt: `${film.title} — ${img}`,
                }))}
                height="58vh"
              />
            </Link>

            {/* Caption */}
            <div style={{
              marginTop: "1rem",
              maxWidth: "clamp(260px, 52vw, 580px)",
              margin: "1rem auto 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "1rem",
            }}>
              <p className="film-title" style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(1rem, 2vw, 1.3rem)",
                color: "#1a1a1a",
                letterSpacing: "-0.01em",
              }}>
                {film.title}
              </p>
              <p style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)",
                color: "#9e9a95",
                flexShrink: 0,
              }}>
                {film.year}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SubpageLayout>
  );
}
