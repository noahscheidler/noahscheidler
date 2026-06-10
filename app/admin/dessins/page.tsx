"use client";
import { useState, useEffect, useRef } from "react";

const DEFAULT_DRAWINGS = [
  "IMG_2737.jpg","IMG_2786.JPG","IMG_8253.jpg","IMG_8239.jpg","IMG_2792.jpg",
  "IMG_8234.jpg","IMG_2219.JPG","IMG_2795.jpg","IMG_8232.jpg","IMG_2784.jpg",
  "IMG_8227.jpg","IMG_8286.jpg","IMG_2808.jpg","IMG_2812.jpg","IMG_2810.jpg",
  "IMG_8233.JPG","IMG_2807.JPG","IMG_8231.jpg","IMG_2791.jpg","IMG_2816.JPG",
  "IMG_2803.jpg","IMG_8247.jpg","IMG_8230.jpg","IMG_8246.jpg","IMG_8243.JPG",
  "IMG_2789.jpg","IMG_2788.jpg","IMG_8248.jpg","IMG_2201.jpg","IMG_8250.jpg",
  "IMG_2802.jpg","IMG_8240.JPG","IMG_8279.jpg",
];
const DEFAULT_PAINTINGS = [
  "doux-regard.png","toi-et-moi.png","pilote.jpg","la-dance.png",
  "la-femme.png","prolixe.png","le-bucher.jpg","self-portrait.png",
  "stoique.png","l-artiste.png",
];

const KEY_D = "ncs-drawings-order";
const KEY_P = "ncs-paintings-order";

type Section = "dessins" | "peintures";

function DragList({ items, folder, onReorder }: {
  items: string[];
  folder: string;
  onReorder: (next: string[]) => void;
}) {
  const [dragging, setDragging] = useState<number | null>(null);
  const dragIdx = useRef<number | null>(null);

  const onDragStart = (i: number) => { dragIdx.current = i; setDragging(i); };
  const onDragEnter = (i: number) => {
    if (dragIdx.current === null || dragIdx.current === i) return;
    const next = [...items];
    const [item] = next.splice(dragIdx.current, 1);
    next.splice(i, 0, item);
    dragIdx.current = i;
    onReorder(next);
  };
  const onDragEnd = () => { dragIdx.current = null; setDragging(null); };

  return (
    <>
      {items.map((file, i) => (
        <div
          key={file}
          draggable
          onDragStart={() => onDragStart(i)}
          onDragEnter={() => onDragEnter(i)}
          onDragOver={e => e.preventDefault()}
          onDragEnd={onDragEnd}
          style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "0.4rem", padding: "0.4rem 0.5rem",
            background: "#fff", border: "1px solid #e8e5e1", borderRadius: 4,
            cursor: "grab", opacity: dragging === i ? 0.35 : 1,
            transition: "opacity 0.15s", userSelect: "none",
          }}
        >
          <span style={{ color: "#ccc", fontSize: "1.1rem", flexShrink: 0, lineHeight: 1 }}>⠿</span>
          <span style={{ color: "#bbb", fontSize: "0.72rem", width: 22, textAlign: "right", flexShrink: 0 }}>{i + 1}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/${folder}/${file}`} alt="" draggable={false}
            style={{ width: 56, height: 56, objectFit: "cover", background: "#f0eeeb", flexShrink: 0 }} />
          <span style={{ flex: 1, fontSize: "0.72rem", color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {file}
          </span>
        </div>
      ))}
    </>
  );
}

export default function DessinAdmin() {
  const [section, setSection]     = useState<Section>("dessins");
  const [drawings, setDrawings]   = useState(DEFAULT_DRAWINGS);
  const [paintings, setPaintings] = useState(DEFAULT_PAINTINGS);
  const [saved, setSaved]         = useState(false);

  useEffect(() => {
    try {
      const d = localStorage.getItem(KEY_D);
      if (d) setDrawings(JSON.parse(d));
      const p = localStorage.getItem(KEY_P);
      if (p) setPaintings(JSON.parse(p));
    } catch {}
  }, []);

  const save = () => {
    localStorage.setItem(KEY_D, JSON.stringify(drawings));
    localStorage.setItem(KEY_P, JSON.stringify(paintings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 540, margin: "0 auto", fontFamily: "sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <h1 style={{ fontSize: "1rem", fontWeight: 600, color: "#1a1a1a" }}>Ordre des œuvres</h1>
        <button onClick={save} style={{
          background: saved ? "#4caf50" : "#1a1a1a", color: "#fff",
          border: "none", padding: "0.4rem 1.2rem", borderRadius: 4,
          cursor: "pointer", fontSize: "0.8rem",
        }}>
          {saved ? "Sauvegardé ✓" : "Sauvegarder"}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: "1.25rem", border: "1px solid #e8e5e1", borderRadius: 4, overflow: "hidden" }}>
        {(["dessins", "peintures"] as Section[]).map(s => (
          <button key={s} onClick={() => setSection(s)} style={{
            flex: 1, padding: "0.5rem", border: "none", cursor: "pointer",
            background: section === s ? "#1a1a1a" : "#fff",
            color: section === s ? "#fff" : "#888",
            fontSize: "0.8rem", fontFamily: "sans-serif",
            borderRight: s === "dessins" ? "1px solid #e8e5e1" : "none",
          }}>
            {s === "dessins" ? "Dessins" : "Peintures"}
          </button>
        ))}
      </div>

      <p style={{ fontSize: "0.72rem", color: "#aaa", marginBottom: "1rem" }}>
        Glisse pour réordonner · Sauvegarder pour appliquer
      </p>

      {section === "dessins" && (
        <DragList items={drawings} folder="drawings/les-inconnus" onReorder={setDrawings} />
      )}
      {section === "peintures" && (
        <DragList items={paintings} folder="paintings" onReorder={setPaintings} />
      )}

      <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
        <button onClick={save} style={{
          background: saved ? "#4caf50" : "#1a1a1a", color: "#fff",
          border: "none", padding: "0.5rem 1.5rem", borderRadius: 4,
          cursor: "pointer", fontSize: "0.8rem",
        }}>
          {saved ? "Sauvegardé ✓" : "Sauvegarder l'ordre"}
        </button>
      </div>
    </div>
  );
}
