"use client";

import { useState, useEffect } from "react";

export default function InfiniteMarquee({
  children,
  speed = 40,
  mobileSpeed,
  height,
}: {
  children: React.ReactNode[];
  speed?: number;
  mobileSpeed?: number;
  height?: string;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const activeSpeed = isMobile && mobileSpeed ? mobileSpeed : speed;

  // Triple pour garantir que toutes les œuvres défilent avant la boucle
  const tripled = [...children, ...children, ...children];

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(1rem, 2.5vw, 2.5rem)",
          width: "fit-content",
          height,
          animation: `marquee-left ${activeSpeed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {tripled.map((child, i) => (
          <div key={i} style={{ flexShrink: 0 }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
