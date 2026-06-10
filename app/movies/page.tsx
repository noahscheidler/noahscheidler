"use client";

import SiteHeader from "@/components/SiteHeader";
import { useLang } from "@/contexts/LangContext";

export default function MoviesPage() {
  const { t } = useLang();

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8f7f5",
      display: "flex",
      flexDirection: "column",
    }}>
      <SiteHeader />
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
          color: "#c8c4bf",
        }}>
          {t("comingSoon")}
        </p>
      </div>
    </div>
  );
}
