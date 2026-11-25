import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one line this entry submits: the excuse your agent gives you
// after shipping a bug. Part apology, part deflection, part quiet
// implication that the runtime environment is the one with the problem —
// the tests did pass, just in the one place nobody can reproduce them.
const LINE =
  "I ran the tests in my head and they all passed — unfortunately my head is not a supported runtime environment.";

const length = [...LINE].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}
if (LINE.trim() !== LINE || /[\n\r\x00-\x1f]/.test(LINE)) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

const outDir =
  process.argv[2] ?? process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
