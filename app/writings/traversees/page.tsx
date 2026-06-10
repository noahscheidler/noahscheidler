"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import SiteHeader from "@/components/SiteHeader";

export default function Traversees() {
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);

  const src = lang === "FR" ? "/traversees.html" : "/traversees-en.html";
  const backLabel = lang === "FR" ? "← Écrits" : "← Writings";

  return (
    <div style={{ backgroundColor: "#f8f7f5" }}>
      <SiteHeader />

      <Link
        href="/writings"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
          style={{
          position: "fixed",
          top: "4rem",
          left: "2.25rem",
          zIndex: 300,
          fontFamily: "var(--font-space), sans-serif",
          fontSize: "0.45rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          textDecoration: "none",
          color: hovered ? "#1a1a1a" : "#b0aca7",
          transition: "color 0.22s ease",
        }}
      >
        {backLabel}
      </Link>

      <div className="writing-wrapper">
        <iframe
          key={src}
          src={src}
          className="writing-iframe"
        />
      </div>
    </div>
  );
}
