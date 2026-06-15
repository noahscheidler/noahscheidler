"use client";

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
  // Triple les items pour garantir que toutes les œuvres défilent sur mobile et desktop
  const tripled = [...children, ...children, ...children];

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        className="marquee-track"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(1rem, 2.5vw, 2.5rem)",
          width: "fit-content",
          height,
          ["--marquee-speed" as string]: `${speed}s`,
          ["--marquee-speed-mobile" as string]: `${mobileSpeed ?? speed * 0.7}s`,
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
