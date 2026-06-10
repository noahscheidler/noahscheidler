"use client";

import { useState } from "react";
import SubpageLayout from "@/components/SubpageLayout";
import { useLang } from "@/contexts/LangContext";

const POSTS = [
  {
    slug: "on-the-silence-between-frames",
    title: "On the Silence Between Frames",
    titleFr: "Sur le silence entre les images",
    date: "December 2024", readTime: 12, tag: "CINEMA",
    body: [
      "There is a moment in Wong Kar-wai's In the Mood for Love where the camera lingers on an empty corridor long after the characters have left. No dialogue. No score. Just light on a wall.",
      "I have watched that shot perhaps forty times. And each time, I understand something different about what it means to be present in absence, to let a space hold what the body cannot say.",
      "This is what separates cinema from every other art: the ability to slow time without stopping it. To make the viewer inhabit a duration.",
      "When I make films, I think constantly about what happens in the cuts. Not just what is shown, but what is deliberately withheld. The audience completes the image. The filmmaker only provides the conditions for that completion.",
      "Silence is not nothing. It is the negative space that gives form to everything around it.",
      "I keep returning to Tarkovsky's idea that cinema is sculpting in time. But I would add: the best work sculpts the silence within time.",
    ],
    bodyFr: [
      "Il y a un moment dans In the Mood for Love de Wong Kar-wai où la caméra s'attarde sur un couloir vide longtemps après que les personnages soient partis. Pas de dialogue. Pas de musique. Juste la lumière sur un mur.",
      "J'ai regardé ce plan peut-être quarante fois. Et à chaque fois, je comprends quelque chose de différent sur ce que signifie être présent dans l'absence.",
      "C'est ce qui sépare le cinéma de tout autre art : la capacité de ralentir le temps sans l'arrêter.",
      "Quand je fais des films, je pense constamment à ce qui se passe dans les coupes.",
      "Le silence n'est pas rien. C'est l'espace négatif qui donne forme à tout ce qui l'entoure.",
      "Je reviens sans cesse à l'idée de Tarkovski que le cinéma est une sculpture dans le temps.",
    ],
  },
  {
    slug: "a-room-in-paris",
    title: "A Room in Paris",
    titleFr: "Une chambre à Paris",
    date: "October 2024", readTime: 7, tag: "PERSONAL",
    body: [
      "The room is twelve square meters. A bed, a desk, a window that faces west. In the evening the light falls at exactly the angle that makes everything look like a Hopper painting.",
      "I have lived here for two years and I still haven't decided whether I love or hate this city. Perhaps that tension is the point.",
      "Paris demands something from you. It asks you to have opinions, to dress with intention, to sit still at a café and pretend this is enough.",
      "I paint in the mornings when the light is flat and neutral. I write at night when the city outside has quieted to a frequency I can tolerate.",
      "Art is what happens when you're trying to say something that language keeps failing.",
    ],
    bodyFr: [
      "La chambre fait douze mètres carrés. Un lit, un bureau, une fenêtre qui donne à l'ouest. Le soir, la lumière tombe à l'angle exact qui fait tout ressembler à un tableau de Hopper.",
      "J'habite ici depuis deux ans et je n'ai toujours pas décidé si j'aime ou si je déteste cette ville.",
      "Paris exige quelque chose de vous. Il vous demande d'avoir des opinions, de vous habiller avec intention.",
      "Je peins le matin quand la lumière est plate et neutre. J'écris la nuit quand la ville s'est tue.",
      "L'art, c'est ce qui arrive quand on essaie de dire quelque chose que le langage n'arrête pas de rater.",
    ],
  },
  {
    slug: "painting-and-not-painting",
    title: "Painting and Not Painting",
    titleFr: "Peindre et ne pas peindre",
    date: "July 2024", readTime: 9, tag: "PAINTING",
    body: [
      "I spent three months in front of a blank canvas last year. Not blocked, watching. I needed to understand what the painting wanted before I could put anything on it.",
      "There is a Zen concept, wu wei, that I keep returning to: action through non-action.",
      "When I finally painted, it came quickly. The three months had been the real work.",
      "The hardest work in painting is invisible. It is the looking, the waiting, the refusal to begin prematurely.",
      "Francis Bacon used to destroy most of what he made. Not because it failed, but because the destruction was part of the process.",
      "I am still learning how not to grip too hard.",
    ],
    bodyFr: [
      "J'ai passé trois mois devant une toile blanche l'année dernière. Pas bloqué, en regardant.",
      "Il y a un concept zen, le wu wei, auquel je reviens sans cesse : l'action par la non-action.",
      "Quand j'ai finalement peint, c'est venu rapidement. Les trois mois avaient été le vrai travail.",
      "Le travail le plus difficile en peinture est invisible. C'est le regard, l'attente, le refus de commencer trop tôt.",
      "Francis Bacon détruisait la plupart de ce qu'il faisait. Non pas parce que ça avait échoué, mais parce que la destruction faisait partie du processus.",
      "J'apprends encore à ne pas tenir trop fort.",
    ],
  },
];

