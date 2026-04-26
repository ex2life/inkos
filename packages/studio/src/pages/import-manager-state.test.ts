import { describe, expect, it } from "vitest";
import { coerceFanficLang, fanficLanguageOptions } from "./ImportManager";

describe("fanficLanguageOptions", () => {
  it("includes ru in every UI language so Russian source material is selectable", () => {
    for (const uiLang of ["zh", "en", "ru"] as const) {
      const values = fanficLanguageOptions(uiLang).map((o) => o.value);
      expect(values).toContain("ru");
      expect(values).toContain("zh");
      expect(values).toContain("en");
    }
  });

  it("labels the ru option in the active Studio UI language", () => {
    const findRu = (uiLang: "zh" | "en" | "ru") =>
      fanficLanguageOptions(uiLang).find((o) => o.value === "ru")!;
    expect(findRu("ru").label).toBe("Русский");
    expect(findRu("en").label).toBe("Russian");
    expect(findRu("zh").label).toBe("俄文");
  });

  it("offers exactly three source-language options", () => {
    expect(fanficLanguageOptions("ru")).toHaveLength(3);
  });
});

describe("coerceFanficLang", () => {
  it("preserves zh, en, ru as-is", () => {
    expect(coerceFanficLang("zh")).toBe("zh");
    expect(coerceFanficLang("en")).toBe("en");
    expect(coerceFanficLang("ru")).toBe("ru");
  });

  it("falls back to zh for any unexpected value (defensive cast)", () => {
    expect(coerceFanficLang("")).toBe("zh");
    expect(coerceFanficLang("fr")).toBe("zh");
    expect(coerceFanficLang("ZH")).toBe("zh");
  });
});
