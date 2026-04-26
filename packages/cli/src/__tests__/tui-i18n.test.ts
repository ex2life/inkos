import { describe, expect, it } from "vitest";
import { formatModeLabel, getTuiCopy, normalizeStageLabel, resolveTuiLocale } from "../tui/i18n.js";

describe("tui i18n", () => {
  it("defaults to Chinese and supports explicit English override", () => {
    expect(resolveTuiLocale({})).toBe("zh-CN");
    expect(resolveTuiLocale({ INKOS_TUI_LOCALE: "en" })).toBe("en");
    expect(resolveTuiLocale({ LANG: "en_US.UTF-8" })).toBe("en");
    expect(resolveTuiLocale({}, "en")).toBe("en");
  });

  it("normalizes common activity labels for Chinese chrome", () => {
    const copy = getTuiCopy("zh-CN");
    expect(normalizeStageLabel("writing chapter", copy)).toBe("写作中");
    expect(normalizeStageLabel("thinking ...", copy)).toBe("思考中");
    expect(normalizeStageLabel("idle", copy)).toBe("就绪");
    expect(normalizeStageLabel("waiting_human", copy)).toBe("等待你的决定");
    expect(normalizeStageLabel("completed", copy)).toBe("已完成");
    expect(formatModeLabel("semi", copy)).toBe("半自动");
    expect(formatModeLabel("auto", copy)).toBe("自动");
  });

  it("resolves Russian locale and provides Russian copy", () => {
    expect(resolveTuiLocale({ INKOS_TUI_LOCALE: "ru" })).toBe("ru-RU");
    expect(resolveTuiLocale({ LANG: "ru_RU.UTF-8" })).toBe("ru-RU");
    expect(resolveTuiLocale({}, "ru")).toBe("ru-RU");

    const copy = getTuiCopy("ru-RU");
    expect(normalizeStageLabel("writing chapter", copy)).toBe("пишу");
    expect(normalizeStageLabel("idle", copy)).toBe("Готово");
    expect(normalizeStageLabel("waiting_human", copy)).toBe("жду вашего решения");
    expect(normalizeStageLabel("completed", copy)).toBe("завершено");
    expect(formatModeLabel("semi", copy)).toBe("полуавто");
    expect(formatModeLabel("auto", copy)).toBe("авто");
    expect(copy.labels.project).toBe("Проект");
    expect(copy.labels.book).toBe("Книга");
  });
});
