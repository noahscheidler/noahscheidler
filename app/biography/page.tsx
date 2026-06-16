"use client";

import SubpageLayout from "@/components/SubpageLayout";
import { useLang } from "@/contexts/LangContext";

const BIO = {
  FR: {
    paragraphs: [
      "Noah Charlemagne Scheidler est un artiste pluridisciplinaire français né en Bretagne, dans un village proche du Golfe du Morbihan. À seize ans, il s'installe à Paris, où il vit et crée encore aujourd'hui.",
      "Son travail circule librement entre la photographie argentique, l'écriture, la musique, la peinture, le dessin et la vidéo. Plutôt que de séparer les disciplines, il les considère comme différents langages au service d'un même élan : transformer les émotions, les souvenirs, les rêves et les expériences vécues en matière, en images, en sons ou en mots.",
      "Il écrit des poèmes et des récits, chante, joue de la guitare, peint, photographie et filme. Certaines idées deviennent des chansons, d'autres des photographies, des dessins, des films ou des pages. Créer est moins un choix qu'une nécessité, une manière de comprendre ce qui le traverse et de donner une forme à ce qui resterait autrement invisible.",
      "La photographie occupe une place centrale dans sa pratique. Travaillant exclusivement en argentique, il est attiré par le grain, l'imperfection, la lumière et l'imprévisibilité propres à ce médium. Il est fasciné par le mouvement, les gestes, les expressions fugitives et ces instants qui n'existent qu'une fraction de seconde avant de disparaître.",
      "Son travail explore l'amour, la mémoire, la spiritualité, le désir, la solitude et les transformations silencieuses qui façonnent une existence. Qu'il s'agisse d'une photographie, d'une chanson, d'une peinture ou d'un texte, il cherche avant tout à créer des œuvres sincères, capables de faire résonner une émotion, un souvenir ou une part intime de ceux qui les rencontrent.",
    ],
    info: [
      { label: "Âge", text: "22 ans" },
      { label: "Basé à", text: "Paris" },
      { label: "Instagram", text: "@noahcharlemagne", href: "https://instagram.com/noahcharlemagne" },
      { label: "Contact", text: "noahcharlemagnescheidler@gmail.com", href: "mailto:noahcharlemagnescheidler@gmail.com" },
    ],
  },
  EN: {
    paragraphs: [
      "Noah Charlemagne Scheidler is a French multidisciplinary artist born in Brittany, in a village near the Gulf of Morbihan. At sixteen, he moved to Paris, where he still lives and creates today.",
      "His work moves freely between analog photography, writing, music, painting, drawing and video. Rather than separating disciplines, he sees them as different languages serving the same impulse: transforming emotions, memories, dreams and lived experiences into matter, images, sounds and words.",
      "He writes poems and stories, sings, plays guitar, paints, photographs and films. Some ideas become songs, others become photographs, drawings, films or pages. Creating is less a choice than a necessity, a way of understanding what moves through him and giving form to what would otherwise remain invisible.",
      "Photography occupies a central place in his practice. Working exclusively with analog film, he is drawn to its grain, imperfections, light and unpredictability. He is fascinated by movement, gestures, fleeting expressions and those moments that exist for only a fraction of a second before disappearing.",
      "His work explores love, memory, spirituality, desire, solitude and the silent transformations that shape a life. Whether through a photograph, a song, a painting or a text, he seeks above all to create sincere works capable of awakening an emotion, a memory or an intimate part of those who encounter them.",
    ],
    info: [
      { label: "Age", text: "22 years old" },
      { label: "Based", text: "Paris" },
      { label: "Instagram", text: "@noahcharlemagne", href: "https://instagram.com/noahcharlemagne" },
      { label: "Contact", text: "noahcharlemagnescheidler@gmail.com", href: "mailto:noahcharlemagnescheidler@gmail.com" },
    ],
  },
};

export default function BiographyPage() {
  const { lang } = useLang();
  const bio = BIO[lang];

  return (
    <SubpageLayout title={lang === "FR" ? "Biographie" : "Biography"}>
      <div style={{ maxWidth: "580px" }}>

        {/* Bio paragraphs */}
        {bio.paragraphs.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "0.85rem",
              lineHeight: 1.9,
              color: "#333",
              marginBottom: "1.5rem",
              letterSpacing: "0.01em",
            }}
          >
            {para}
          </p>
        ))}

        {/* Info grid */}
        <div style={{ marginTop: "2.5rem" }}>
          {bio.info.map((item, i) => (
            <div
              key={i}
              className="bio-info-row"
              style={{
                display: "grid",
                gridTemplateColumns: "110px 1fr",
                gap: "0 2rem",
                paddingTop: "1.4rem",
                paddingBottom: "1.4rem",
                borderTop: "1px solid #e4e2df",
              }}
            >
              <span style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: "0.48rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#bbb",
                paddingTop: "0.2rem",
              }}>
                {item.label}
              </span>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "0.82rem",
                    lineHeight: 1.8,
                    color: "#444",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#1a1a1a")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#444")}
                >
                  {item.text}
                </a>
              ) : (
                <p style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "0.82rem",
                  lineHeight: 1.8,
                  color: "#444",
                }}>
                  {item.text}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </SubpageLayout>
  );
}
