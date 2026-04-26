/**
 * Round-4 fix: narrative-control must produce substantive Russian
 * (no aliasing to en or zh) when language === "ru".
 *
 * Russian books were getting Chinese narrative-control text injected into
 * their writer / reviser prompts.
 */

import { describe, expect, it } from "vitest";
import {
  buildNarrativeIntentBrief,
  renderMemoAsNarrativeBlock,
  renderNarrativeSelectedContext,
  sanitizeNarrativeControlText,
} from "../utils/narrative-control.js";
import type { ChapterMemo } from "../models/input-governance.js";

describe("narrative-control Russian rendering", () => {
  it("sanitizeNarrativeControlText replaces hook-id references with Russian", () => {
    const out = sanitizeNarrativeControlText("see H12 for context", "ru");
    expect(out).toContain("эта линия");
    expect(out).not.toContain("这条线索");
    expect(out).not.toContain("this thread");
  });

  it("sanitizeNarrativeControlText replaces chapter references with Russian", () => {
    const out = sanitizeNarrativeControlText("see chapter 4", "ru");
    expect(out).toContain("ранее по тексту");
    expect(out).not.toContain("此前");
    expect(out).not.toContain("an earlier scene");
  });

  it("renderMemoAsNarrativeBlock emits Russian section headings", () => {
    const memo: ChapterMemo = {
      chapter: 1,
      goal: "встреча героев",
      isGoldenOpening: true,
      body: "## Цель\n- встреча героев",
      threadRefs: ["H1"],
    };
    const out = renderMemoAsNarrativeBlock(memo, undefined, "ru");
    expect(out).toContain("## Цель");
    expect(out).toContain("## Связанные линии");
    expect(out).toContain("## Золотое открытие");
    expect(out).not.toContain("目标");
    expect(out).not.toContain("Goal");
    expect(out).not.toContain("黄金开场");
  });

  it("buildNarrativeIntentBrief emits Russian section labels", () => {
    const intent = [
      "## Goal",
      "- спасти город",
      "",
      "## Outline Node",
      "- глава 4 — кульминация",
      "",
      "## Must Keep",
      "- голос рассказчика",
      "",
      "## Must Avoid",
      "- спойлер финала",
      "",
      "## Style Emphasis",
      "- короткие предложения",
      "",
      "## Structured Directives",
      "- держать темп",
    ].join("\n");
    const out = buildNarrativeIntentBrief(intent, "ru");
    expect(out).toContain("## Цель");
    expect(out).toContain("## Текущий узел плана");
    expect(out).toContain("## Сохранить");
    expect(out).toContain("## Избегать");
    expect(out).toContain("## Стилистический акцент");
    expect(out).toContain("## Директивы");
    expect(out).not.toContain("目标");
    expect(out).not.toContain("当前节点");
    expect(out).not.toContain("Goal\n");
  });

  it("renderNarrativeSelectedContext emits Russian heading and inline labels", () => {
    const out = renderNarrativeSelectedContext(
      [{ source: "story/notes.md", reason: "контекст героя", excerpt: "цитата" }],
      "ru",
    );
    expect(out).toContain("### Свидетельство 1");
    expect(out).toContain("Причина:");
    expect(out).toContain("Деталь:");
    expect(out).not.toContain("证据");
    expect(out).not.toContain("Evidence");
    expect(out).not.toContain("原因");
  });
});
