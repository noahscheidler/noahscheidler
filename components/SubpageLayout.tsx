"use client";

import SiteHeader from "./SiteHeader";

export default function SubpageLayout({
  title,
  action,
  bg,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  bg?: string;
  children: React.ReactNode;
}) {
  const background = bg ?? "#f8f7f5";
  const textColor = "#1a1a1a";

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: background,
      color: textColor,
    }}>
      <SiteHeader />

      {/* Page title */}
      <div style={{
        paddingTop: "6.5rem",
        paddingLeft: "clamp(1.5rem, 10%, 7rem)",
        paddingRight: "clamp(1.5rem, 10%, 7rem)",
        paddingBottom: "2.2rem",
        borderBottom: `1px solid ${bg ? "rgba(255,255,255,0.12)" : "#e8e5e1"}`,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "2rem",
      }}>
        <h1 className="section-title-text" style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1.46rem, 3.64vw, 2.82rem)",
          letterSpacing: "-0.025em",
          color: textColor,
          lineHeight: 0.92,
        }}>
          {title}
        </h1>
        {action && (
          <div style={{ paddingBottom: "0.2rem", flexShrink: 0 }}>
            {action}
          </div>
        )}
      </div>

      <main style={{
        padding: "3.5rem clamp(1.5rem, 10%, 7rem) 7rem",
      }}>
        {children}
      </main>
    </div>
  );
}
