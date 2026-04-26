import { describe, expect, it } from "vitest";
import { coerceGenreLanguage, genreLanguageLabel } from "./GenreManager";

describe("coerceGenreLanguage", () => {
  it("preserves zh, en, ru as-is", () => {
    expect(coerceGenreLanguage("zh")).toBe("zh");
    expect(coerceGenreLanguage("en")).toBe("en");
    expect(coerceGenreLanguage("ru")).toBe("ru");
  });

  it("falls back to zh for unknown / missing values", () => {
    expect(coerceGenreLanguage(undefined)).toBe("zh");
    expect(coerceGenreLanguage(null)).toBe("zh");
    expect(coerceGenreLanguage("")).toBe("zh");
    expect(coerceGenreLanguage("fr")).toBe("zh");
  });
});

describe("genreLanguageLabel", () => {
  it("renders Russian labels in Cyrillic when the Studio UI is ru", () => {
    expect(genreLanguageLabel("ru", "ru")).toBe("Русский");
    expect(genreLanguageLabel("zh", "ru")).toBe("Китайский");
    expect(genreLanguageLabel("en", "ru")).toBe("Английский");
  });

  it("renders English labels when the Studio UI is en", () => {
    expect(genreLanguageLabel("ru", "en")).toBe("Russian");
    expect(genreLanguageLabel("zh", "en")).toBe("Chinese");
    expect(genreLanguageLabel("en", "en")).toBe("English");
  });

  it("renders Chinese labels when the Studio UI is zh (the default)", () => {
    expect(genreLanguageLabel("ru", "zh")).toBe("俄文");
    expect(genreLanguageLabel("zh", "zh")).toBe("中文");
    expect(genreLanguageLabel("en", "zh")).toBe("英文");
  });

  it("offers a Russian option to a Russian operator", () => {
    // The language picker exposes a ru option — exercised by the
    // label helper that drives the <option> labels in GenreManager.
    expect(genreLanguageLabel("ru", "ru")).toContain("Русский");
  });
});
