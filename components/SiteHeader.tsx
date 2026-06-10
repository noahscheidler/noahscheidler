"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";

export default function SiteHeader() {
  const { lang, setLang } = useLang();

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "1.75rem 2.25rem",
        pointerEvents: "none",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-space), sans-serif",
          fontSize: "0.5rem",
          letterSpacing: "0.25em",
          color: "#9e9a95",
          textDecoration: "none",
          textTransform: "uppercase",
          pointerEvents: "auto",
          lineHeight: 1,
          transition: "color 0.25s ease",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#1a1a1a")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9e9a95")}
      >
        Noah Charlemagne Scheidler
      </Link>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        pointerEvents: "auto",
        lineHeight: 1,
      }}>
        <button
          onClick={() => setLang("FR")}
          style={{
            fontFamily: "var(--font-space), sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.2em",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            color: lang === "FR" ? "#1a1a1a" : "#9e9a95",
            transition: "color 0.3s ease",
          }}
          aria-label="Français"
        >
          FR
        </button>
        <span style={{ color: "#c8c4bf", margin: "0 0.35em", fontSize: "0.5rem", pointerEvents: "none" }}>·</span>
        <button
          onClick={() => setLang("EN")}
          style={{
            fontFamily: "var(--font-space), sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.2em",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            color: lang === "EN" ? "#1a1a1a" : "#9e9a95",
            transition: "color 0.3s ease",
          }}
          aria-label="English"
        >
          EN
        </button>
      </div>
    </header>
  );
}
