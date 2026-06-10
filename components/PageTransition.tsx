"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const divRef    = useRef<HTMLDivElement>(null);
  const prevPath  = useRef<string>(pathname);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    const el = divRef.current;
    if (!el) return;

    el.style.opacity  = "0";
    el.style.transition = "none";

    const raf = requestAnimationFrame(() => {
      el.style.transition = "opacity 0.35s ease";
      el.style.opacity    = "1";
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div
      ref={divRef}
      style={{ minHeight: "100vh", opacity: 1 }}
    >
      {children}
    </div>
  );
}
