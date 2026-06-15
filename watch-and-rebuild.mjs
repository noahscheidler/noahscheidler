#!/usr/bin/env node
/**
 * Surveille les fichiers JSON de l'admin.
 * Dès qu'un changement est détecté → rebuild Next.js + redémarre le serveur sur le port 4000.
 */

import { watch } from "fs";
import { execSync, spawn } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const FILES_TO_WATCH = [
  resolve(__dirname, "data/film-orders.json"),
  resolve(__dirname, "data/film-project-order.json"),
];

const PORT = 4000;
let serverProcess = null;
let rebuildTimer  = null;
let rebuilding    = false;

/* ── Démarrer le serveur ──────────────────────────── */
function startServer() {
  if (serverProcess) {
    serverProcess.kill("SIGKILL");
    serverProcess = null;
  }
  console.log(`\n▶  Démarrage du serveur sur le port ${PORT}…`);
  serverProcess = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd:   __dirname,
    stdio: "inherit",
    env:   { ...process.env, PORT: String(PORT) },
  });
  serverProcess.on("exit", (code) => {
    if (code !== null && code !== 0 && !rebuilding) {
      console.error(`⚠  Le serveur s'est arrêté (code ${code})`);
    }
  });
}

/* ── Rebuild + redémarrage ────────────────────────── */
function rebuild() {
  if (rebuilding) return;
  rebuilding = true;
  console.log("\n🔄  Changement détecté → rebuild en cours…");
  try {
    execSync("npx next build", { cwd: __dirname, stdio: "inherit" });
    console.log("✅  Build terminé.");
  } catch (e) {
    console.error("❌  Erreur de build :", e.message);
    rebuilding = false;
    return;
  }
  rebuilding = false;
  startServer();
}

/* ── Watcher ──────────────────────────────────────── */
for (const file of FILES_TO_WATCH) {
  watch(file, () => {
    // Debounce 800ms pour éviter les doubles déclenchements
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(rebuild, 800);
  });
  console.log(`👁  Surveillance de : ${file}`);
}

/* ── Premier démarrage ────────────────────────────── */
console.log("\n🚀  Premier démarrage…");
startServer();

/* ── Arrêt propre ─────────────────────────────────── */
process.on("SIGINT",  () => { serverProcess?.kill(); process.exit(0); });
process.on("SIGTERM", () => { serverProcess?.kill(); process.exit(0); });
