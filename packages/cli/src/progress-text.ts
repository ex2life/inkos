import {
  formatImportChaptersComplete,
  formatImportChaptersDiscovery,
  formatImportChaptersResume,
  formatWriteNextComplete,
  formatWriteNextProgress,
  formatWriteNextResultLines,
  type CliLanguage,
} from "./localization.js";

export { type CliLanguage };

export function formatWriteStartLine(
  language: CliLanguage,
  current: number,
  total: number,
  bookId: string,
): string {
  return formatWriteNextProgress(language, current, total, bookId);
}

export function formatWriteCompletionLines(
  language: CliLanguage,
  result: {
    readonly chapterNumber: number;
    readonly title: string;
    readonly wordCount: number;
    readonly passedAudit: boolean;
    readonly revised: boolean;
    readonly status: string;
    readonly issues: ReadonlyArray<{
      readonly severity: string;
      readonly category: string;
      readonly description: string;
    }>;
  },
): string[] {
  return [...formatWriteNextResultLines(language, result), ""];
}

export function formatWriteDoneLine(language: CliLanguage): string {
  return formatWriteNextComplete(language);
}

export function formatImportDiscoveryLine(
  language: CliLanguage,
  chapterCount: number,
  bookId: string,
): string {
  return formatImportChaptersDiscovery(language, chapterCount, bookId);
}

export function formatImportResumeLine(
  language: CliLanguage,
  resumeFrom: number,
): string {
  return formatImportChaptersResume(language, resumeFrom);
}

export function formatImportCompletionLines(
  language: CliLanguage,
  result: {
    readonly importedCount: number;
    readonly totalCountLabel: string;
    readonly nextChapter: number;
    readonly bookId: string;
  },
): string[] {
  const pickHeader = (): string => {
    if (language === "en") return "Import complete:";
    if (language === "ru") return "Импорт завершён:";
    return "导入完成：";
  };
  const pickImported = (): string => {
    if (language === "en") return `  Chapters imported: ${result.importedCount}`;
    if (language === "ru") return `  Импортировано глав: ${result.importedCount}`;
    return `  已导入章节：${result.importedCount}`;
  };
  const pickTotal = (): string => {
    if (language === "en") return `  Total length: ${result.totalCountLabel}`;
    if (language === "ru") return `  Общий объём: ${result.totalCountLabel}`;
    return `  总长度：${result.totalCountLabel}`;
  };
  const pickNext = (): string => {
    if (language === "en") return `  Next chapter number: ${result.nextChapter}`;
    if (language === "ru") return `  Номер следующей главы: ${result.nextChapter}`;
    return `  下一章编号：${result.nextChapter}`;
  };
  const pickRun = (): string => {
    if (language === "en") return `Run "inkos write next ${result.bookId}" to continue writing.`;
    if (language === "ru") return `Запусти «inkos write next ${result.bookId}», чтобы продолжить писать.`;
    return `运行 "inkos write next ${result.bookId}" 继续写作。`;
  };
  return [pickHeader(), pickImported(), pickTotal(), pickNext(), "", pickRun()];
}
