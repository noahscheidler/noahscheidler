"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FilmStripProps {
  images: { src: string; alt: string }[];
  height?: string; // conservé pour compatibilité, non utilisé pour le rendu
  slug?:   string; // exception chez-emma / hante-moi
}

const SLIDE_MS = 3800;
const FADE_S   = 0.5;

const EXCEPTION_SLUG   = "chez-emma";
const EXCEPTION_SLUG_2 = "hante-moi";

export default function FilmStrip({ images, slug }: FilmStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cyclableImages, setCyclableImages] = useState<{ src: string; alt: string }[]>([]);
  const [index, setIndex]     = useState(0);
  const [inView, setInView]   = useState(false);
  const [aspectRatio, setAspectRatio] = useState<string | undefined>(undefined);

  /* ── 1. Filtre paysage + calcul du ratio de la 1ère image ── */
  useEffect(() => {
    let cancelled = false;

    const computeRatioAndSet = (imgs: { src: string; alt: string }[]) => {
      if (cancelled || imgs.length === 0) return;
      setCyclableImages(imgs);
      // Verrouiller le ratio sur la première image du cycle
      const el = new window.Image();
      el.onload = () => {
        if (!cancelled) setAspectRatio(`${el.naturalWidth} / ${el.naturalHeight}`);
      };
      el.src = imgs[0].src;
    };

    if (slug === EXCEPTION_SLUG || slug === EXCEPTION_SLUG_2) {
      computeRatioAndSet(images);
      return () => { cancelled = true; };
    }

    Promise.all(
      images.map(
        (img) =>
          new Promise<{ img: typeof img; landscape: boolean }>((resolve) => {
            const el = new window.Image();
            el.onload  = () => resolve({ img, landscape: el.naturalWidth > el.naturalHeight });
            el.onerror = () => resolve({ img, landscape: false });
            el.src = img.src;
          }),
      ),
    ).then((results) => {
      if (cancelled) return;
      const landscape = results.filter((r) => r.landscape).map((r) => r.img);
      computeRatioAndSet(landscape.length > 0 ? landscape : [images[0]]);
    });

    return () => { cancelled = true; };
  }, [images, slug]);

  /* ── 2. IntersectionObserver ─────────────────────────── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setInView(visible);
        if (!visible) setIndex(0);
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── 3. Timer, uniquement quand inView ───────────────── */
  useEffect(() => {
    if (!inView || cyclableImages.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % cyclableImages.length),
      SLIDE_MS,
    );
    return () => clearInterval(id);
  }, [inView, cyclableImages.length]);

  const current = cyclableImages[index] ?? images[0];
  if (!current) return null;

  return (
    <div
      ref={containerRef}
      style={{
        width:       "100%",
        aspectRatio: aspectRatio ?? "auto",
        backgroundColor: "#f8f7f5",
        overflow:    "hidden",
        position:    "relative",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={current.src}
          alt={current.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_S, ease: "easeInOut" }}
          draggable={false}
          style={{
            position:   "absolute",
            inset:      0,
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            display:    "block",
          }}
        />
      </AnimatePresence>
    </div>
  );
}
