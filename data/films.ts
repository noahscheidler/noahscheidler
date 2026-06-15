import savedOrders       from "./film-orders.json";
import savedProjectOrder from "./film-project-order.json";

const CUSTOM_ORDERS       = savedOrders       as Record<string, string[]>;
const CUSTOM_PROJECT_ORDER = savedProjectOrder as string[];

export interface Film {
  slug: string;
  title: string;
  year: string;
  description: string;
  descriptionFr: string;
  images: string[];
}

const BASE_FILMS: Film[] = [
  {
    slug: "amour-diistant",
    title: "AMOUR DISTANT",
    year: "2024",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 11 }, (_, i) => `amour-diistant-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "au-paradis",
    title: "AU PARADIS",
    year: "2024",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 13 }, (_, i) => `au-paradis-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "chambre-rock",
    title: "CHAMBRE ROCK",
    year: "2023",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 18 }, (_, i) => `chambre-rock-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "chez-emma",
    title: "CHEZ EMMA",
    year: "2023",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 9 }, (_, i) => `chez-emma-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "hante-moi",
    title: "HANTE MOI",
    year: "2023",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 5 }, (_, i) => `hante-moi-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "kanye-west",
    title: "KANYE WEST",
    year: "2022",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 12 }, (_, i) => `kanye-west-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "los-angeles-through-my-lens",
    title: "LOS ANGELES THROUGH MY LENS",
    year: "2022",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 25 }, (_, i) => `los-angeles-through-my-lens-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "la-muse",
    title: "LA MUSE",
    year: "2026",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 6 }, (_, i) => `la-muse-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "la-veuve",
    title: "LA VEUVE",
    year: "2026",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 6 }, (_, i) => `la-veuve-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "mariage-mort",
    title: "MARIAGE MORT",
    year: "2023",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 10 }, (_, i) => `mariage-mort-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "miroir-de-l-ame",
    title: "MIROIR DE L'AME",
    year: "2024",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 16 }, (_, i) => `miroir-de-l-ame-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "pierre-bourne-backstage",
    title: "PIERRE BOURNE BACKSTAGE",
    year: "2022",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 22 }, (_, i) => `pierre-bourne-backstage-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "saint-esprit",
    title: "SAINT ESPRIT",
    year: "2023",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 14 }, (_, i) => `saint-esprit-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "une-flle-oublie",
    title: "UNE FILLE OUBLIE",
    year: "2024",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 7 }, (_, i) => `une-flle-oublie-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "untilted",
    title: "UNTITLED",
    year: "2024",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 36 }, (_, i) => `untilted-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "voyage-d-une-larme",
    title: "VOYAGE D'UNE LARME",
    year: "2023",
    description: "",
    descriptionFr: "",
    images: Array.from({ length: 37 }, (_, i) => `voyage-d-une-larme-${String(i + 1).padStart(2, "0")}.jpg`),
  },
];

// Apply custom image orders
const FILMS_WITH_IMAGES: Film[] = BASE_FILMS.map((f) => ({
  ...f,
  images: CUSTOM_ORDERS[f.slug] ?? f.images,
}));

// Apply custom project order (if saved from /admin)
export const FILMS: Film[] = CUSTOM_PROJECT_ORDER.length > 0
  ? (CUSTOM_PROJECT_ORDER
      .map((slug) => FILMS_WITH_IMAGES.find((f) => f.slug === slug))
      .filter(Boolean) as Film[])
  : FILMS_WITH_IMAGES;

export function getFilm(slug: string): Film | undefined {
  return FILMS.find((f) => f.slug === slug);
}
