import { describe, expect, it, vi } from "vitest";

// Stub out useApi so the hook can be invoked without a React renderer.
// The hook accepts a `lang` override, which we use to drive language
// behaviour deterministically. We still mock useApi because useI18n
// imports it at module load time.
vi.mock("../hooks/use-api", () => ({
  useApi: () => ({ data: undefined }),
}));

import { resolveLang, useI18n } from "../hooks/use-i18n";

describe("resolveLang", () => {
  it("resolves a project with language=\"ru\" to ru", () => {
    expect(resolveLang("ru")).toBe("ru");
  });

  it("resolves a project with language=\"en\" to en", () => {
    expect(resolveLang("en")).toBe("en");
  });

  it("falls back to zh for unknown / missing language", () => {
    expect(resolveLang("zh")).toBe("zh");
    expect(resolveLang(undefined)).toBe("zh");
    expect(resolveLang(null)).toBe("zh");
    expect(resolveLang("fr")).toBe("zh");
  });
});

describe("useI18n with ru override", () => {
  const { t, lang } = useI18n("ru");

  it("returns Russian for nav.books", () => {
    expect(lang).toBe("ru");
    expect(t("nav.books")).toBe("Книги");
  });

  it("returns Russian for common.save", () => {
    expect(t("common.save")).toBe("Сохранить");
  });

  it("returns Russian for create.titleRequired", () => {
    expect(t("create.titleRequired")).toBe("Укажите название");
  });

  it("returns Russian for doctor.allPassed (a longer message)", () => {
    expect(t("doctor.allPassed")).toBe("Все проверки пройдены — окружение в порядке");
  });
});
