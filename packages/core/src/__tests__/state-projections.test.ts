import { describe, expect, it } from "vitest";
import {
  renderChapterSummariesProjection,
  renderCurrentStateProjection,
  renderHooksProjection,
} from "../state/state-projections.js";

describe("state projections", () => {
  it("renders pending hooks projection with deterministic English ordering", () => {
    const markdown = renderHooksProjection({
      hooks: [
        {
          hookId: "b-courier",
          startChapter: 12,
          type: "mystery",
          status: "open",
          lastAdvancedChapter: 13,
          expectedPayoff: "Identify the courier.",
          notes: "The seal is still broken.",
        },
        {
          hookId: "a-debt",
          startChapter: 4,
          type: "relationship",
          status: "progressing",
          lastAdvancedChapter: 11,
          expectedPayoff: "Reveal the debt.",
          notes: "Old oath token resurfaces.",
        },
      ],
    }, "en");

    expect(markdown).toBe([
      "# Pending Hooks",
      "",
      "| hook_id | start_chapter | type | status | last_advanced_chapter | expected_payoff | payoff_timing | depends_on | pays_off_in_arc | core_hook | half_life | promoted | notes |",
      "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
      "| a-debt | 4 | relationship | progressing | 11 | Reveal the debt. | mid-arc | none |  | false |  |  | Old oath token resurfaces. |",
      "| b-courier | 12 | mystery | open | 13 | Identify the courier. | mid-arc | none |  | false |  |  | The seal is still broken. |",
      "",
    ].join("\n"));
  });

  it("renders chapter summaries projection with deterministic Chinese ordering", () => {
    const markdown = renderChapterSummariesProjection({
      rows: [
        {
          chapter: 12,
          title: "河埠对账",
          characters: "林月",
          events: "林月核对货单与誓令碎片",
          stateChanges: "师债线索进一步收束",
          hookActivity: "mentor-debt 推进",
          mood: "紧绷",
          chapterType: "主线推进",
        },
        {
          chapter: 11,
          title: "雨巷旧账",
          characters: "林月",
          events: "林月查到旧账册断页",
          stateChanges: "师债线被重新钉牢",
          hookActivity: "mentor-debt 推进",
          mood: "压抑",
          chapterType: "主线推进",
        },
      ],
    }, "zh");

    expect(markdown).toBe([
      "# 章节摘要",
      "",
      "| 章节 | 标题 | 出场人物 | 关键事件 | 状态变化 | 伏笔动态 | 情绪基调 | 章节类型 |",
      "| --- | --- | --- | --- | --- | --- | --- | --- |",
      "| 11 | 雨巷旧账 | 林月 | 林月查到旧账册断页 | 师债线被重新钉牢 | mentor-debt 推进 | 压抑 | 主线推进 |",
      "| 12 | 河埠对账 | 林月 | 林月核对货单与誓令碎片 | 师债线索进一步收束 | mentor-debt 推进 | 紧绷 | 主线推进 |",
      "",
    ].join("\n"));
  });

  it("renders current state projection with placeholders and additional notes", () => {
    const markdown = renderCurrentStateProjection({
      chapter: 12,
      facts: [
        {
          subject: "protagonist",
          predicate: "Current Goal",
          object: "Track the mentor debt through the river-port ledger.",
          validFromChapter: 12,
          validUntilChapter: null,
          sourceChapter: 12,
        },
        {
          subject: "protagonist",
          predicate: "Current Conflict",
          object: "Guild pressure keeps pulling against the debt trail.",
          validFromChapter: 12,
          validUntilChapter: null,
          sourceChapter: 12,
        },
        {
          subject: "current_state",
          predicate: "note_1",
          object: "Lin Yue still hides the broken oath token.",
          validFromChapter: 12,
          validUntilChapter: null,
          sourceChapter: 12,
        },
      ],
    }, "en");

    expect(markdown).toBe([
      "# Current State",
      "",
      "| Field | Value |",
      "| --- | --- |",
      "| Current Chapter | 12 |",
      "| Current Location | (not set) |",
      "| Protagonist State | (not set) |",
      "| Current Goal | Track the mentor debt through the river-port ledger. |",
      "| Current Constraint | (not set) |",
      "| Current Alliances | (not set) |",
      "| Current Conflict | Guild pressure keeps pulling against the debt trail. |",
      "",
      "## Additional State",
      "- Lin Yue still hides the broken oath token.",
      "",
    ].join("\n"));
  });

  // Russian-localization round 4, bug 2 regression: previously these three
  // projection functions accepted "ru" as a type but quietly rendered
  // Chinese for every non-English value. Since they are the writer-back path
  // for current_state.md / chapter_summaries.md / pending_hooks.md, that
  // contaminated the next chapter's context with Chinese for a Russian book.
  it("renders the current state projection in Russian for language=\"ru\"", () => {
    const markdown = renderCurrentStateProjection({
      chapter: 5,
      facts: [
        {
          subject: "protagonist",
          predicate: "Current Goal",
          object: "Найти пропавший дневник наставника.",
          validFromChapter: 5,
          validUntilChapter: null,
          sourceChapter: 5,
        },
      ],
    }, "ru");

    // Section heading and table-header labels must be Russian, the
    // (not set) placeholder must be Russian too, and we must not leak the
    // Chinese variant.
    expect(markdown).toContain("# Текущее состояние");
    expect(markdown).toContain("| Поле | Значение |");
    expect(markdown).toContain("| Текущая глава | 5 |");
    expect(markdown).toContain("| Текущая цель | Найти пропавший дневник наставника. |");
    expect(markdown).toContain("(не задано)");
    expect(markdown).not.toMatch(/[一-鿿]/);
    expect(markdown).not.toContain("Current Chapter");

    const summaries = renderChapterSummariesProjection({
      rows: [
        {
          chapter: 1,
          title: "Возвращение в Заречье",
          characters: "Лина",
          events: "Лина возвращается в родной дом.",
          stateChanges: "Открыт долг наставника.",
          hookActivity: "mentor-debt запущена",
          mood: "тревожное",
          chapterType: "пролог",
        },
      ],
    }, "ru");
    expect(summaries).toContain("# Сводки по главам");
    expect(summaries).toContain("| Глава | Заголовок | Персонажи");
    expect(summaries).not.toMatch(/[一-鿿]/);

    const hooks = renderHooksProjection({
      hooks: [
        {
          hookId: "mentor-debt",
          startChapter: 1,
          type: "relationship",
          status: "open",
          lastAdvancedChapter: 1,
          expectedPayoff: "Раскрыть личность кредитора.",
          notes: "Печать сорвана.",
        },
      ],
    }, "ru");
    expect(hooks).toContain("# Незакрытые зацепки");
    expect(hooks).toContain("начальная глава");
    expect(hooks).toContain("| mentor-debt |");
    // dependsOn defaults to empty list — should render the Russian "нет"
    // rather than the Chinese "无" or the English "none".
    expect(hooks).toContain("| нет |");
    expect(hooks).not.toMatch(/[一-鿿]/);
  });
});
