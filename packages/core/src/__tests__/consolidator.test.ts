import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ConsolidatorAgent } from "../agents/consolidator.js";
import { renderHookSnapshot } from "../utils/story-markdown.js";
import type { StoredHook } from "../state/memory-db.js";

describe("ConsolidatorAgent", () => {
  it("parses Chinese volume boundaries with full-width parentheses and chapter ranges", () => {
    const agent = new ConsolidatorAgent({
      client: {} as ConstructorParameters<typeof ConsolidatorAgent>[0]["client"],
      model: "test-model",
      projectRoot: "/tmp",
    });

    const outline = [
      "# Volume Outline",
      "",
      "### 第一卷：死而复生的实习期（1-20章）",
      "- 主角重返公司，卷入第一起异常事故",
      "",
      "### 第二卷：时间线上的猎手（21-60章）",
      "- 追查时间裂隙背后的操控者",
      "",
    ].join("\n");

    const boundaries = (agent as unknown as {
      parseVolumeBoundaries: (input: string) => Array<{ name: string; startCh: number; endCh: number }>;
    }).parseVolumeBoundaries(outline);

    expect(boundaries).toEqual([
      { name: "第一卷：死而复生的实习期", startCh: 1, endCh: 20 },
      { name: "第二卷：时间线上的猎手", startCh: 21, endCh: 60 },
    ]);
  });
});

// Russian-localization round 4, bug 3 regression: the promotion rerender
// used a CJK-only content heuristic, so a Russian ledger whose CURRENT rows
// only contain ASCII identifiers would be reclassified as English and the
// next write replaced its Russian headers with English ones. The fix is to
// pass the resolved book language explicitly; the heuristic remains as a
// last-resort fallback and now also detects Cyrillic.
describe("ConsolidatorAgent — Russian ledger language plumbing", () => {
  let bookDir: string;

  beforeEach(async () => {
    bookDir = await mkdtemp(join(tmpdir(), "inkos-consolid-ru-"));
    await mkdir(join(bookDir, "story"), { recursive: true });
  });

  afterEach(async () => {
    await rm(bookDir, { recursive: true, force: true });
  });

  it("keeps Russian ledger headers on promotion when bookLanguage is passed explicitly, even if the source ledger is all-ASCII", async () => {
    // Seed an ASCII-only ledger (no Cyrillic in any cell). The legacy
    // heuristic would have classified this as English. We pass the book
    // language explicitly, so the rerender must keep the Russian headers.
    const seeded: StoredHook[] = [
      {
        hookId: "H-debt",
        startChapter: 3,
        type: "promise",
        status: "open",
        lastAdvancedChapter: 5,
        expectedPayoff: "ch.15",
        payoffTiming: "near-term",
        notes: "ASCII-only on purpose",
        dependsOn: [],
        paysOffInArc: "vol.1",
        coreHook: false,
        promoted: false,
      },
    ];
    const ledgerPath = join(bookDir, "story", "pending_hooks.md");
    // Write the ledger using the English layout so the file genuinely has no
    // Russian or Chinese characters. The book is Russian; we must still
    // re-emit the Russian layout because the CALLER said so.
    await writeFile(ledgerPath, renderHookSnapshot(seeded, "en"), "utf-8");

    // chapter_summaries references H-debt in three chapters in the
    // hookActivity column → flips promoted=true and triggers the rerender.
    // We use the canonical token "hookActivity" so the column-index detector
    // in deriveAdvancedCountsFromSummaries finds the right column.
    await writeFile(
      join(bookDir, "story", "chapter_summaries.md"),
      [
        "| Chapter | Title | Characters | Key Events | State Changes | hookActivity | Mood | Chapter Type |",
        "| --- | --- | --- | --- | --- | --- | --- | --- |",
        "| 4 | A | Lina | E | S | H-debt advances | tense | beat |",
        "| 5 | B | Lina | E | S | H-debt advances | tense | beat |",
        "| 6 | C | Lina | E | S | H-debt advances | tense | beat |",
      ].join("\n"),
      "utf-8",
    );

    const agent = new ConsolidatorAgent({
      client: {} as ConstructorParameters<typeof ConsolidatorAgent>[0]["client"],
      model: "test-model",
      projectRoot: bookDir,
    });

    const result = await agent.consolidate(bookDir, "ru");
    expect(result.promotedHookCount).toBe(1);

    const next = await readFile(ledgerPath, "utf-8");
    // Russian headers from renderHookSnapshot — these are the canonical
    // tokens emitted only when language === "ru".
    expect(next).toContain("начальная глава");
    expect(next).toContain("повышен");
    // The "promoted=true" cell must be the Russian "да" (not "true" or "是").
    expect(next).toContain("| да |");
    // Sanity: no Chinese leakage and no English column headers.
    expect(next).not.toMatch(/[一-鿿]/);
    expect(next).not.toContain("start_chapter");
  });
});
