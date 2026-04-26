import { describe, expect, it } from "vitest";
import { LANGUAGE_OPTIONS } from "./LanguageSelector";

describe("LANGUAGE_OPTIONS", () => {
  it("offers exactly the three first-run languages: zh, en, ru", () => {
    const values = LANGUAGE_OPTIONS.map((o) => o.value);
    expect(values).toEqual(["zh", "en", "ru"]);
  });

  it("includes a Russian option with a Cyrillic heading and description", () => {
    const ru = LANGUAGE_OPTIONS.find((o) => o.value === "ru");
    expect(ru).toBeDefined();
    expect(ru!.heading).toBe("Русское творчество");
    expect(ru!.description).toContain("ЛитРПГ");
    expect(ru!.platforms).toContain("Author.Today");
    expect(ru!.platforms).toContain("Литнет");
  });

  it("does not alias the Russian option's copy to en or zh", () => {
    const ru = LANGUAGE_OPTIONS.find((o) => o.value === "ru")!;
    const en = LANGUAGE_OPTIONS.find((o) => o.value === "en")!;
    const zh = LANGUAGE_OPTIONS.find((o) => o.value === "zh")!;
    expect(ru.heading).not.toBe(en.heading);
    expect(ru.heading).not.toBe(zh.heading);
    expect(ru.description).not.toBe(en.description);
    expect(ru.description).not.toBe(zh.description);
  });
});
