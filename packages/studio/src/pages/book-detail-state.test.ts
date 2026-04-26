import { describe, expect, it } from "vitest";
import {
  bookLanguagePickerLabels,
  coerceBookLanguage,
  languageBadgeText,
  localizedBriefPrompt,
  localizedSyncTooltip,
} from "./BookDetail";

describe("coerceBookLanguage", () => {
  it("preserves zh, en, ru as-is", () => {
    expect(coerceBookLanguage("zh")).toBe("zh");
    expect(coerceBookLanguage("en")).toBe("en");
    expect(coerceBookLanguage("ru")).toBe("ru");
  });

  it("falls back to zh for unknown / missing values", () => {
    expect(coerceBookLanguage(undefined)).toBe("zh");
    expect(coerceBookLanguage(null)).toBe("zh");
    expect(coerceBookLanguage("")).toBe("zh");
    expect(coerceBookLanguage("fr")).toBe("zh");
  });
});

describe("localizedBriefPrompt", () => {
  it("emits Russian copy for Russian books", () => {
    expect(localizedBriefPrompt("ru", "rewrite")).toContain("перезапуска");
    expect(localizedBriefPrompt("ru", "revise")).toContain("правки");
    expect(localizedBriefPrompt("ru", "sync")).toContain("отредактированной");
  });

  it("emits English copy for English books", () => {
    expect(localizedBriefPrompt("en", "rewrite")).toMatch(/Optional rewrite brief/);
    expect(localizedBriefPrompt("en", "revise")).toMatch(/Optional revise brief/);
    expect(localizedBriefPrompt("en", "sync")).toMatch(/Optional sync brief/);
  });

  it("emits Chinese copy for Chinese books", () => {
    expect(localizedBriefPrompt("zh", "rewrite")).toContain("重写");
    expect(localizedBriefPrompt("zh", "revise")).toContain("修订");
    expect(localizedBriefPrompt("zh", "sync")).toContain("同步");
  });

  it("falls back to Chinese copy for unknown languages (legacy default)", () => {
    expect(localizedBriefPrompt(undefined, "rewrite")).toContain("重写");
  });
});

describe("localizedSyncTooltip", () => {
  it("returns Russian tooltip for ru", () => {
    expect(localizedSyncTooltip("ru")).toBe("Синхронизировать truth/state по отредактированной главе");
  });

  it("returns English tooltip for en", () => {
    expect(localizedSyncTooltip("en")).toBe("Sync truth/state from edited chapter");
  });

  it("returns Chinese tooltip for zh and unknown values", () => {
    expect(localizedSyncTooltip("zh")).toContain("已编辑章节");
    expect(localizedSyncTooltip(undefined)).toContain("已编辑章节");
  });
});

describe("languageBadgeText", () => {
  it("renders RU for a Russian book — the badge a Russian book emits", () => {
    expect(languageBadgeText("ru")).toBe("RU");
  });

  it("renders EN for an English book", () => {
    expect(languageBadgeText("en")).toBe("EN");
  });

  it("renders no badge for the default Chinese case", () => {
    expect(languageBadgeText("zh")).toBeNull();
    expect(languageBadgeText(undefined)).toBeNull();
  });
});

describe("bookLanguagePickerLabels", () => {
  it("labels options in Russian when the Studio UI is ru — the picker offers a ru option", () => {
    const labels = bookLanguagePickerLabels("ru");
    expect(labels.heading).toBe("Язык книги");
    expect(labels.ru).toBe("Русский");
    expect(labels.en).toBe("Английский");
    expect(labels.zh).toBe("Китайский");
  });

  it("labels options in English when the Studio UI is en", () => {
    const labels = bookLanguagePickerLabels("en");
    expect(labels.heading).toBe("Book Language");
    expect(labels.ru).toBe("Russian");
    expect(labels.en).toBe("English");
    expect(labels.zh).toBe("Chinese");
  });

  it("labels options in Chinese when the Studio UI is zh (the default)", () => {
    const labels = bookLanguagePickerLabels("zh");
    expect(labels.heading).toBe("书籍语言");
    expect(labels.ru).toBe("俄文");
    expect(labels.en).toBe("英文");
    expect(labels.zh).toBe("中文");
  });
});
