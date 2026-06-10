"use client";

export default function InfiniteMarquee({
  children,
  speed = 40,
  height,
}: {
  children: React.ReactNode[];
  speed?: number;
  height?: string;
}) {
  const doubled = [...children, ...children];

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
        }}
      >
        {doubled.map((child, i) => (
          <div key={i} style={{ flexShrink: 0 }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
