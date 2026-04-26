/**
 * Round-4 fix: EPUB metadata `lang` tag must be "ru" for Russian books.
 *
 * Russian books were getting `lang: "zh-CN"` in their .epub, breaking
 * screen readers, e-readers, and library catalogs.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const epubCalls: Array<{ options: { title: string; lang: string }; chapters: unknown }> = [];

vi.mock("epub-gen-memory", () => {
  class MockEPub {
    constructor(options: { title: string; lang: string }, chapters: unknown) {
      epubCalls.push({ options, chapters });
    }
    async genEpub(): Promise<Buffer> {
      return Buffer.from("mock-epub");
    }
  }
  return { EPub: MockEPub };
});

import { buildExportArtifact, type ExportStateLike } from "../interaction/export-artifact.js";

function makeState(bookDir: string, language: string): ExportStateLike {
  return {
    bookDir: () => bookDir,
    loadBookConfig: async () => ({ title: "Тестовая книга", language }),
    loadChapterIndex: async () => [
      { number: 1, status: "approved", wordCount: 100 },
    ],
  };
}

describe("buildExportArtifact EPUB lang metadata", () => {
  let bookDir: string;

  beforeEach(async () => {
    epubCalls.length = 0;
    bookDir = await mkdtemp(join(tmpdir(), "inkos-export-ru-"));
    await mkdir(join(bookDir, "chapters"), { recursive: true });
    await writeFile(
      join(bookDir, "chapters", "0001-glava.md"),
      "# Глава 1\n\nТекст главы.",
      "utf-8",
    );
  });

  afterEach(async () => {
    await rm(bookDir, { recursive: true, force: true });
  });

  it("sets lang=ru for a Russian book", async () => {
    const state = makeState(bookDir, "ru");
    await buildExportArtifact(state, "book-ru", { format: "epub" });
    expect(epubCalls).toHaveLength(1);
    expect(epubCalls[0].options.lang).toBe("ru");
  });

  it("still sets lang=en for an English book", async () => {
    const state = makeState(bookDir, "en");
    await buildExportArtifact(state, "book-en", { format: "epub" });
    expect(epubCalls).toHaveLength(1);
    expect(epubCalls[0].options.lang).toBe("en");
  });

  it("falls back to lang=zh-CN for a Chinese book", async () => {
    const state = makeState(bookDir, "zh");
    await buildExportArtifact(state, "book-zh", { format: "epub" });
    expect(epubCalls).toHaveLength(1);
    expect(epubCalls[0].options.lang).toBe("zh-CN");
  });
});
