/**
 * Structural AI-tell detection — pure rule-based analysis (no LLM).
 *
 * Detects patterns common in AI-generated Chinese text:
 * - dim 20: Paragraph length uniformity (low variance)
 * - dim 21: Filler/hedge word density
 * - dim 22: Formulaic transition patterns
 * - dim 23: List-like structure (consecutive same-prefix sentences)
 */

export interface AITellIssue {
  readonly severity: "warning" | "info";
  readonly category: string;
  readonly description: string;
  readonly suggestion: string;
}

export interface AITellResult {
  readonly issues: ReadonlyArray<AITellIssue>;
}

type AITellLanguage = "zh" | "en" | "ru";

const HEDGE_WORDS: Record<AITellLanguage, ReadonlyArray<string>> = {
  zh: ["似乎", "可能", "或许", "大概", "某种程度上", "一定程度上", "在某种意义上"],
  en: ["seems", "seemed", "perhaps", "maybe", "apparently", "in some ways", "to some extent"],
  ru: ["возможно", "вероятно", "кажется", "пожалуй", "скорее всего", "в каком-то смысле", "отчасти", "как бы", "наверное"],
};

const TRANSITION_WORDS: Record<AITellLanguage, ReadonlyArray<string>> = {
  zh: ["然而", "不过", "与此同时", "另一方面", "尽管如此", "话虽如此", "但值得注意的是"],
  en: ["however", "meanwhile", "on the other hand", "nevertheless", "even so", "still"],
  ru: ["однако", "тем не менее", "вместе с тем", "при этом", "с другой стороны", "несмотря на это", "впрочем", "всё же", "стоит отметить", "следует подчеркнуть"],
};

interface AITellLabels {
  readonly paragraphUniformity: string;
  readonly hedgeDensity: string;
  readonly formulaicTransitions: string;
  readonly listLikeStructure: string;
  readonly paragraphUniformityDesc: (cv: string) => string;
  readonly paragraphUniformitySuggestion: string;
  readonly hedgeDensityDesc: (density: string) => string;
  readonly hedgeDensitySuggestion: string;
  readonly transitionsDesc: (detail: string) => string;
  readonly transitionsSuggestion: string;
  readonly listLikeDesc: (count: number) => string;
  readonly listLikeSuggestion: string;
}

const LABELS: Record<AITellLanguage, AITellLabels> = {
  zh: {
    paragraphUniformity: "段落等长",
    hedgeDensity: "套话密度",
    formulaicTransitions: "公式化转折",
    listLikeStructure: "列表式结构",
    paragraphUniformityDesc: (cv) => `段落长度变异系数仅${cv}（阈值<0.15），段落长度过于均匀，呈现AI生成特征`,
    paragraphUniformitySuggestion: "增加段落长度差异：短段落用于节奏加速或冲击，长段落用于沉浸描写",
    hedgeDensityDesc: (density) => `套话词（似乎/可能/或许等）密度为${density}次/千字（阈值>3），语气过于模糊犹豫`,
    hedgeDensitySuggestion: "用确定性叙述替代模糊表达：去掉「似乎」直接描述状态，用具体细节替代「可能」",
    transitionsDesc: (detail) => `转折词重复使用：${detail}。同一转折模式≥3次暴露AI生成痕迹`,
    transitionsSuggestion: "用情节自然转折替代转折词，或换用不同的过渡手法（动作切入、时间跳跃、视角切换）",
    listLikeDesc: (count) => `检测到${count}句连续以相同开头的句子，呈现列表式AI生成结构`,
    listLikeSuggestion: "变换句式开头：用不同主语、时间词、动作词开头，打破列表感",
  },
  en: {
    paragraphUniformity: "Paragraph uniformity",
    hedgeDensity: "Hedge density",
    formulaicTransitions: "Formulaic transitions",
    listLikeStructure: "List-like structure",
    paragraphUniformityDesc: (cv) => `Paragraph-length coefficient of variation is only ${cv} (threshold <0.15), which suggests unnaturally uniform paragraph sizing`,
    paragraphUniformitySuggestion: "Increase paragraph-length contrast: use shorter beats for impact and longer blocks for immersive detail",
    hedgeDensityDesc: (density) => `Hedge-word density is ${density} per 1k characters (threshold >3), making the prose sound overly tentative`,
    hedgeDensitySuggestion: "Replace hedges with firmer narration: remove vague qualifiers and use concrete detail instead",
    transitionsDesc: (detail) => `Transition words repeat too often: ${detail}. Reusing the same transition pattern 3+ times creates a formulaic AI texture`,
    transitionsSuggestion: "Let scenes pivot through action, timing, or viewpoint shifts instead of repeating the same transitions",
    listLikeDesc: (count) => `Detected ${count} consecutive sentences with the same opening pattern, creating a list-like generated cadence`,
    listLikeSuggestion: "Vary how sentences open: change subject, timing, or action entry to break the list effect",
  },
  ru: {
    paragraphUniformity: "Однородность абзацев",
    hedgeDensity: "Плотность вводных слов",
    formulaicTransitions: "Шаблонные переходы",
    listLikeStructure: "Структура «списком»",
    paragraphUniformityDesc: (cv) => `Коэффициент вариации длины абзацев — всего ${cv} (порог <0,15). Абзацы выровнены неестественно ровно — типичный признак AI-текста`,
    paragraphUniformitySuggestion: "Усиливай контраст длины: короткие абзацы — для ритма и удара, длинные — для погружения и детали",
    hedgeDensityDesc: (density) => `Плотность вводных слов («возможно», «кажется», «как бы») — ${density} раз на 1000 символов (порог >3). Текст звучит расплывчато и неуверенно`,
    hedgeDensitySuggestion: "Заменяй смягчающие обороты прямой констатацией: вместо «казалось» — конкретное действие или сенсорная деталь",
    transitionsDesc: (detail) => `Слова-связки повторяются слишком часто: ${detail}. Повтор одного шаблона связки ≥3 раз — характерный AI-след`,
    transitionsSuggestion: "Связывай сцены через действие, монтаж или смену точки зрения, а не через одни и те же связки",
    listLikeDesc: (count) => `${count} предложений подряд начинаются одинаково — текст уходит в перечислительную AI-структуру`,
    listLikeSuggestion: "Меняй зачины: разные подлежащие, обстоятельства времени, действия в начале — это сбивает «списочный» ритм",
  },
};

