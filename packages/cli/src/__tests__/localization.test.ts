import { describe, expect, it } from "vitest";
import {
  formatAgentContextSuffix,
  formatBookCreateCreating,
  formatBookCreateCreated,
  formatBookCreateNextStep,
  formatConfigListModelsEmpty,
  formatConfigListModelsHeader,
  formatDoctorHintApiKey,
  formatDoctorHintBaseUrl,
  formatDoctorHintModel,
  formatDoctorHintStream,
  formatDoctorOpenAiHint,
  formatFanficCanonMissing,
  formatFanficInvalidMode,
  formatFanficSourceDirEmpty,
  formatFanficSourceTooShort,
  formatGenreCreateTemplate,
  formatImportCanonComplete,
  formatImportCanonStart,
  formatImportChaptersComplete,
  formatImportChaptersDiscovery,
  formatImportChaptersResume,
  formatInitCreateExample,
  formatWriteNextComplete,
  formatWriteNextProgress,
  formatWriteNextResultLines,
  formatWriteStateRepairRequired,
  resolveCliLanguage,
} from "../localization.js";

describe("CLI localization", () => {
  it("formats book-create summaries in both languages", () => {
    expect(formatBookCreateCreating("zh", "山河", "xuanhuan", "tomato"))
      .toBe('创建书籍 "山河"（xuanhuan / tomato）...');
    expect(formatBookCreateCreated("zh", "shan-he")).toBe("已创建书籍：shan-he");
    expect(formatBookCreateNextStep("zh", "shan-he")).toBe("下一步：inkos write next shan-he");

    expect(formatBookCreateCreating("en", "Harbor", "other", "other"))
      .toBe('Creating book "Harbor" (other / other)...');
    expect(formatBookCreateCreated("en", "harbor")).toBe("Book created: harbor");
    expect(formatBookCreateNextStep("en", "harbor")).toBe("Next: inkos write next harbor");
  });

  it("formats write-next progress and result summaries in both languages", () => {
    expect(formatWriteNextProgress("zh", 1, 2, "shan-he"))
      .toBe('[1/2] 为「shan-he」撰写章节...');
    expect(formatWriteNextComplete("zh")).toBe("完成。");
    expect(formatWriteNextResultLines("zh", {
      chapterNumber: 3,
      title: "风雪夜",
      wordCount: 3200,
      status: "ready-for-review",
      revised: true,
      issues: [],
      auditPassed: true,
    })).toEqual([
      "  第3章：风雪夜",
      "  字数：3200字",
      "  审计：通过",
      "  自动修正：已执行（已修复关键问题）",
      "  状态：ready-for-review",
    ]);

    expect(formatWriteNextProgress("en", 2, 3, "harbor"))
      .toBe('[2/3] Writing chapter for "harbor"...');
    expect(formatWriteNextComplete("en")).toBe("Done.");
    expect(formatWriteNextResultLines("en", {
      chapterNumber: 4,
      title: "Cold Harbor",
      wordCount: 2200,
      status: "audit-failed",
      revised: false,
      issues: [{ severity: "critical", category: "continuity", description: "Mismatch" }],
      auditPassed: false,
    })).toEqual([
      "  Chapter 4: Cold Harbor",
      "  Length: 2200 words",
      "  Audit: NEEDS REVIEW",
      "  Status: audit-failed",
      "  Issues:",
      "    [critical] continuity: Mismatch",
    ]);
  });

  it("formats import summaries with language-specific units and action hints", () => {
    expect(formatImportChaptersDiscovery("zh", 12, "shan-he"))
      .toBe('发现 12 章，准备导入到「shan-he」。');
    expect(formatImportChaptersResume("zh", 5)).toBe("从第 5 章继续导入。");
    expect(formatImportChaptersComplete("zh", {
      importedCount: 8,
      totalWords: 45678,
      nextChapter: 13,
      continueBookId: "shan-he",
    })).toEqual([
      "导入完成：",
      "  已导入章节：8",
      "  总长度：45678字",
      "  下一章编号：13",
      "",
      '运行 "inkos write next shan-he" 继续写作。',
    ]);

    expect(formatImportChaptersDiscovery("en", 10, "harbor"))
      .toBe('Found 10 chapters to import into "harbor".');
    expect(formatImportChaptersResume("en", 6)).toBe("Resuming from chapter 6.");
    expect(formatImportChaptersComplete("en", {
      importedCount: 10,
      totalWords: 18342,
      nextChapter: 11,
      continueBookId: "harbor",
    })).toEqual([
      "Import complete:",
      "  Chapters imported: 10",
      "  Total length: 18342 words",
      "  Next chapter number: 11",
      "",
      'Run "inkos write next harbor" to continue writing.',
    ]);
  });

  it("formats import-canon prompts in both languages", () => {
    expect(formatImportCanonStart("zh", "parent-book", "target-book"))
      .toBe('把 "parent-book" 的正典导入到 "target-book"...');
    expect(formatImportCanonComplete("zh")).toEqual([
      "正典已导入：story/parent_canon.md",
      "Writer 和 auditor 会在番外模式下自动识别这个文件。",
    ]);

    expect(formatImportCanonStart("en", "parent-book", "target-book"))
      .toBe('Importing canon from "parent-book" into "target-book"...');
    expect(formatImportCanonComplete("en")).toEqual([
      "Canon imported: story/parent_canon.md",
      "Writer and auditor will auto-detect this file for spinoff mode.",
    ]);
  });

  it("resolves the ru language explicitly and falls back to zh otherwise", () => {
    expect(resolveCliLanguage("ru")).toBe("ru");
    expect(resolveCliLanguage("en")).toBe("en");
    expect(resolveCliLanguage("zh")).toBe("zh");
    expect(resolveCliLanguage("xx")).toBe("zh");
    expect(resolveCliLanguage(undefined)).toBe("zh");
  });

  it("formats book-create / write-next / import flows in Russian", () => {
    expect(formatBookCreateCreating("ru", "Моя книга", "urban", "other"))
      .toBe('Создаю книгу «Моя книга» (urban / other)...');
    expect(formatBookCreateCreated("ru", "moya-kniga"))
      .toBe("Книга создана: moya-kniga");
    expect(formatBookCreateNextStep("ru", "moya-kniga"))
      .toBe("Дальше: inkos write next moya-kniga");

    expect(formatWriteNextProgress("ru", 1, 5, "moya-kniga"))
      .toBe('[1/5] Пишу главу для «moya-kniga»...');
    expect(formatWriteNextComplete("ru")).toBe("Готово.");
    expect(formatWriteNextResultLines("ru", {
      chapterNumber: 7,
      title: "Дверь номер семь",
      wordCount: 2200,
      status: "ready-for-review",
      revised: true,
      issues: [{ severity: "critical", category: "continuity", description: "Несостыковка" }],
      auditPassed: false,
    })).toEqual([
      "  Глава 7: Дверь номер семь",
      "  Объём: 2200 words",
      "  Аудит: нужна ревизия",
      "  Авто-правка: выполнена (критичные замечания закрыты)",
      "  Статус: ready-for-review",
      "  Замечания:",
      "    [critical] continuity: Несостыковка",
    ]);

    expect(formatImportChaptersDiscovery("ru", 12, "moya-kniga"))
      .toBe('Найдено глав: 12. Импортирую в «moya-kniga».');
    expect(formatImportChaptersResume("ru", 6))
      .toBe("Возобновляю импорт с главы 6.");
    expect(formatImportChaptersComplete("ru", {
      importedCount: 12,
      totalWords: 31415,
      nextChapter: 13,
      continueBookId: "moya-kniga",
    })).toEqual([
      "Импорт завершён:",
      "  Импортировано глав: 12",
      "  Общий объём: 31415 words",
      "  Номер следующей главы: 13",
      "",
      'Запусти «inkos write next moya-kniga», чтобы продолжить писать.',
    ]);

    expect(formatImportCanonStart("ru", "parent-book", "target-book"))
      .toBe('Импортирую канон из «parent-book» в «target-book»...');
    expect(formatImportCanonComplete("ru")).toEqual([
      "Канон импортирован: story/parent_canon.md",
      "Writer и auditor автоматически подхватят этот файл в режиме спин-оффа.",
    ]);
  });

  it("formats fanfic, doctor, config, write, agent, init and genre helpers in Russian", () => {
    expect(formatFanficInvalidMode("ru", "xyz"))
      .toBe('Недопустимый режим фанфика: «xyz». Допустимо: canon, au, ooc, cp');
    expect(formatFanficSourceTooShort("ru", 42))
      .toBe("Исходный материал слишком короткий (42 симв.). Дай минимум 100 символов исходника.");
    expect(formatFanficCanonMissing("ru"))
      .toBe("У книги нет файла канона фанфика. Создай фанфик через «inkos fanfic init».");
    expect(formatFanficSourceDirEmpty("ru", "/tmp/src"))
      .toBe("В каталоге /tmp/src нет файлов .txt или .md.");

    expect(formatDoctorOpenAiHint("ru"))
      .toBe("Уже перепробованы комбинации chat/responses и stream on/off; если ошибка осталась, проверь имя модели, путь baseUrl или совместимость провайдера.");
    expect(formatDoctorHintBaseUrl("ru"))
      .toBe("Возможно, неверный baseUrl — проверь, что INKOS_LLM_BASE_URL содержит полный путь (например, /v1).");
    expect(formatDoctorHintStream("ru"))
      .toBe("Свери с документацией провайдера: эндпоинт требует stream=true, stream=false или вовсе не поддерживает стрим?");
    expect(formatDoctorHintModel("ru"))
      .toBe("Проверь, что имя модели верное (INKOS_LLM_MODEL).");
    expect(formatDoctorHintApiKey("ru"))
      .toBe("Неверный API-ключ — проверь INKOS_LLM_API_KEY.");

    expect(formatConfigListModelsEmpty("ru", "openai"))
      .toBe("openai: нет доступных моделей (возможно, нужны --api-key и --base-url).");
    expect(formatConfigListModelsHeader("ru", "openai", 3))
      .toBe("openai: моделей — 3\n");

    expect(formatWriteStateRepairRequired("ru"))
      .toBe("Сначала почини state — пакетная запись остановлена.");

    expect(formatAgentContextSuffix("ru", "по жанрам"))
      .toBe("Дополнительный контекст: по жанрам");

    expect(formatInitCreateExample("ru"))
      .toBe("  inkos book create --title 'Моя книга' --genre urban --platform other --lang ru");
    // Sanity: zh and en branches still respond as expected.
    expect(formatInitCreateExample("zh"))
      .toBe("  inkos book create --title '我的小说' --genre xuanhuan --platform tomato");
    expect(formatInitCreateExample("en"))
      .toBe("  inkos book create --title 'My Novel' --genre progression --platform royalroad --lang en");

    const ruGenre = formatGenreCreateTemplate("ru", {
      id: "fantasy",
      name: "Фэнтези",
      numerical: false,
      powerScaling: true,
      eraResearch: false,
    });
    expect(ruGenre).toContain("name: Фэнтези");
    expect(ruGenre).toContain("id: fantasy");
    expect(ruGenre).toContain('chapterTypes: ["развитие", "завязка", "переход", "развязка"]');
    expect(ruGenre).toContain('fatigueWords: ["шокирован", "невероятно", "немыслимо"]');
    expect(ruGenre).toContain("numericalSystem: false");
    expect(ruGenre).toContain("powerScaling: true");
    expect(ruGenre).toContain("eraResearch: false");
    expect(ruGenre).toContain("## Запреты жанра");
    expect(ruGenre).toContain("## Указания по нарративу");
    expect(ruGenre).toContain("(опиши акценты повествования и требования к стилю для этого жанра)");
  });
});
