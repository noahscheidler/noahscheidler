"use client";

import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { FILMS } from "@/data/films";

type Mode         = "images" | "projets" | "dessins";
type SessionOrders = Record<string, string[]>;

const TAB: React.CSSProperties = {
  flex:          1,
  padding:       "0.45rem 0",
  border:        "none",
  cursor:        "pointer",
  fontFamily:    "var(--font-space), sans-serif",
  fontSize:      "0.42rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  transition:    "all 0.2s ease",
};

const ADMIN_PASSWORD = "Lorenna33!Louna22!";

const LS_DRAWINGS_KEY = "ncs-drawings-order";
const DEFAULT_DRAWINGS = [
  "IMG_2737.jpg","IMG_2786.JPG","IMG_8253.jpg","IMG_8239.jpg","IMG_2792.jpg",
  "IMG_8234.jpg","IMG_2219.JPG","IMG_2795.jpg","IMG_8232.jpg","IMG_2784.jpg",
  "IMG_8227.jpg","IMG_8286.jpg","IMG_2808.jpg","IMG_2812.jpg","IMG_2810.jpg",
  "IMG_8233.JPG","IMG_2807.JPG","IMG_8231.jpg","IMG_2791.jpg","IMG_2816.JPG",
  "IMG_2803.jpg","IMG_8247.jpg","IMG_8230.jpg","IMG_8246.jpg","IMG_8243.JPG",
  "IMG_2789.jpg","IMG_2788.jpg","IMG_8248.jpg","IMG_2201.jpg","IMG_8250.jpg",
  "IMG_2802.jpg","IMG_8240.JPG","IMG_8279.jpg",
];

