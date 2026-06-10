"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/contexts/LangContext";
import LangToggle from "./LangToggle";

const MAIL = "mailto:noahcharlemagnescheidler@gmail.com";

const SECTIONS = [
  { href: "/films",        labelKey: "nav.films" },
  { href: "/polaroids",    labelKey: "nav.polaroids" },
  { href: "/paintings",    labelKey: "nav.paintings" },
  { href: "/writings",     labelKey: "nav.writings" },
  { href: "/movies",       labelKey: "nav.movies" },
  { href: "/music",        labelKey: "nav.music" },
  { href: "/biography", labelKey: "nav.biography" },
];

export default function Nav() {
  const { t } = useLang();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mailHovered, setMailHovered] = useState(false);

  const linkStyle = (href: string) => ({
    fontFamily: "var(--font-space), sans-serif",
    fontSize: "0.58rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    color: pathname === href ? "#1a1a1a" : "#999",
    transition: "color 0.2s ease",
    whiteSpace: "nowrap" as const,
    borderBottom: pathname === href ? "1px solid #1a1a1a" : "1px solid transparent",
    paddingBottom: "1px",
  });

  return (
    <>
      {/* Desktop nav */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        backgroundColor: "#faf9f7",
        borderBottom: "1px solid #e4e2df",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        height: "2.8rem",
        gap: "1rem",
      }}>
        {/* Left — NCS home link */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-space), sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "#1a1a1a",
            flexShrink: 0,
            textDecoration: "none",
          }}
        >
          NCS
        </Link>

        {/* Separator */}
        <span style={{ color: "#ddd", fontSize: "0.7rem", flexShrink: 0 }}>|</span>

        {/* Center — section links (hidden on mobile) */}
        <div
          className="nav-desktop-links"
          style={{
            display: "flex",
            gap: "1.4rem",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              style={linkStyle(s.href)}
              onMouseEnter={(e) => {
                if (pathname !== s.href)
                  (e.target as HTMLElement).style.color = "#1a1a1a";
              }}
              onMouseLeave={(e) => {
                if (pathname !== s.href)
                  (e.target as HTMLElement).style.color = "#999";
              }}
            >
              {t(s.labelKey)}
            </Link>
          ))}
        </div>

        {/* Right — FR·EN + mail + mobile hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
          <LangToggle />

          <a
            href={MAIL}
            title="Contact"
            onMouseEnter={() => setMailHovered(true)}
            onMouseLeave={() => setMailHovered(false)}
            style={{
              fontFamily: "var(--font-space), sans-serif",
              color: mailHovered ? "#1a1a1a" : "#999",
              textDecoration: "none",
              transition: "color 0.2s ease",
              lineHeight: 1,
              position: "relative",
              display: "inline-block",
              width: "2rem",
              height: "1.2rem",
              textAlign: "center",
            }}
          >
            <span style={{
              opacity: mailHovered ? 0 : 1,
              transition: "opacity 0.2s ease",
              fontSize: "0.58rem",
              letterSpacing: "0.15em",
              position: "absolute",
              top: 0, right: 0, bottom: 0, left: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>MAIL</span>
            <span style={{
              opacity: mailHovered ? 1 : 0,
              transition: "opacity 0.2s ease",
              fontSize: "1rem",
              position: "absolute",
              top: 0, right: 0, bottom: 0, left: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>💌</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.15em",
              color: "#999",
              padding: 0,
              display: "none", // shown via CSS media query in globals
            }}
            aria-label="menu"
          >
            {mobileOpen ? "×" : "≡"}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="nav-mobile-dropdown"
          style={{
            position: "fixed",
            top: "2.8rem",
            left: 0,
            right: 0,
            backgroundColor: "#faf9f7",
            borderBottom: "1px solid #e4e2df",
            zIndex: 199,
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: pathname === s.href ? "#1a1a1a" : "#999",
                textDecoration: "none",
              }}
            >
              {t(s.labelKey)}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}
