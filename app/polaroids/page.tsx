"use client";

import { useState, useEffect, useCallback } from "react";
import SubpageLayout from "@/components/SubpageLayout";
import { useLang } from "@/contexts/LangContext";

const DEFAULT_POLAROIDS = [
  "IMG_3699.jpg",
  "IMG_7863 2.JPG",
  "IMG_7837.JPG",
  "RL.jpg",
  "Scan 6.JPG",
  "IMG_2235.JPG",
  "POLA B 7.JPG",
  "polaroid-03.jpg",
  "POLA B 6.jpg",
  "IMG_20250216_0001.JPG",
  "Scan 5.JPG",
  "polaroid-06.jpg",
  "Scan 8.JPG",
  "IMG_2256.JPG",
  "IMG_4377.JPG",
  "IMG_9942.JPG",
  "polaroid-04.jpg",
  "polaroid-05.jpg",
  "IMG_2266.JPG",
  "IMG_7844.JPG",
  "IMG_7848.JPG",
  "NOAH 23.jpg",
  "polaroid-01.jpg",
  "NOAH 24.jpg",
  "NOAH 25.JPG",
  "NOAH 26.jpg",
  "NOAH 31.jpg",
  "NOAH 49.jpg",
  "NOAH 51.jpg",
  "NOAH 50.jpg",
  "PAC 20.jpg",
  "IMG_7845.JPG",
  "Scan 10.JPG",
  "Scan 12.JPG",
  "Scan 14.JPG",
];

const STORAGE_KEY = "polaroids-order";

export default function PolaroidsPage() {
  const { t } = useLang();
  const [polaroids, setPolaroids] = useState<string[]>(DEFAULT_POLAROIDS);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPolaroids(JSON.parse(saved));
    } catch {}
  }, []);

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, close]);

  return (
    <SubpageLayout title={t("page.polaroids.title")}>
      <div className="polaroids-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "4rem 2.5rem",
        paddingTop: "0.5rem",
      }}>
        {polaroids.map((file, i) => (
          <div
            key={file}
            onClick={() => setLightbox(file)}
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 24px rgba(0,0,0,0.13), 0 1px 6px rgba(0,0,0,0.08)",
              cursor: "pointer",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/polaroids/${encodeURIComponent(file)}`}
              alt={`Polaroid ${i + 1}`}
              draggable={false}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 900,
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          {/* Image + croix */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", display: "inline-block" }}
          >
            <button
              onClick={close}
              style={{
                position: "absolute",
                top: "-1.6rem",
                right: "-1.6rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#c8c4bf",
                fontSize: "1.2rem",
                lineHeight: 1,
                padding: "4px 8px",
                transition: "color 0.2s ease",
                zIndex: 901,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#c8c4bf")}
              aria-label="Fermer"
            >
              ×
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/polaroids/${encodeURIComponent(lightbox)}`}
              alt="Polaroid"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
                display: "block",
              }}
            />
          </div>
        </div>
      )}
    </SubpageLayout>
  );
}
