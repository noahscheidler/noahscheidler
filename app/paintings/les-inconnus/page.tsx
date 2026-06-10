"use client";

import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import { useLang } from "@/contexts/LangContext";

const DRAWINGS: { file: string; width: number; height: number }[] = [
  { file: "IMG_2201.jpg",  width: 1936, height: 2833 },
  { file: "IMG_2219.JPG",  width: 1870, height: 3323 },
  { file: "IMG_2737.jpg",  width: 2280, height: 2536 },
  { file: "IMG_2784.jpg",  width: 1853, height: 2877 },
  { file: "IMG_2786.JPG",  width: 1965, height: 2800 },
  { file: "IMG_2788.jpg",  width: 1908, height: 2990 },
  { file: "IMG_2789.jpg",  width: 2000, height: 2933 },
  { file: "IMG_2791.jpg",  width: 1521, height: 2175 },
  { file: "IMG_2792.jpg",  width: 2092, height: 3057 },
  { file: "IMG_2795.jpg",  width: 1922, height: 2798 },
  { file: "IMG_2802.jpg",  width: 2110, height: 2895 },
  { file: "IMG_2803.jpg",  width: 1992, height: 2875 },
  { file: "IMG_2807.JPG",  width: 1920, height: 2723 },
  { file: "IMG_2808.jpg",  width: 2138, height: 3153 },
  { file: "IMG_2810.jpg",  width: 1994, height: 2684 },
  { file: "IMG_2812.jpg",  width: 2212, height: 3186 },
  { file: "IMG_2816.JPG",  width: 1911, height: 2759 },
  { file: "IMG_8227.jpg",  width: 3586, height: 4944 },
  { file: "IMG_8230.jpg",  width: 2903, height: 4292 },
  { file: "IMG_8231.jpg",  width: 3450, height: 4684 },
  { file: "IMG_8232.jpg",  width: 3359, height: 4657 },
  { file: "IMG_8233.JPG",  width: 2686, height: 3903 },
  { file: "IMG_8234.jpg",  width: 3247, height: 4387 },
  { file: "IMG_8239.jpg",  width: 2748, height: 4393 },
  { file: "IMG_8240.JPG",  width: 2887, height: 4403 },
  { file: "IMG_8243.JPG",  width: 2521, height: 4093 },
  { file: "IMG_8246.jpg",  width: 3184, height: 4525 },
  { file: "IMG_8247.jpg",  width: 3172, height: 4531 },
  { file: "IMG_8248.jpg",  width: 2921, height: 4123 },
  { file: "IMG_8250.jpg",  width: 2932, height: 4424 },
  { file: "IMG_8253.jpg",  width: 2927, height: 4490 },
  { file: "IMG_8279.jpg",  width: 2908, height: 4280 },
  { file: "IMG_8286.jpg",  width: 4346, height: 3421 },
];

export default function LesInconnusPage() {
  const { lang } = useLang();

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      color: "#1a1a1a",
    }}>
      <SiteHeader />

      {/* En-tête */}
      <div style={{
        paddingTop: "6.5rem",
        paddingLeft: "clamp(1.5rem, 10%, 7rem)",
        paddingRight: "clamp(1.5rem, 10%, 7rem)",
        paddingBottom: "2.2rem",
        borderBottom: "1px solid #e8e5e1",
      }}>
        <h1 className="section-title-text" style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1.46rem, 3.64vw, 2.82rem)",
          letterSpacing: "-0.025em",
          color: "#1a1a1a",
          lineHeight: 0.92,
          marginBottom: "0.75rem",
        }}>
          Les Inconnus
        </h1>
        <p style={{
          fontFamily: "var(--font-space), sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#aaa",
        }}>
          {lang === "FR" ? "Carnet de dessins, 2023–2026" : "Drawing journal, 2023–2026"}
        </p>
      </div>

      {/* Galerie */}
      <main style={{
        padding: "6rem clamp(1.5rem, 10%, 7rem) 10rem",
      }}>
        {DRAWINGS.map((d) => (
          <div
            key={d.file}
            style={{ marginBottom: "8rem" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/drawings/les-inconnus/${d.file}`}
              alt=""
              style={{
                display: "block",
                width: "100%",
                maxWidth: "720px",
                height: "auto",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
