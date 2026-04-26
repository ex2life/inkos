import { formatLengthCount, resolveLengthCountingMode } from "@actalk/inkos-core";

export type CliLanguage = "zh" | "en" | "ru";

type WriteIssue = {
  readonly severity: string;
  readonly category: string;
  readonly description: string;
};

type WriteResultShape = {
  readonly chapterNumber: number;
  readonly title: string;
  readonly wordCount: number;
  readonly status: string;
  readonly revised: boolean;
  readonly issues: ReadonlyArray<WriteIssue>;
  readonly auditPassed?: boolean;
  readonly passedAudit?: boolean;
};

type ImportResultShape = {
  readonly importedCount: number;
  readonly totalWords: number;
  readonly nextChapter: number;
  readonly continueBookId: string;
};

function localize(language: CliLanguage, messages: { zh: string; en: string; ru: string }): string {
  if (language === "en") return messages.en;
  if (language === "ru") return messages.ru;
  return messages.zh;
}

export function resolveCliLanguage(language?: string): CliLanguage {
  if (language === "en") return "en";
  if (language === "ru") return "ru";
  return "zh";
}

export function formatBookCreateCreating(
  language: CliLanguage,
  title: string,
  genre: string,
  platform: string,
): string {
  return localize(language, {
    zh: `创建书籍 "${title}"（${genre} / ${platform}）...`,
    en: `Creating book "${title}" (${genre} / ${platform})...`,
    ru: `Создаю книгу «${title}» (${genre} / ${platform})...`,
  });
}

export function formatBookCreateCreated(language: CliLanguage, bookId: string): string {
  return localize(language, {
    zh: `已创建书籍：${bookId}`,
    en: `Book created: ${bookId}`,
    ru: `Книга создана: ${bookId}`,
  });
}

export function formatBookCreateLocation(language: CliLanguage, bookId: string): string {
  return localize(language, {
    zh: `  位置：books/${bookId}/`,
    en: `  Location: books/${bookId}/`,
    ru: `  Расположение: books/${bookId}/`,
  });
}

export function formatBookCreateFoundationReady(language: CliLanguage): string {
  return localize(language, {
    zh: "  故事圣经、大纲和书籍规则已生成。",
    en: "  Story bible, outline, book rules generated.",
    ru: "  Сгенерированы story bible, план и правила книги.",
  });
}

export function formatBookCreateNextStep(language: CliLanguage, bookId: string): string {
  return localize(language, {
    zh: `下一步：inkos write next ${bookId}`,
    en: `Next: inkos write next ${bookId}`,
    ru: `Дальше: inkos write next ${bookId}`,
  });
}

export function formatWriteNextProgress(
  language: CliLanguage,
  current: number,
  total: number,
  bookId: string,
): string {
  return localize(language, {
    zh: `[${current}/${total}] 为「${bookId}」撰写章节...`,
    en: `[${current}/${total}] Writing chapter for "${bookId}"...`,
    ru: `[${current}/${total}] Пишу главу для «${bookId}»...`,
  });
}

export function formatWriteNextResultLines(
  language: CliLanguage,
  result: WriteResultShape,
): string[] {
  const auditPassed = result.auditPassed ?? result.passedAudit ?? false;
  const lengthLabel = formatLengthCount(result.wordCount, resolveLengthCountingMode(language));
  const lines = [
    localize(language, {
      zh: `  第${result.chapterNumber}章：${result.title}`,
      en: `  Chapter ${result.chapterNumber}: ${result.title}`,
      ru: `  Глава ${result.chapterNumber}: ${result.title}`,
    }),
    localize(language, {
      zh: `  字数：${lengthLabel}`,
      en: `  Length: ${lengthLabel}`,
      ru: `  Объём: ${lengthLabel}`,
    }),
    localize(language, {
      zh: `  审计：${auditPassed ? "通过" : "需复核"}`,
      en: `  Audit: ${auditPassed ? "PASSED" : "NEEDS REVIEW"}`,
      ru: `  Аудит: ${auditPassed ? "пройден" : "нужна ревизия"}`,
    }),
  ];

  if (result.revised) {
    lines.push(localize(language, {
      zh: "  自动修正：已执行（已修复关键问题）",
      en: "  Auto-revised: YES (critical issues were fixed)",
      ru: "  Авто-правка: выполнена (критичные замечания закрыты)",
    }));
  }

  lines.push(localize(language, {
    zh: `  状态：${result.status}`,
    en: `  Status: ${result.status}`,
    ru: `  Статус: ${result.status}`,
  }));

  if (result.issues.length > 0) {
    lines.push(localize(language, {
      zh: "  问题：",
      en: "  Issues:",
      ru: "  Замечания:",
    }));
    for (const issue of result.issues) {
      lines.push(`    [${issue.severity}] ${issue.category}: ${issue.description}`);
    }
  }

  return lines;
}

