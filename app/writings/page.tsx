"use client";

import Link from "next/link";
import SubpageLayout from "@/components/SubpageLayout";
import { useLang } from "@/contexts/LangContext";

const WRITINGS = [
  {
    title: "La Femme Sans Visage (The Women Without a Face)",
    titleFr: "La Femme Sans Visage",
    date: "2025",
    readTime: null,
    excerpt: "Literary narrative.\n\nShe had no face he could hold onto, only a presence that arrived without warning and left without explanation. A narrative in seven movements, written at the edge of what memory can bear.\nSelf-published by the author.",
    excerptFr: "Récit littéraire.\n\nElle n'avait pas de visage qu'il pouvait retenir, seulement une présence qui arrivait sans prévenir et repartait sans s'expliquer. Un récit de sept mouvements, écrit à la limite de ce que la mémoire peut supporter.\nAutopublication de l'auteur.",
    href: "/writings/la-femme-sans-visage",
  },
  {
    title: "Émotions",
    titleFr: "Émotions",
    date: "2026",
    readTime: null,
    excerpt: "Prose & poetry.\n\nFear, sadness, dream, love · four emotions, four texts.\nSelf-published by the author.",
    excerptFr: "Prose & poèmes.\n\nPeur, tristesse, rêve, amour · quatre émotions, quatre textes.\nAutopublié par l'auteur.",
    href: "/writings/emotions",
  },
  {
    title: "L'Être Seul",
    titleFr: "L'Être Seul",
    date: "2026",
    readTime: null,
    excerpt: "Handwritten letter.\n\nWho would you be if no one was watching?\nA question asked by @kolarchive.\nSelf-published by the author.",
    excerptFr: "Lettre manuscrite.\n\nQui serait-tu si personne ne te regardait ?\nUne question posée par @kolarchive.\nAutopublication de l'auteur.",
    href: "/writings/l-etre-seul",
  },
  {
    title: "Traversées",
    titleFr: "Traversées",
    date: "2024",
    readTime: null,
    excerpt: "A journal of poems.\n\n14 poems crossing love, loss and rebirth. From the thorn to the dust, an intimate diary in verse.\nSelf-published by the author.",
    excerptFr: "Journal de poèmes.\n\n14 poèmes traversant l'amour, la perte et la renaissance. De l'épine à la poussière, un journal intime en vers.\nAutopublié par l'auteur.",
    href: "/writings/traversees",
  },
  {
    title: "Une Pensée (A Thought)",
    titleFr: "Une Pensée",
    date: "2023",
    readTime: null,
    excerpt: "Poetry collection, Vol. 1.\n\nA life is the story of your thoughts, so write it.\nSelf-published by the author.",
    excerptFr: "Recueil de poèmes, Vol. 1.\n\nUne vie c'est l'histoire de vos pensées, alors écrivez-la.\nAutopublication de l'auteur.",
    href: "/writings/une-pensee",
  },
  {
    title: "Ma Prose (My Prose)",
    titleFr: "Ma Prose",
    date: "2023",
    readTime: null,
    excerpt: "Poetry collection, Vol. 2.\n\nThe grief of our story is the conductor of our art.\nSelf-published by the author.",
    excerptFr: "Recueil de poèmes, Vol. 2.\n\nLe chagrin de notre histoire est conducteur à la prospérité de notre art.\nAutopublication de l'auteur.",
    href: "/writings/ma-prose",
  },
  {
    title: "Note à Moi Même (Note to Myself)",
    titleFr: "Note à Moi Même",
    date: "2023",
    readTime: null,
    excerpt: "Poetry collection, Vol. 3.\n\nI love my happiness as much as my sorrow, for one gives rise to the other.\nSelf-published by the author.",
    excerptFr: "Recueil de poèmes, Vol. 3.\n\nAinsi j'aime autant mon bonheur que mon malheur, étant donné que l'un offre l'autre.\nAutopublication de l'auteur.",
    href: "/writings/note-a-moi-meme",
  },
];

export default function WritingsPage() {
  const { lang, t } = useLang();

  return (
    <SubpageLayout title={t("page.writings.title")}>
      <div style={{ maxWidth: "640px" }}>
        {WRITINGS.map((piece, i) => (
          <div
            key={piece.title}
            style={{
              paddingTop: i === 0 ? 0 : "2.2rem",
              paddingBottom: "2.2rem",
              borderBottom: "1px solid #e4e2df",
              cursor: "default",
            }}
          >
            <p style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.15em",
              color: "#bbb",
              textTransform: "uppercase",
              marginBottom: "0.6rem",
            }}>
              {piece.date}{piece.readTime ? ` · ${piece.readTime} ${t("inspirations.readingTime")}` : ""}
            </p>

            <h2 style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "0.9rem",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "#1a1a1a",
              marginBottom: "0.7rem",
              lineHeight: 1.4,
            }}>
              {lang === "FR" ? piece.titleFr : piece.title}
            </h2>

            <p style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "0.65rem",
              color: "#888",
              lineHeight: 1.75,
              letterSpacing: "0.02em",
              whiteSpace: "pre-line",
            }}>
              {lang === "FR" ? piece.excerptFr : piece.excerpt}
            </p>

            {piece.href ? (
              <Link
                href={piece.href}
                style={{
                  fontFamily: "var(--font-space), sans-serif",
                  fontSize: "0.5rem",
                  letterSpacing: "0.18em",
                  color: "#1a1a1a",
                  textTransform: "uppercase",
                  marginTop: "0.9rem",
                  textDecoration: "none",
                  display: "inline-block",
                  borderBottom: "1px solid #1a1a1a",
                  paddingBottom: "1px",
                }}
              >
                {t("writings.read")} →
              </Link>
            ) : (
              <p style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: "0.5rem",
                letterSpacing: "0.18em",
                color: "#ccc",
                textTransform: "uppercase",
                marginTop: "0.9rem",
                transition: "color 0.2s ease",
                cursor: "pointer",
              }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#1a1a1a")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#ccc")}
              >
                {t("writings.read")} →
              </p>
            )}
          </div>
        ))}
      </div>
    </SubpageLayout>
  );
}
