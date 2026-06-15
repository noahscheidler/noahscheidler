"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

type Lang = "EN" | "FR";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const dict: Record<Lang, Record<string, string>> = {
  EN: {
    "nav.films": "FILMS",
    "nav.polaroids": "POLAROIDS",
    "nav.paintings": "PAINTINGS",
    "nav.writings": "WRITINGS",
    "nav.movies": "VIDEOS",
    "nav.music": "MUSIC",
    "nav.biography": "BIOGRAPHY",
    "page.films.title": "FILMS",
    "page.polaroids.title": "Polaroids",
    "page.paintings.title": "Paintings",
    "page.writings.title": "Writings",
    "page.movies.title": "VIDEOS",
    "page.music.title": "MUSIC",
    "footer": "Paris, 2025",
    "comingSoon": "coming soon",
    "readMore": "read more",
    "back": "← back",
    "films.placeholder": "Film archive in progress",
    "polaroids.placeholder": "Polaroids archive in progress",
    "paintings.label": "painting",
    "writings.date": "date",
    "writings.read": "read",
    "movies.year": "year",
    "movies.dir": "dir.",
    "inspirations.readingTime": "min read",
  },
  FR: {
    "nav.films": "ARGENTIQUE",
    "nav.polaroids": "POLAROIDS",
    "nav.paintings": "PEINTURES",
    "nav.writings": "ÉCRITS",
    "nav.movies": "VIDÉOS",
    "nav.music": "MUSIQUE",
    "nav.biography": "BIOGRAPHIE",
    "page.films.title": "ARGENTIQUE",
    "page.polaroids.title": "Polaroids",
    "page.paintings.title": "Peintures",
    "page.writings.title": "Écrits",
    "page.movies.title": "VIDÉOS",
    "page.music.title": "MUSIQUE",
    "footer": "Paris, 2025",
    "comingSoon": "bientôt",
    "readMore": "lire la suite",
    "back": "← retour",
    "films.placeholder": "Archive films en cours",
    "polaroids.placeholder": "Archive polaroids en cours",
    "paintings.label": "peinture",
    "writings.date": "date",
    "writings.read": "lire",
    "movies.year": "année",
    "movies.dir": "réal.",
    "inspirations.readingTime": "min de lecture",
  },
};

const LangContext = createContext<LangContextType>({
  lang: "EN",
  setLang: () => {},
  t: (key) => key,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const defaultLang: Lang = pathname?.startsWith("/writings") ? "FR" : "EN";
  const [lang, setLang] = useState<Lang>(defaultLang);

  useEffect(() => {
    setLang(pathname?.startsWith("/writings") ? "FR" : "EN");
  }, [pathname]);

  const t = (key: string): string => dict[lang][key] ?? key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