export function formatWriteNextComplete(language: CliLanguage): string {
  return localize(language, {
    zh: "完成。",
    en: "Done.",
    ru: "Готово.",
  });
}

export function formatImportChaptersDiscovery(
  language: CliLanguage,
  chapterCount: number,
  bookId: string,
): string {
  return localize(language, {
    zh: `发现 ${chapterCount} 章，准备导入到「${bookId}」。`,
    en: `Found ${chapterCount} chapters to import into "${bookId}".`,
    ru: `Найдено глав: ${chapterCount}. Импортирую в «${bookId}».`,
  });
}

export function formatImportChaptersResume(
  language: CliLanguage,
  resumeFrom: number,
): string {
  return localize(language, {
    zh: `从第 ${resumeFrom} 章继续导入。`,
    en: `Resuming from chapter ${resumeFrom}.`,
    ru: `Возобновляю импорт с главы ${resumeFrom}.`,
  });
}

export function formatImportChaptersComplete(
  language: CliLanguage,
  result: ImportResultShape,
): string[] {
  const lengthLabel = formatLengthCount(result.totalWords, resolveLengthCountingMode(language));
  return [
    localize(language, {
      zh: "导入完成：",
      en: "Import complete:",
      ru: "Импорт завершён:",
    }),
    localize(language, {
      zh: `  已导入章节：${result.importedCount}`,
      en: `  Chapters imported: ${result.importedCount}`,
      ru: `  Импортировано глав: ${result.importedCount}`,
    }),
    localize(language, {
      zh: `  总长度：${lengthLabel}`,
      en: `  Total length: ${lengthLabel}`,
      ru: `  Общий объём: ${lengthLabel}`,
    }),
    localize(language, {
      zh: `  下一章编号：${result.nextChapter}`,
      en: `  Next chapter number: ${result.nextChapter}`,
      ru: `  Номер следующей главы: ${result.nextChapter}`,
    }),
    "",
    localize(language, {
      zh: `运行 "inkos write next ${result.continueBookId}" 继续写作。`,
      en: `Run "inkos write next ${result.continueBookId}" to continue writing.`,
      ru: `Запусти «inkos write next ${result.continueBookId}», чтобы продолжить писать.`,
    }),
  ];
}

export function formatImportCanonStart(
  language: CliLanguage,
  parentBookId: string,
  targetBookId: string,
): string {
  return localize(language, {
    zh: `把 "${parentBookId}" 的正典导入到 "${targetBookId}"...`,
    en: `Importing canon from "${parentBookId}" into "${targetBookId}"...`,
    ru: `Импортирую канон из «${parentBookId}» в «${targetBookId}»...`,
  });
}

export function formatImportCanonComplete(language: CliLanguage): string[] {
  return [
    localize(language, {
      zh: "正典已导入：story/parent_canon.md",
      en: "Canon imported: story/parent_canon.md",
      ru: "Канон импортирован: story/parent_canon.md",
    }),
    localize(language, {
      zh: "Writer 和 auditor 会在番外模式下自动识别这个文件。",
      en: "Writer and auditor will auto-detect this file for spinoff mode.",
      ru: "Writer и auditor автоматически подхватят этот файл в режиме спин-оффа.",
    }),
  ];
}