function PostCard({ post, lang, t }: { post: typeof POSTS[0]; lang: string; t: (k: string) => string }) {
  const [expanded, setExpanded] = useState(false);
  const title = lang === "FR" ? post.titleFr : post.title;
  const body = lang === "FR" ? post.bodyFr : post.body;

  return (
    <article style={{
      borderBottom: "1px solid #e4e2df",
      paddingBottom: "3rem",
      marginBottom: "3rem",
    }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
        <span style={{
          fontFamily: "var(--font-space), sans-serif",
          fontSize: "0.45rem",
          letterSpacing: "0.22em",
          color: "#aaa",
          border: "1px solid #ddd",
          padding: "0.2rem 0.5rem",
        }}>
          {post.tag}
        </span>
        <span style={{
          fontFamily: "var(--font-space), sans-serif",
          fontSize: "0.48rem",
          letterSpacing: "0.12em",
          color: "#ccc",
        }}>
          {post.date} · {post.readTime} {t("inspirations.readingTime")}
        </span>
      </div>

      <h2
        onClick={() => setExpanded(!expanded)}
        style={{
          fontFamily: "var(--font-space), sans-serif",
          fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
          fontWeight: 400,
          letterSpacing: "0.02em",
          color: "#1a1a1a",
          lineHeight: 1.3,
          marginBottom: "1.2rem",
          cursor: "pointer",
        }}
      >
        {title}
      </h2>

      <p style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "0.82rem",
        fontWeight: 400,
        color: "#555",
        lineHeight: 1.85,
        marginBottom: "1rem",
      }}>
        {body[0]}
      </p>

      <div style={{
        maxHeight: expanded ? "9999px" : "0",
        overflow: "hidden",
        transition: "max-height 0.5s ease",
      }}>
        {body.slice(1).map((para, i) => (
          <p key={i} style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "0.82rem",
            fontWeight: 400,
            color: "#555",
            lineHeight: 1.85,
            marginBottom: "1rem",
          }}>
            {para}
          </p>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "var(--font-space), sans-serif",
          fontSize: "0.48rem",
          letterSpacing: "0.2em",
          color: "#ccc",
          textTransform: "uppercase",
          padding: 0,
          marginTop: "0.3rem",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#1a1a1a")}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#ccc")}
      >
        {expanded ? "↑ collapse" : `${t("readMore")} →`}
      </button>
    </article>
  );
}

export default function InspirationsPage() {
  const { lang, t } = useLang();
  return (
    <SubpageLayout title={t("page.inspirations.title")}>
      <div style={{ maxWidth: "620px" }}>
        {POSTS.map((post) => (
          <PostCard key={post.slug} post={post} lang={lang} t={t} />
        ))}
      </div>
    </SubpageLayout>
  );
}
