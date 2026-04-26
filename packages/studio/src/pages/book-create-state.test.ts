import { describe, expect, it } from "vitest";
import {
  PAGE_COPY,
  PLATFORMS_RU,
  buildCreationDraftSummary,
  coerceProjectLang,
  defaultChapterWordsForLanguage,
  platformOptionsForLanguage,
} from "./BookCreate";

describe("coerceProjectLang", () => {
  it("preserves zh, en, ru as-is", () => {
    expect(coerceProjectLang("zh")).toBe("zh");
    expect(coerceProjectLang("en")).toBe("en");
    expect(coerceProjectLang("ru")).toBe("ru");
  });

  it("falls back to zh for unknown / missing values", () => {
    expect(coerceProjectLang(undefined)).toBe("zh");
    expect(coerceProjectLang(null)).toBe("zh");
    expect(coerceProjectLang("")).toBe("zh");
    expect(coerceProjectLang("fr")).toBe("zh");
  });
});

describe("PAGE_COPY", () => {
  it("exposes a substantive ru entry (no aliasing to en)", () => {
    const ru = PAGE_COPY.ru;
    expect(ru).toBeDefined();
    expect(ru.idleTitle).toBe("Начните с черновой идеи");
    expect(ru.submit).toBe("Обновить черновик");
    expect(ru.create).toBe("Создать книгу по черновику");
    expect(ru.discard).toBe("Отбросить черновик");
    // Russian copy must not be aliased to English/Chinese strings.
    expect(ru.idleTitle).not.toBe(PAGE_COPY.en.idleTitle);
    expect(ru.idleTitle).not.toBe(PAGE_COPY.zh.idleTitle);
  });
});

describe("PLATFORMS_RU", () => {
  it("includes the Russian-market platforms a Russian operator expects", () => {
    const labels = PLATFORMS_RU.map((p) => p.label);
    expect(labels).toContain("Author.Today");
    expect(labels).toContain("Литнет");
    expect(labels).toContain("Литмаркет");
    expect(labels).toContain("Самиздат");
    expect(labels).toContain("ЛитРес-Самиздат");
    expect(labels).toContain("Boosty");
    expect(labels).toContain("Другое");
  });

  it("ends with an 'other' value as the catch-all", () => {
    const last = PLATFORMS_RU[PLATFORMS_RU.length - 1];
    expect(last.value).toBe("other");
    expect(last.label).toBe("Другое");
  });
});

describe("platformOptionsForLanguage", () => {
  it("dispatches ru to PLATFORMS_RU", () => {
    expect(platformOptionsForLanguage("ru")).toBe(PLATFORMS_RU);
  });
});

describe("defaultChapterWordsForLanguage", () => {
  it("returns 3000 for ru (matching the Chinese baseline)", () => {
    expect(defaultChapterWordsForLanguage("ru")).toBe("3000");
  });

  it("still returns 2000 for en and 3000 for zh", () => {
    expect(defaultChapterWordsForLanguage("en")).toBe("2000");
    expect(defaultChapterWordsForLanguage("zh")).toBe("3000");
  });
});

describe("buildCreationDraftSummary", () => {
  it("emits Russian labels when language is ru", () => {
    const draft = {
      concept: "портовый нуар",
      title: "Тёмный порт",
      worldPremise: "Будущий приморский город",
      protagonist: "Сергей",
      conflictCore: "Конфликт за груз",
      volumeOutline: "Первый том",
      blurb: "Аннотация",
      nextQuestion: "Что дальше?",
      missingFields: [] as string[],
      readyToCreate: true,
    };
    const rows = buildCreationDraftSummary(draft, "ru");
    const labels = rows.map((r) => r.label);
    expect(labels).toEqual([
      "Название",
      "Мир",
      "Протагонист",
      "Ключевой конфликт",
      "Направление тома",
      "Аннотация",
      "Дальше",
    ]);
  });

  it("still emits English labels when language is en", () => {
    const draft = {
      concept: "x",
      title: "X",
      missingFields: [] as string[],
      readyToCreate: false,
    };
    const rows = buildCreationDraftSummary(draft, "en");
    expect(rows[0].label).toBe("Title");
  });

  it("still emits Chinese labels when language is zh", () => {
    const draft = {
      concept: "x",
      title: "X",
      missingFields: [] as string[],
      readyToCreate: false,
    };
    const rows = buildCreationDraftSummary(draft, "zh");
    expect(rows[0].label).toBe("书名");
  });
});
