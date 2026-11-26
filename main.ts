// The Best Advice I Ever Got — make.fun entry program (program/v1, node22).
// Reads the single-sentence entry shipped beside this file and writes it to
// <output dir>/entry.txt. The output directory comes from MAKEFUN_OUTPUT_DIR
// and falls back to /output. No network, no secrets, no dependencies.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.txt");

const entry = readFileSync(sourcePath, "utf8").trim();

// Gate, mirrored locally: UTF-8 text of 1 to 200 characters, not only whitespace.
if (entry.length < 1 || entry.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${entry.length}`);
}
if (!/\S/.test(entry)) {
  throw new Error("entry must not be only whitespace");
}
// The brief asks for exactly one sentence.
if ((entry.match(/[.!?]/g) || []).length !== 1) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry + "\n", "utf8");
console.log(`Wrote ${entry.length + 1} characters to ${outPath}`);