export function formatFanficInvalidMode(language: CliLanguage, mode: string): string {
  return localize(language, {
    zh: `无效的同人模式："${mode}"。可选：canon, au, ooc, cp`,
    en: `Invalid fanfic mode: "${mode}". Allowed: canon, au, ooc, cp`,
    ru: `Недопустимый режим фанфика: «${mode}». Допустимо: canon, au, ooc, cp`,
  });
}

export function formatFanficSourceTooShort(language: CliLanguage, charCount: number): string {
  return localize(language, {
    zh: `源素材文件内容过短（${charCount} 字符）。请提供至少 100 字符的原作素材。`,
    en: `Source material is too short (${charCount} chars). Provide at least 100 chars of source text.`,
    ru: `Исходный материал слишком короткий (${charCount} симв.). Дай минимум 100 символов исходника.`,
  });
}

export function formatFanficCanonMissing(language: CliLanguage): string {
  return localize(language, {
    zh: `该书没有同人正典文件。用 inkos fanfic init 创建同人书。`,
    en: `This book has no fanfic canon file. Run "inkos fanfic init" to create a fanfic book.`,
    ru: `У книги нет файла канона фанфика. Создай фанфик через «inkos fanfic init».`,
  });
}

export function formatFanficSourceDirEmpty(language: CliLanguage, sourcePath: string): string {
  return localize(language, {
    zh: `目录 ${sourcePath} 中没有 .txt 或 .md 文件。`,
    en: `No .txt or .md files found in directory ${sourcePath}.`,
    ru: `В каталоге ${sourcePath} нет файлов .txt или .md.`,
  });
}

export function formatDoctorOpenAiHint(language: CliLanguage): string {
  return localize(language, {
    zh: "当前已自动尝试 chat/responses 与流式开关组合；如果仍失败，问题更可能在模型名、baseUrl 路径或服务商兼容性本身。",
    en: "Already tried chat/responses and stream on/off combos; remaining failures usually mean a wrong model name, baseUrl path, or provider incompatibility.",
    ru: "Уже перепробованы комбинации chat/responses и stream on/off; если ошибка осталась, проверь имя модели, путь baseUrl или совместимость провайдера.",
  });
}

export function formatDoctorHintBaseUrl(language: CliLanguage): string {
  return localize(language, {
    zh: "baseUrl 可能不正确，检查 INKOS_LLM_BASE_URL 是否包含完整路径（如 /v1）",
    en: "baseUrl may be wrong — check that INKOS_LLM_BASE_URL includes the full path (e.g. /v1).",
    ru: "Возможно, неверный baseUrl — проверь, что INKOS_LLM_BASE_URL содержит полный путь (например, /v1).",
  });
}

export function formatDoctorHintStream(language: CliLanguage): string {
  return localize(language, {
    zh: "检查提供方文档，确认该接口要求 stream=true、stream=false，还是根本不支持 stream",
    en: "Check provider docs: does this endpoint require stream=true, stream=false, or not support streaming at all?",
    ru: "Свери с документацией провайдера: эндпоинт требует stream=true, stream=false или вовсе не поддерживает стрим?",
  });
}

export function formatDoctorHintModel(language: CliLanguage): string {
  return localize(language, {
    zh: "检查模型名称是否正确（INKOS_LLM_MODEL）",
    en: "Verify the model name is correct (INKOS_LLM_MODEL).",
    ru: "Проверь, что имя модели верное (INKOS_LLM_MODEL).",
  });
}

export function formatDoctorHintApiKey(language: CliLanguage): string {
  return localize(language, {
    zh: "API Key 无效，检查 INKOS_LLM_API_KEY",
    en: "API key is invalid — check INKOS_LLM_API_KEY.",
    ru: "Неверный API-ключ — проверь INKOS_LLM_API_KEY.",
  });
}

export function formatConfigListModelsEmpty(language: CliLanguage, service: string): string {
  return localize(language, {
    zh: `${service} 没有可用模型（可能需要 --api-key 和 --base-url）`,
    en: `${service}: no models available (you may need --api-key and --base-url).`,
    ru: `${service}: нет доступных моделей (возможно, нужны --api-key и --base-url).`,
  });
}

