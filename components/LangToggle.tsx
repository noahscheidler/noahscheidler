"use client";

import { useState } from "react";
import { useLang } from "@/contexts/LangContext";

export default function LangToggle() {
  const { lang, setLang } = useLang();
  const [hoveredFR, setHoveredFR] = useState(false);
  const [hoveredEN, setHoveredEN] = useState(false);

  const btnStyle = (active: boolean) => ({
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-space), sans-serif",
    fontSize: "0.6rem",
    letterSpacing: "0.15em",
    padding: 0,
    color: active ? "#1a1a1a" : "#aaa",
    transition: "color 0.2s ease",
    lineHeight: 1,
    minWidth: "1.4rem",
    textAlign: "center" as const,
  });

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      userSelect: "none",
    }}>
      <button
        onClick={() => setLang("FR")}
        onMouseEnter={() => setHoveredFR(true)}
        onMouseLeave={() => setHoveredFR(false)}
        style={btnStyle(lang === "FR")}
        title="Français"
      >
        {hoveredFR ? "🇫🇷" : "FR"}
      </button>
      <span style={{ color: "#ddd", fontSize: "0.6rem" }}>·</span>
      <button
        onClick={() => setLang("EN")}
        onMouseEnter={() => setHoveredEN(true)}
        onMouseLeave={() => setHoveredEN(false)}
        style={btnStyle(lang === "EN")}
        title="English"
      >
        {hoveredEN ? "🇬🇧" : "EN"}
      </button>
    </div>
  );
}