/**
 * Analyze text content for structural AI-tell patterns.
 * Returns issues that can be merged into audit results.
 */
export function analyzeAITells(content: string, language: AITellLanguage = "zh"): AITellResult {
  const issues: AITellIssue[] = [];
  const isEnglish = language === "en";
  const isCjkOnly = language === "zh"; // ru/en share whitespace tokenization and Latin punctuation
  const joiner = isCjkOnly ? "、" : ", ";
  const labels = LABELS[language];

  const paragraphs = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  // dim 20: Paragraph length uniformity (needs ≥3 paragraphs)
  if (paragraphs.length >= 3) {
    const paragraphLengths = paragraphs.map((p) => p.length);
    const mean = paragraphLengths.reduce((a, b) => a + b, 0) / paragraphLengths.length;
    if (mean > 0) {
      const variance = paragraphLengths.reduce((sum, l) => sum + (l - mean) ** 2, 0) / paragraphLengths.length;
      const stdDev = Math.sqrt(variance);
      const cv = stdDev / mean;
      if (cv < 0.15) {
        issues.push({
          severity: "warning",
          category: labels.paragraphUniformity,
          description: labels.paragraphUniformityDesc(cv.toFixed(3)),
          suggestion: labels.paragraphUniformitySuggestion,
        });
      }
    }
  }

  // dim 21: Hedge word density
  const totalChars = content.length;
  if (totalChars > 0) {
    let hedgeCount = 0;
    for (const word of HEDGE_WORDS[language]) {
      const regex = new RegExp(word, isCjkOnly ? "g" : "gi");
      const matches = content.match(regex);
      hedgeCount += matches?.length ?? 0;
    }
    const hedgeDensity = hedgeCount / (totalChars / 1000);
    if (hedgeDensity > 3) {
      issues.push({
        severity: "warning",
        category: labels.hedgeDensity,
        description: labels.hedgeDensityDesc(hedgeDensity.toFixed(1)),
        suggestion: labels.hedgeDensitySuggestion,
      });
    }
  }

  // dim 22: Formulaic transition repetition
  const transitionCounts: Record<string, number> = {};
  for (const word of TRANSITION_WORDS[language]) {
    const regex = new RegExp(word, isCjkOnly ? "g" : "gi");
    const matches = content.match(regex);
    const count = matches?.length ?? 0;
    if (count > 0) {
      transitionCounts[isCjkOnly ? word : word.toLowerCase()] = count;
    }
  }
  const repeatedTransitions = Object.entries(transitionCounts)
    .filter(([, count]) => count >= 3);
  if (repeatedTransitions.length > 0) {
    const detail = repeatedTransitions
      .map(([word, count]) => `"${word}"×${count}`)
      .join(joiner);
    issues.push({
      severity: "warning",
      category: labels.formulaicTransitions,
      description: labels.transitionsDesc(detail),
      suggestion: labels.transitionsSuggestion,
    });
  }

  // dim 23: List-like structure (consecutive sentences with same prefix pattern)
  const sentences = content
    .split(isCjkOnly ? /[。！？\n]/ : /[.!?\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2);

  if (sentences.length >= 3) {
    let consecutiveSamePrefix = 1;
    let maxConsecutive = 1;
    for (let i = 1; i < sentences.length; i++) {
      const prevPrefix = isCjkOnly
        ? sentences[i - 1]!.slice(0, 2)
        : sentences[i - 1]!.split(/\s+/)[0]?.toLowerCase() ?? "";
      const currPrefix = isCjkOnly
        ? sentences[i]!.slice(0, 2)
        : sentences[i]!.split(/\s+/)[0]?.toLowerCase() ?? "";
      if (prevPrefix === currPrefix) {
        consecutiveSamePrefix++;
        maxConsecutive = Math.max(maxConsecutive, consecutiveSamePrefix);
      } else {
        consecutiveSamePrefix = 1;
      }
    }
    if (maxConsecutive >= 3) {
      issues.push({
        severity: "info",
        category: labels.listLikeStructure,
        description: labels.listLikeDesc(maxConsecutive),
        suggestion: labels.listLikeSuggestion,
      });
    }
  }

  // isEnglish reserved for future English-specific branches outside the labels table
  void isEnglish;
  return { issues };
}