export default function AdminPage() {
  /* ── auth ─────────────────────────────────────── */
  const [auth,     setAuth]     = useState(false);
  const [pwInput,  setPwInput]  = useState("");
  const [pwError,  setPwError]  = useState(false);

  if (!auth) {
    return (
      <div style={{
        minHeight:      "100vh",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        backgroundColor: "#f8f7f5",
      }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pwInput === ADMIN_PASSWORD) { setAuth(true); setPwError(false); }
            else { setPwError(true); setPwInput(""); }
          }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
        >
          <p style={{
            fontFamily:    "var(--font-space), sans-serif",
            fontSize:      "0.45rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color:         "#b0aca7",
            marginBottom:  "0.5rem",
          }}>Admin</p>
          <input
            type="password"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            autoFocus
            placeholder="Mot de passe"
            style={{
              fontFamily:    "var(--font-space), sans-serif",
              fontSize:      "0.55rem",
              letterSpacing: "0.08em",
              border:        "1px solid #d8d4cf",
              borderColor:   pwError ? "#cc0000" : "#d8d4cf",
              background:    "#ffffff",
              padding:       "0.6rem 1rem",
              outline:       "none",
              width:         "220px",
              color:         "#1a1a1a",
            }}
          />
          {pwError && (
            <p style={{
              fontFamily:    "var(--font-space), sans-serif",
              fontSize:      "0.42rem",
              letterSpacing: "0.1em",
              color:         "#cc0000",
            }}>Mot de passe incorrect</p>
          )}
          <button type="submit" style={{
            fontFamily:    "var(--font-space), sans-serif",
            fontSize:      "0.42rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background:    "#1a1a1a",
            color:         "#ffffff",
            border:        "none",
            padding:       "0.55rem 1.4rem",
            cursor:        "pointer",
          }}>Entrer</button>
        </form>
      </div>
    );
  }

  /* ── mode ─────────────────────────────────────── */
  const [mode, setMode] = useState<Mode>("images");

  /* ── images mode state ────────────────────────── */
  const [selected, setSelected]   = useState(FILMS[0].slug);
  const [session,  setSession]    = useState<SessionOrders>({});

  /* ── projects mode state ──────────────────────── */
  const [projOrder, setProjOrder] = useState<string[]>(FILMS.map((f) => f.slug));
  const [projModified, setProjModified] = useState(false);

  /* ── dessins mode state ───────────────────────── */
  const [dessinsOrder, setDessinsOrder] = useState<string[]>(DEFAULT_DRAWINGS);
  const [dessinsModified, setDessinsModified] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem(LS_DRAWINGS_KEY);
      if (s) setDessinsOrder(JSON.parse(s));
    } catch {}
  }, []);

  const saveDessins = () => {
    localStorage.setItem(LS_DRAWINGS_KEY, JSON.stringify(dessinsOrder));
    setDessinsModified(false);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2500);
  };

  /* ── shared save status ───────────────────────── */
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  /* helpers */
  const film   = FILMS.find((f) => f.slug === selected)!;
  const images = session[selected] ?? film.images;

  const hasChanges = Object.keys(session).length > 0 || projModified || dessinsModified;

  /* ── remove one image from the current project ── */
  const removeImage = (img: string) => {
    const current = session[selected] ?? film.images;
    setSession((s) => ({ ...s, [selected]: current.filter((i) => i !== img) }));
    setStatus("idle");
  };

  /* ── save everything ──────────────────────────── */
  const saveAll = async () => {
    setStatus("saving");

    // Dessins order
    if (dessinsModified) {
      saveDessins();
      return;
    }

    // Image orders
    if (Object.keys(session).length > 0) {
      const prev = await fetch("/api/film-order").then((r) => r.json()) as SessionOrders;
      await fetch("/api/film-order", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...prev, ...session }),
      });
    }

    // Project order
    if (projModified) {
      await fetch("/api/film-project-order", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(projOrder),
      });
      setProjModified(false);
    }

    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2500);
  };

  /* ── header shared ────────────────────────────── */
  const Header = (
    <div style={{
      padding:         "1rem 1.5rem",
      borderBottom:    "1px solid #e8e5e1",
      display:         "flex",
      justifyContent:  "space-between",
      alignItems:      "center",
      flexShrink:      0,
      backgroundColor: "#f8f7f5",
    }}>
      <div>
        {mode === "images" ? (
          <>
            <p style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.3rem",
              lineHeight: 1,
              marginBottom: "0.35rem",
            }}>
              {film.title}
            </p>
            <p style={{ fontSize: "0.4rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#9e9a95" }}>
              {film.year} · {images.length} photos · glisser pour réorganiser
            </p>
          </>
        ) : mode === "projets" ? (
          <>
            <p style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.3rem",
              lineHeight: 1,
              marginBottom: "0.35rem",
            }}>
              Ordre des projets
            </p>
            <p style={{ fontSize: "0.4rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#9e9a95" }}>
              {FILMS.length} projets · glisser pour réorganiser
            </p>
          </>
        ) : (
          <>
            <p style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.3rem",
              lineHeight: 1,
              marginBottom: "0.35rem",
            }}>
              Ordre des dessins
            </p>
            <p style={{ fontSize: "0.4rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#9e9a95" }}>
              {dessinsOrder.length} dessins · glisser pour réorganiser
            </p>
          </>
        )}
      </div>

      <button
        onClick={saveAll}
        disabled={status === "saving" || !hasChanges}
        style={{
          fontFamily:    "var(--font-space), sans-serif",
          fontSize:      "0.45rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          padding:       "0.55rem 1.4rem",
          cursor:        (status === "saving" || !hasChanges) ? "default" : "pointer",
          border:        "1px solid #1a1a1a",
          background:    status === "saved" ? "#1a1a1a" : "#f8f7f5",
          color:         status === "saved" ? "#f8f7f5" : !hasChanges ? "#c8c4bf" : "#1a1a1a",
          borderColor:   !hasChanges ? "#e8e5e1" : "#1a1a1a",
          transition:    "all 0.25s ease",
        }}
      >
        {status === "saved" ? "Enregistré ✓" : status === "saving" ? "…" : "Enregistrer"}
      </button>
    </div>
  );

  /* ════════════════════════════════════════════════ */
  return (
    <div style={{
      display:         "flex",
      height:          "100vh",
      backgroundColor: "#f8f7f5",
      fontFamily:      "var(--font-space), sans-serif",
      overflow:        "hidden",
      color:           "#1a1a1a",
    }}>

      {/* ── SIDEBAR ─────────────────────────────── */}
      <aside style={{
        width:           "210px",
        flexShrink:      0,
        borderRight:     "1px solid #e8e5e1",
        display:         "flex",
        flexDirection:   "column",
        overflow:        "hidden",
        backgroundColor: "#f8f7f5",
      }}>
        {/* Tab toggle */}
        <div style={{ display: "flex", borderBottom: "1px solid #e8e5e1", flexShrink: 0 }}>
          <button
            onClick={() => setMode("images")}
            style={{ ...TAB, background: mode === "images" ? "#1a1a1a" : "transparent", color: mode === "images" ? "#f8f7f5" : "#9e9a95" }}
          >
            Images
          </button>
          <button
            onClick={() => setMode("projets")}
            style={{ ...TAB, background: mode === "projets" ? "#1a1a1a" : "transparent", color: mode === "projets" ? "#f8f7f5" : "#9e9a95", borderLeft: "1px solid #e8e5e1" }}
          >
            Projets
          </button>
          <button
            onClick={() => setMode("dessins")}
            style={{ ...TAB, background: mode === "dessins" ? "#1a1a1a" : "transparent", color: mode === "dessins" ? "#f8f7f5" : "#9e9a95", borderLeft: "1px solid #e8e5e1" }}
          >
            Dessins
          </button>
        </div>

        {/* Project list — only shown in images mode */}
        {mode === "images" && (
          <nav style={{ overflowY: "auto", flex: 1 }}>
            {FILMS.map((f) => {
              const modified = Boolean(session[f.slug]);
              return (
                <button
                  key={f.slug}
                  onClick={() => setSelected(f.slug)}
                  style={{
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "space-between",
                    width:          "100%",
                    textAlign:      "left",
                    padding:        "0.55rem 1rem",
                    background:     selected === f.slug ? "#ede9e4" : "transparent",
                    border:         "none",
                    borderBottom:   "1px solid #f0eeeb",
                    cursor:         "pointer",
                    fontFamily:     "var(--font-cormorant), serif",
                    fontStyle:      "italic",
                    fontSize:       "0.82rem",
                    color:          selected === f.slug ? "#1a1a1a" : "#888",
                    transition:     "background 0.15s ease, color 0.15s ease",
                  }}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {f.title}
                  </span>
                  {modified && (
                    <span style={{
                      width: "5px", height: "5px",
                      borderRadius: "50%",
                      background: "#1a1a1a",
                      flexShrink: 0,
                      marginLeft: "0.5rem",
                    }} />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* In projets mode, sidebar just shows a hint */}
        {mode === "projets" && (
          <div style={{ padding: "1rem", color: "#b0aca7", fontSize: "0.42rem", letterSpacing: "0.12em", lineHeight: 1.7 }}>
            Glisse les projets pour changer leur ordre d&apos;apparition sur le site.
            {projModified && (
              <p style={{ marginTop: "0.8rem", color: "#1a1a1a" }}>
                ● Modifications non sauvegardées
              </p>
            )}
          </div>
        )}

        {mode === "dessins" && (
          <div style={{ padding: "1rem", color: "#b0aca7", fontSize: "0.42rem", letterSpacing: "0.12em", lineHeight: 1.7 }}>
            Glisse les dessins pour changer leur ordre dans la galerie.
            {dessinsModified && (
              <p style={{ marginTop: "0.8rem", color: "#1a1a1a" }}>
                ● Modifications non sauvegardées
              </p>
            )}
          </div>
        )}
      </aside>

      {/* ── MAIN ────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {Header}

        {/* ── IMAGES MODE ── */}
        {mode === "images" && (
          <div style={{ overflowY: "auto", flex: 1, padding: "1rem 1.5rem" }}>
            <Reorder.Group
              axis="y"
              values={images}
              onReorder={(next) => {
                setSession((s) => ({ ...s, [selected]: next }));
                setStatus("idle");
              }}
              style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}
            >
              {images.map((img, i) => (
                <Reorder.Item
                  key={img}
                  value={img}
                  whileDrag={{ scale: 1.01, boxShadow: "0 6px 20px rgba(0,0,0,0.10)", zIndex: 10 }}
                  style={{ cursor: "grab" }}
                >
                  <div style={{
                    display:    "flex",
                    alignItems: "center",
                    gap:        "0.75rem",
                    padding:    "0.3rem 0.6rem 0.3rem 0.5rem",
                    background: "#fff",
                    border:     "1px solid #e8e5e1",
                    userSelect: "none",
                  }}>
                    <span style={{ color: "#c8c4bf", fontSize: "1rem", lineHeight: 1, flexShrink: 0 }}>⠿</span>
                    <span style={{
                      fontSize: "0.4rem", letterSpacing: "0.1em",
                      color: i === 0 ? "#1a1a1a" : "#c8c4bf",
                      fontWeight: i === 0 ? 500 : 300,
                      minWidth: "1.6rem", textAlign: "right", flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/films/${film.slug}/${img}`}
                      alt={img}
                      draggable={false}
                      style={{ width: "100px", height: "68px", objectFit: "cover", display: "block", flexShrink: 0, backgroundColor: "#ede9e4" }}
                    />
                    <span style={{ fontSize: "0.42rem", letterSpacing: "0.06em", color: "#999", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                      {img}
                    </span>
                    {i === 0 && (
                      <span style={{ fontSize: "0.38rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#f8f7f5", background: "#1a1a1a", padding: "0.15rem 0.5rem", flexShrink: 0 }}>
                        1ère
                      </span>
                    )}

                    {/* Trash button */}
                    <button
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => removeImage(img)}
                      title="Retirer du projet"
                      style={{
                        background:  "none",
                        border:      "none",
                        cursor:      "pointer",
                        color:       "#d0ccc8",
                        padding:     "0.25rem 0.3rem",
                        flexShrink:  0,
                        lineHeight:  1,
                        display:     "flex",
                        alignItems:  "center",
                        transition:  "color 0.2s ease",
                        marginLeft:  "auto",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#cc3333")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#d0ccc8")}
                    >
                      <svg width="11" height="12" viewBox="0 0 11 12" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 3h9M3.5 3V2h4v1M2.5 3l.6 7.5h4.8L8.5 3M4.5 5.5v3.5M6.5 5.5v3.5"/>
                      </svg>
                    </button>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        )}

        {/* ── DESSINS MODE ── */}
        {mode === "dessins" && (
          <div style={{ overflowY: "auto", flex: 1, padding: "1rem 1.5rem" }}>
            <Reorder.Group
              axis="y"
              values={dessinsOrder}
              onReorder={(next) => { setDessinsOrder(next); setDessinsModified(true); setStatus("idle"); }}
              style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}
            >
              {dessinsOrder.map((file, i) => (
                <Reorder.Item
                  key={file}
                  value={file}
                  whileDrag={{ scale: 1.01, boxShadow: "0 6px 20px rgba(0,0,0,0.10)", zIndex: 10 }}
                  style={{ cursor: "grab" }}
                >
                  <div style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.3rem 0.6rem 0.3rem 0.5rem",
                    background: "#fff", border: "1px solid #e8e5e1", userSelect: "none",
                  }}>
                    <span style={{ color: "#c8c4bf", fontSize: "1rem", lineHeight: 1, flexShrink: 0 }}>⠿</span>
                    <span style={{
                      fontSize: "0.4rem", letterSpacing: "0.1em",
                      color: "#c8c4bf", minWidth: "1.6rem", textAlign: "right", flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/drawings/les-inconnus/${file}`}
                      alt={file}
                      draggable={false}
                      style={{ width: "60px", height: "60px", objectFit: "cover", display: "block", flexShrink: 0, backgroundColor: "#ede9e4" }}
                    />
                    <span style={{ fontSize: "0.42rem", letterSpacing: "0.06em", color: "#999", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                      {file}
                    </span>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        )}

        {/* ── PROJETS MODE ── */}
        {mode === "projets" && (
          <div style={{ overflowY: "auto", flex: 1, padding: "1rem 1.5rem" }}>
            <Reorder.Group
              axis="y"
              values={projOrder}
              onReorder={(next) => { setProjOrder(next); setProjModified(true); setStatus("idle"); }}
              style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}
            >
              {projOrder.map((slug, i) => {
                const f = FILMS.find((x) => x.slug === slug)!;
                return (
                  <Reorder.Item
                    key={slug}
                    value={slug}
                    whileDrag={{ scale: 1.01, boxShadow: "0 6px 20px rgba(0,0,0,0.10)", zIndex: 10 }}
                    style={{ cursor: "grab" }}
                  >
                    <div style={{
                      display:    "flex",
                      alignItems: "center",
                      gap:        "0.75rem",
                      padding:    "0.3rem 0.6rem 0.3rem 0.5rem",
                      background: "#fff",
                      border:     "1px solid #e8e5e1",
                      userSelect: "none",
                    }}>
                      <span style={{ color: "#c8c4bf", fontSize: "1rem", lineHeight: 1, flexShrink: 0 }}>⠿</span>
                      <span style={{
                        fontSize: "0.4rem", letterSpacing: "0.1em",
                        color: i === 0 ? "#1a1a1a" : "#c8c4bf",
                        fontWeight: i === 0 ? 500 : 300,
                        minWidth: "1.6rem", textAlign: "right", flexShrink: 0,
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/films/${slug}/${f.images[0]}`}
                        alt={f.title}
                        draggable={false}
                        style={{ width: "100px", height: "68px", objectFit: "cover", display: "block", flexShrink: 0, backgroundColor: "#ede9e4" }}
                      />
                      <div style={{ flex: 1, overflow: "hidden" }}>
                        <p style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontStyle: "italic",
                          fontSize: "0.9rem",
                          color: "#1a1a1a",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                          {f.title}
                        </p>
                        <p style={{ fontSize: "0.38rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#b0aca7", marginTop: "0.15rem" }}>
                          {f.year} · {f.images.length} photos
                        </p>
                      </div>
                    </div>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
          </div>
        )}
      </div>
    </div>
  );
}
