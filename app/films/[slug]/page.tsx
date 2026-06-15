"use client";

import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { useLang } from "@/contexts/LangContext";
import { getFilm } from "@/data/films";

export default function FilmPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { lang, t } = useLang();
  const film = getFilm(slug);

  if (!film) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#f8f7f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <SiteHeader />
        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontSize: "1.2rem",
          color: "#9e9a95",
        }}>
          Série introuvable.
        </p>
      </div>
    );
  }

  const description = lang === "FR" ? film.descriptionFr : film.description;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f7f5" }}>
      <SiteHeader />

      {/* Header */}
      <div style={{
        paddingTop: "6.5rem",
        paddingLeft: "clamp(1.5rem, 10%, 7rem)",
        paddingRight: "clamp(1.5rem, 10%, 7rem)",
        paddingBottom: "2.2rem",
        borderBottom: "1px solid #e8e5e1",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "2rem",
      }}>
        <div>
          <Link
            href="/films"
            style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "0.45rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#b0aca7",
              textDecoration: "none",
              display: "block",
              marginBottom: "1rem",
              transition: "color 0.22s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#1a1a1a")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#b0aca7")}
          >
            {t("back")}
          </Link>
          <h1 className="film-detail-title" style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(1.46rem, 3.64vw, 2.82rem)",
            letterSpacing: "-0.025em",
            color: "#1a1a1a",
            lineHeight: 0.92,
          }}>
            {film.title}
          </h1>
        </div>
        <p style={{
          fontFamily: "var(--font-space), sans-serif",
          fontSize: "0.45rem",
          letterSpacing: "0.16em",
          color: "#b0aca7",
          textTransform: "uppercase",
          flexShrink: 0,
          paddingBottom: "0.2rem",
        }}>
          {film.year} · {film.images.length} photos
        </p>
      </div>

      <main style={{ padding: "3.5rem clamp(1.5rem, 10%, 7rem) 7rem" }}>
        {description && (
          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "1rem",
            lineHeight: 1.85,
            color: "#666",
            maxWidth: "520px",
            marginBottom: "3.5rem",
          }}>
            {description}
          </p>
        )}

        {/* Single-column photo scroll — style éditorial */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "3.5rem",
          alignItems: "center",
        }}>
          {film.images.map((img, i) => (
            <div
              key={img}
              style={{
                width: "clamp(260px, 52vw, 580px)",
              }}
            >
              <Image
                src={`/films/${film.slug}/${img}`}
                alt={`${film.title} — ${i + 1}`}
                width={1600}
                height={1200}
                priority={i < 4}
                loading={i < 4 ? "eager" : "lazy"}
                style={{ width: "100%", height: "auto", display: "block" }}
                sizes="(max-width: 768px) 80vw, 560px"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
