"use client";

import { useEffect, useRef } from "react";

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
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef     = useRef(0);
  const rafRef   = useRef<number>(0);

  const tripled = [...children, ...children, ...children];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let last = performance.now();

    const loop = (now: number) => {
      const dt    = now - last;
      last        = now;

      const w = track.scrollWidth;
      if (w > 0) {
        const mobile  = window.innerWidth <= 600;
        const s       = (mobile && mobileSpeed) ? mobileSpeed : speed;
        const pxPerMs = (w / 3) / (s * 1000);
        const limit   = w / 3;

        xRef.current = (xRef.current + pxPerMs * dt) % limit;
        track.style.transform = `translateX(-${xRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, mobileSpeed]);

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        ref={trackRef}
        style={{
          display:    "flex",
          alignItems: "center",
          gap:        "clamp(1rem, 2.5vw, 2.5rem)",
          width:      "fit-content",
          height,
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
