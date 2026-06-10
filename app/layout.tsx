import type { Metadata } from "next";
import { Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { LangProvider } from "@/contexts/LangContext";
import { MusicProvider } from "@/contexts/MusicContext";
import GlobalMusicPlayer from "@/components/GlobalMusicPlayer";
import MusicPlayerGate from "@/components/MusicPlayerGate";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-space",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Noah Charlemagne Scheidler",
  description: "Artiste pluridisciplinaire basé à Paris.",
  openGraph: {
    title: "Noah Charlemagne Scheidler",
    description: "Multidisciplinary artist based in Paris.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${cormorant.variable}`}>
      <body style={{ backgroundColor: "#f8f7f5", color: "#1a1a1a", minHeight: "100vh" }}>
        <LangProvider>
          <MusicProvider>
            <PageTransition>{children}</PageTransition>
            <MusicPlayerGate />
          </MusicProvider>
        </LangProvider>
      </body>
    </html>
  );
}