export function formatConfigListModelsHeader(
  language: CliLanguage,
  service: string,
  count: number,
): string {
  return localize(language, {
    zh: `${service}：${count} 个模型\n`,
    en: `${service}: ${count} model(s)\n`,
    ru: `${service}: моделей — ${count}\n`,
  });
}

export function formatWriteStateRepairRequired(language: CliLanguage): string {
  return localize(language, {
    zh: "需要先修复 state，已停止后续连写。",
    en: "State repair required before continuing. Stopping batch.",
    ru: "Сначала почини state — пакетная запись остановлена.",
  });
}

export function formatAgentContextSuffix(language: CliLanguage, context: string): string {
  return localize(language, {
    zh: `补充信息：${context}`,
    en: `Additional context: ${context}`,
    ru: `Дополнительный контекст: ${context}`,
  });
}

export function formatInitCreateExample(language: CliLanguage): string {
  return localize(language, {
    zh: "  inkos book create --title '我的小说' --genre xuanhuan --platform tomato",
    en: "  inkos book create --title 'My Novel' --genre progression --platform royalroad --lang en",
    ru: "  inkos book create --title 'Моя книга' --genre urban --platform other --lang ru",
  });
}

export function formatGenreCreateTemplate(
  language: CliLanguage,
  options: { readonly id: string; readonly name: string; readonly numerical: boolean; readonly powerScaling: boolean; readonly eraResearch: boolean },
): string {
  const { id, name, numerical, powerScaling, eraResearch } = options;
  const chapterTypes = localize(language, {
    zh: `["推进章", "布局章", "过渡章", "回收章"]`,
    en: `["progression", "setup", "transition", "payoff"]`,
    ru: `["развитие", "завязка", "переход", "развязка"]`,
  });
  const fatigueWords = localize(language, {
    zh: `["震惊", "不可思议", "难以置信"]`,
    en: `["shocked", "unbelievable", "incredible"]`,
    ru: `["шокирован", "невероятно", "немыслимо"]`,
  });
  const pacingRule = localize(language, {
    zh: `"每2-3章有一个明确的进展或反馈"`,
    en: `"Every 2-3 chapters deliver a clear progression or payoff."`,
    ru: `"Каждые 2-3 главы — явное продвижение или отдача."`,
  });
  const satisfactionTypes = localize(language, {
    zh: `["目标达成", "困难克服", "真相揭示"]`,
    en: `["goal achieved", "obstacle overcome", "truth revealed"]`,
    ru: `["цель достигнута", "препятствие преодолено", "правда раскрыта"]`,
  });
  const tabooHeader = localize(language, {
    zh: "## 题材禁忌",
    en: "## Genre Taboos",
    ru: "## Запреты жанра",
  });
  const tabooHint = localize(language, {
    zh: "- (根据题材添加禁忌)",
    en: "- (add taboos specific to this genre)",
    ru: "- (добавь запреты, характерные для жанра)",
  });
  const narrativeHeader = localize(language, {
    zh: "## 叙事指导",
    en: "## Narrative Guidance",
    ru: "## Указания по нарративу",
  });
  const narrativeHint = localize(language, {
    zh: "(根据题材描述叙事重心和风格要求)",
    en: "(describe narrative focus and style requirements for this genre)",
    ru: "(опиши акценты повествования и требования к стилю для этого жанра)",
  });
  return `---
name: ${name}
id: ${id}
chapterTypes: ${chapterTypes}
fatigueWords: ${fatigueWords}
numericalSystem: ${numerical}
powerScaling: ${powerScaling}
eraResearch: ${eraResearch}
pacingRule: ${pacingRule}
satisfactionTypes: ${satisfactionTypes}
auditDimensions: [1,2,3,6,7,8,9,10,13,14,15,16,17,18,19]
---

${tabooHeader}

${tabooHint}

${narrativeHeader}

${narrativeHint}
`;
}
