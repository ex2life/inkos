import type { ChatDepth } from "./chat-depth.js";

export type TuiLocale = "zh-CN" | "en" | "ru-RU";

export interface TuiCopy {
  readonly locale: TuiLocale;
  readonly labels: {
    readonly project: string;
    readonly book: string;
    readonly depth: string;
    readonly session: string;
    readonly messageCount: (count: number) => string;
    readonly stage: string;
    readonly mode: string;
    readonly model: string;
    readonly error: string;
    readonly recent: string;
    readonly pending: string;
    readonly draft: string;
    readonly ready: string;
    readonly none: string;
    readonly notConfigured: string;
    readonly unknown: string;
    readonly chapterShort: (chapterNumber: number) => string;
  };
  readonly modeLabels: Record<string, string>;
  readonly composer: {
    readonly placeholder: string;
    readonly emptyConversation: string;
    readonly helper: string;
    readonly submitting: string;
    readonly failed: string;
    readonly ready: string;
  };
  readonly notes: {
    readonly help: string;
    readonly status: (stage: string, mode: string) => string;
    readonly config: string;
    readonly depthSet: (depthLabel: string) => string;
    readonly newBookGuide: string;
    readonly noLlmConfig: string;
    readonly setupProvider: string;
    readonly toolInitFailed: (message: string) => string;
    readonly toolInitHint: string;
  };
  readonly roles: {
    readonly user: string;
    readonly assistant: string;
    readonly system: string;
  };
  readonly activity: Record<"thinking" | "checking" | "writing" | "reviewing" | "updating", string>;
  readonly stageLabels: {
    readonly completed: string;
    readonly failed: string;
    readonly blocked: string;
    readonly waitingHuman: string;
    readonly pausedByUser: string;
    readonly readyToContinue: string;
  };
  readonly depthLabels: Record<ChatDepth, string>;
  readonly results: {
    readonly modeSwitched: (mode: string) => string;
    readonly booksListed: string;
    readonly activeBook: (bookId: string) => string;
    readonly completed: (intent: string) => string;
    readonly intentLabels: Partial<Record<string, string>>;
  };
  readonly effects: {
    readonly themeLabels: Record<
      "thinking" | "writing" | "auditing" | "revising" | "planning" | "composing" | "loading",
      string
    >;
    readonly intentBadges: Record<
      | "write_next"
      | "revise_chapter"
      | "rewrite_chapter"
      | "update_focus"
      | "explain_status"
      | "explain_failure"
      | "pause_book"
      | "list_books"
      | "select_book"
      | "switch_mode"
      | "rename_entity"
      | "patch_chapter_text"
      | "edit_truth",
      string
    >;
    readonly help: {
      readonly sections: ReadonlyArray<{
        readonly title: string;
        readonly commands: ReadonlyArray<readonly [string, string]>;
      }>;
      readonly footerTitle: string;
      readonly footerExamples: ReadonlyArray<string>;
    };
  };
  readonly setup: {
    readonly title: string;
    readonly subtitle: string;
    readonly steps: {
      readonly provider: string;
      readonly baseUrl: string;
      readonly apiKey: string;
      readonly model: string;
      readonly scope: string;
    };
    readonly hints: {
      readonly provider: string;
      readonly baseUrl: string;
      readonly model: string;
      readonly scope: string;
    };
    readonly defaults: {
      readonly provider: string;
      readonly baseUrl: string;
      readonly scope: string;
    };
    readonly scopeChoices: {
      readonly global: string;
      readonly project: string;
    };
    readonly savedTo: string;
    readonly autoInit: {
      readonly initializing: (projectName: string) => string;
      readonly initialized: string;
      readonly envTemplateHeader: string;
    };
  };
  readonly slash: {
    readonly newCommandHint: string;
  };
}

const ZH_CN: TuiCopy = {
  locale: "zh-CN",
  labels: {
    project: "项目",
    book: "作品",
    depth: "深度",
    session: "会话",
    messageCount: (count) => `${count} 条消息`,
    stage: "阶段",
    mode: "模式",
    model: "模型",
    error: "错误",
    recent: "最近",
    pending: "待确认",
    draft: "草稿",
    ready: "就绪",
    none: "无",
    notConfigured: "未配置",
    unknown: "未知",
    chapterShort: (chapterNumber) => `第 ${chapterNumber} 章`,
  },
  modeLabels: {
    auto: "自动",
    semi: "半自动",
    manual: "手动",
  },
  composer: {
    placeholder: "告诉 InkOS 要写什么、修改什么，或解释什么…",
    emptyConversation: "先告诉 InkOS 你要做什么。",
    helper: "回车发送 • /new 输入你的想法，自动构建新书 • /draft • /create • /write • /books • /open • /mode • /depth • /help",
    submitting: "处理中…",
    failed: "上次请求失败",
    ready: "就绪",
  },
  notes: {
    help: "可用命令：/new（输入想法，自动构建新书）、/draft、/create、/discard、/write、/books、/open、/mode、/rewrite、/focus、/truth、/rename、/replace、/export、/status、/clear、/depth、/quit。也支持直接输入自然语言。",
    status: (stage, mode) => `当前状态：${stage}（${mode}）。`,
    config: "当前 Ink 仪表盘里还不支持交互式 /config。请使用 inkos config set-global。",
    depthSet: (depthLabel) => `思考深度已切换为 ${depthLabel}。`,
    newBookGuide: "开始构思新书。直接描述你的想法——题材、世界观、主角、核心冲突都可以。AI 会逐步引导你完善草案，随时用 /draft 查看进度，/create 建书。",
    noLlmConfig: "未发现 LLM 配置。",
    setupProvider: "先配置 API 提供方。",
    toolInitFailed: (message) => `初始化 TUI 工具失败：${message}`,
    toolInitHint: "请检查 .env，或运行：inkos config set-global",
  },
  roles: {
    user: "你",
    assistant: "InkOS",
    system: "系统",
  },
  activity: {
    thinking: "思考中",
    checking: "检查中",
    writing: "写作中",
    reviewing: "审阅中",
    updating: "更新中",
  },
  stageLabels: {
    completed: "已完成",
    failed: "失败",
    blocked: "已阻塞",
    waitingHuman: "等待你的决定",
    pausedByUser: "已由用户暂停",
    readyToContinue: "可继续执行",
  },
  depthLabels: {
    light: "轻量",
    normal: "标准",
    deep: "深入",
  },
  results: {
    modeSwitched: (mode) => `已切换到 ${mode} 模式。`,
    booksListed: "已列出作品。",
    activeBook: (bookId) => `当前作品：${bookId}`,
    completed: (intent) => `已完成 ${intent}`,
    intentLabels: {
      write_next: "已写完下一章",
      revise_chapter: "已修订章节",
      rewrite_chapter: "已重写章节",
      update_focus: "已更新焦点",
      explain_status: "状态说明",
      explain_failure: "失败说明",
      pause_book: "已暂停作品",
      rename_entity: "已重命名实体",
      patch_chapter_text: "已修补正文",
      edit_truth: "已更新真相文件",
    },
  },
  effects: {
    themeLabels: {
      thinking: "思考中",
      writing: "写作中",
      auditing: "审计中",
      revising: "修订中",
      planning: "规划中",
      composing: "生成中",
      loading: "加载中",
    },
    intentBadges: {
      write_next: " 写作 ",
      revise_chapter: " 修订 ",
      rewrite_chapter: " 重写 ",
      update_focus: " 焦点 ",
      explain_status: " 状态 ",
      explain_failure: " 调试 ",
      pause_book: " 暂停 ",
      list_books: " 作品 ",
      select_book: " 选择 ",
      switch_mode: " 模式 ",
      rename_entity: " 改名 ",
      patch_chapter_text: " 修补 ",
      edit_truth: " 真相 ",
    },
    help: {
      sections: [
        {
          title: "写作",
          commands: [
            ["/write", "完整跑一轮下一章写作"],
            ["/rewrite <n>", "从头重写第 N 章"],
          ],
        },
        {
          title: "导航",
          commands: [
            ["/books", "列出全部作品"],
            ["/open <book>", "切换当前作品"],
            ["/status", "查看当前状态"],
          ],
        },
        {
          title: "控制",
          commands: [
            ["/mode <auto|semi|manual>", "切换自动化模式"],
            ["/focus <text>", "更新当前焦点"],
          ],
        },
        {
          title: "会话",
          commands: [
            ["/clear", "清空当前屏幕"],
            ["/help", "显示帮助"],
            ["/quit", "退出 InkOS TUI"],
          ],
        },
      ],
      footerTitle: "自然语言同样可用：",
      footerExamples: ['"继续写" "写下一章" "暂停" "把林烬改成张三"'],
    },
  },
  setup: {
    title: "模型配置",
    subtitle: "配置模型服务后即可开始使用。",
    steps: {
      provider: "服务提供方",
      baseUrl: "接口地址",
      apiKey: "API 密钥",
      model: "模型",
      scope: "保存范围",
    },
    hints: {
      provider: "openai / anthropic / custom（兼容 OpenAI 的代理）",
      baseUrl: "你的 API 入口地址",
      model: "例如 gpt-5.4、claude-sonnet-4-20250514、deepseek-chat",
      scope: "global = 所有项目，project = 仅当前目录",
    },
    defaults: {
      provider: "openai",
      baseUrl: "（默认）",
      scope: "[global]",
    },
    scopeChoices: {
      global: "所有项目",
      project: "当前目录",
    },
    savedTo: "已保存到",
    autoInit: {
      initializing: (projectName) => `正在初始化项目：${projectName}/ ...`,
      initialized: "项目已初始化",
      envTemplateHeader: "# LLM 配置 —— 运行 inkos tui 进行交互式配置",
    },
  },
  slash: {
    newCommandHint: "/new 输入你的想法",
  },
};

const EN: TuiCopy = {
  locale: "en",
  labels: {
    project: "Project",
    book: "Book",
    depth: "Depth",
    session: "Session",
    messageCount: (count) => `${count} msgs`,
    stage: "Stage",
    mode: "Mode",
    model: "Model",
    error: "Error",
    recent: "Recent",
    pending: "Pending",
    draft: "Draft",
    ready: "Ready",
    none: "none",
    notConfigured: "not configured",
    unknown: "unknown",
    chapterShort: (chapterNumber) => `ch.${chapterNumber}`,
  },
  modeLabels: {
    auto: "auto",
    semi: "semi",
    manual: "manual",
  },
  composer: {
    placeholder: "Ask InkOS to write, revise, or explain…",
    emptyConversation: "Start by asking InkOS what to do.",
    helper: "Enter to send • /new describe your idea to start a book • /draft • /create • /write • /books • /open • /mode • /depth • /help",
    submitting: "Submitting…",
    failed: "Last request failed",
    ready: "Ready",
  },
  notes: {
    help: "Commands: /new (describe your idea to start a book), /draft, /create, /discard, /write, /books, /open, /mode, /rewrite, /focus, /truth, /rename, /replace, /export, /status, /clear, /depth, /quit. Natural language still works.",
    status: (stage, mode) => `Status: ${stage} (${mode}).`,
    config: "Interactive /config is not available inside the Ink dashboard yet. Use inkos config set-global.",
    depthSet: (depthLabel) => `Thinking depth set to ${depthLabel}.`,
    newBookGuide: "Starting a new book. Describe your idea — genre, world, protagonist, core conflict, anything. The AI will guide you step by step. Use /draft to check progress, /create to finalize.",
    noLlmConfig: "No LLM configuration found.",
    setupProvider: "Let's set up your API provider first.",
    toolInitFailed: (message) => `Failed to initialize TUI tools: ${message}`,
    toolInitHint: "Check your .env or run: inkos config set-global",
  },
  roles: {
    user: "You",
    assistant: "InkOS",
    system: "System",
  },
  activity: {
    thinking: "thinking",
    checking: "checking",
    writing: "writing",
    reviewing: "reviewing",
    updating: "updating",
  },
  stageLabels: {
    completed: "completed",
    failed: "failed",
    blocked: "blocked",
    waitingHuman: "waiting for your decision",
    pausedByUser: "paused by user",
    readyToContinue: "ready to continue",
  },
  depthLabels: {
    light: "light",
    normal: "normal",
    deep: "deep",
  },
  results: {
    modeSwitched: (mode) => `Mode switched to ${mode}.`,
    booksListed: "Books listed.",
    activeBook: (bookId) => `Active book: ${bookId}`,
    completed: (intent) => `Completed ${intent}`,
    intentLabels: {
      write_next: "Chapter written",
      revise_chapter: "Chapter revised",
      rewrite_chapter: "Chapter rewritten",
      update_focus: "Focus updated",
      explain_status: "Status",
      explain_failure: "Explanation",
      pause_book: "Book paused",
      rename_entity: "Entity renamed",
      patch_chapter_text: "Text patched",
      edit_truth: "Truth file updated",
    },
  },
  effects: {
    themeLabels: {
      thinking: "thinking",
      writing: "writing",
      auditing: "auditing",
      revising: "revising",
      planning: "planning",
      composing: "composing",
      loading: "loading",
    },
    intentBadges: {
      write_next: " WRITE ",
      revise_chapter: " REVISE ",
      rewrite_chapter: " REWRITE ",
      update_focus: " FOCUS ",
      explain_status: " STATUS ",
      explain_failure: " DEBUG ",
      pause_book: " PAUSE ",
      list_books: " BOOKS ",
      select_book: " SELECT ",
      switch_mode: " MODE ",
      rename_entity: " RENAME ",
      patch_chapter_text: " PATCH ",
      edit_truth: " TRUTH ",
    },
    help: {
      sections: [
        {
          title: "Writing",
          commands: [
            ["/write", "Write the next chapter (full pipeline)"],
            ["/rewrite <n>", "Rewrite chapter N from scratch"],
          ],
        },
        {
          title: "Navigation",
          commands: [
            ["/books", "List all books"],
            ["/open <book>", "Select active book"],
            ["/status", "Show current status"],
          ],
        },
        {
          title: "Control",
          commands: [
            ["/mode <auto|semi|manual>", "Switch automation mode"],
            ["/focus <text>", "Update current focus"],
          ],
        },
        {
          title: "Session",
          commands: [
            ["/clear", "Clear screen"],
            ["/help", "Show this help"],
            ["/quit", "Exit InkOS TUI"],
          ],
        },
      ],
      footerTitle: "Natural language also works:",
      footerExamples: ['"continue writing" "write next chapter" "pause" "rename Lin Jin to Zhang San"'],
    },
  },
  setup: {
    title: "LLM Setup",
    subtitle: "Configure your model provider to start writing.",
    steps: {
      provider: "Provider",
      baseUrl: "Base URL",
      apiKey: "API Key",
      model: "Model",
      scope: "Save scope",
    },
    hints: {
      provider: "openai / anthropic / custom (OpenAI-compatible proxy)",
      baseUrl: "Your API endpoint",
      model: "e.g. gpt-4o, claude-sonnet-4-20250514, deepseek-chat",
      scope: "global = all projects, project = this directory only",
    },
    defaults: {
      provider: "openai",
      baseUrl: "(default)",
      scope: "[global]",
    },
    scopeChoices: {
      global: "all projects",
      project: "this directory",
    },
    savedTo: "Saved to",
    autoInit: {
      initializing: (projectName) => `Initializing project in ${projectName}/ ...`,
      initialized: "Project initialized",
      envTemplateHeader: "# LLM Configuration — run inkos tui to configure interactively",
    },
  },
  slash: {
    newCommandHint: "/new describe your idea",
  },
};

const RU_RU: TuiCopy = {
  locale: "ru-RU",
  labels: {
    project: "Проект",
    book: "Книга",
    depth: "Глубина",
    session: "Сессия",
    messageCount: (count) => `${count} сообщ.`,
    stage: "Этап",
    mode: "Режим",
    model: "Модель",
    error: "Ошибка",
    recent: "Недавнее",
    pending: "Ожидает",
    draft: "Черновик",
    ready: "Готово",
    none: "нет",
    notConfigured: "не настроено",
    unknown: "неизвестно",
    chapterShort: (chapterNumber) => `гл.${chapterNumber}`,
  },
  modeLabels: {
    auto: "авто",
    semi: "полуавто",
    manual: "ручной",
  },
  composer: {
    placeholder: "Скажите InkOS, что написать, исправить или объяснить…",
    emptyConversation: "Начните с того, что попросите InkOS сделать.",
    helper: "Enter — отправить • /new опишите идею для новой книги • /draft • /create • /write • /books • /open • /mode • /depth • /help",
    submitting: "Отправка…",
    failed: "Последний запрос не удался",
    ready: "Готово",
  },
  notes: {
    help: "Команды: /new (опишите идею для новой книги), /draft, /create, /discard, /write, /books, /open, /mode, /rewrite, /focus, /truth, /rename, /replace, /export, /status, /clear, /depth, /quit. Естественный язык также работает.",
    status: (stage, mode) => `Статус: ${stage} (${mode}).`,
    config: "Интерактивный /config пока недоступен в Ink-дашборде. Используйте inkos config set-global.",
    depthSet: (depthLabel) => `Глубина мышления переключена на ${depthLabel}.`,
    newBookGuide: "Начинаем новую книгу. Опишите идею — жанр, мир, главного героя, основной конфликт, что угодно. AI проведёт вас шаг за шагом. /draft — проверить прогресс, /create — финализировать.",
    noLlmConfig: "Конфигурация LLM не найдена.",
    setupProvider: "Сначала настроим провайдера API.",
    toolInitFailed: (message) => `Не удалось инициализировать инструменты TUI: ${message}`,
    toolInitHint: "Проверьте .env или запустите: inkos config set-global",
  },
  roles: {
    user: "Вы",
    assistant: "InkOS",
    system: "Система",
  },
  activity: {
    thinking: "думаю",
    checking: "проверяю",
    writing: "пишу",
    reviewing: "вычитываю",
    updating: "обновляю",
  },
  stageLabels: {
    completed: "завершено",
    failed: "ошибка",
    blocked: "заблокировано",
    waitingHuman: "жду вашего решения",
    pausedByUser: "приостановлено пользователем",
    readyToContinue: "готово к продолжению",
  },
  depthLabels: {
    light: "лёгкая",
    normal: "обычная",
    deep: "глубокая",
  },
  results: {
    modeSwitched: (mode) => `Режим переключён на ${mode}.`,
    booksListed: "Книги перечислены.",
    activeBook: (bookId) => `Активная книга: ${bookId}`,
    completed: (intent) => `Выполнено: ${intent}`,
    intentLabels: {
      write_next: "Глава написана",
      revise_chapter: "Глава отредактирована",
      rewrite_chapter: "Глава переписана",
      update_focus: "Фокус обновлён",
      explain_status: "Статус",
      explain_failure: "Объяснение",
      pause_book: "Книга приостановлена",
      rename_entity: "Сущность переименована",
      patch_chapter_text: "Текст исправлен",
      edit_truth: "Файл правды обновлён",
    },
  },
  effects: {
    themeLabels: {
      thinking: "размышляю",
      writing: "пишу",
      auditing: "проверяю",
      revising: "правлю",
      planning: "планирую",
      composing: "составляю",
      loading: "загружаю",
    },
    intentBadges: {
      write_next: " ПИСАТЬ ",
      revise_chapter: " ПРАВКА ",
      rewrite_chapter: " ПЕРЕПИСАТЬ ",
      update_focus: " ФОКУС ",
      explain_status: " СТАТУС ",
      explain_failure: " ОТЛАДКА ",
      pause_book: " ПАУЗА ",
      list_books: " КНИГИ ",
      select_book: " ВЫБОР ",
      switch_mode: " РЕЖИМ ",
      rename_entity: " ПЕРЕИМ. ",
      patch_chapter_text: " ПАТЧ ",
      edit_truth: " ПРАВДА ",
    },
    help: {
      sections: [
        {
          title: "Письмо",
          commands: [
            ["/write", "Полный прогон следующей главы"],
            ["/rewrite <n>", "Переписать главу N с нуля"],
          ],
        },
        {
          title: "Навигация",
          commands: [
            ["/books", "Список всех книг"],
            ["/open <book>", "Выбрать активную книгу"],
            ["/status", "Показать текущий статус"],
          ],
        },
        {
          title: "Управление",
          commands: [
            ["/mode <auto|semi|manual>", "Переключить режим автоматизации"],
            ["/focus <text>", "Обновить текущий фокус"],
          ],
        },
        {
          title: "Сессия",
          commands: [
            ["/clear", "Очистить экран"],
            ["/help", "Показать эту справку"],
            ["/quit", "Выйти из InkOS TUI"],
          ],
        },
      ],
      footerTitle: "Естественный язык тоже работает:",
      footerExamples: ['"продолжай писать" "следующая глава" "пауза" "переименуй Анну в Елену"'],
    },
  },
  setup: {
    title: "Настройка LLM",
    subtitle: "Настройте провайдера модели, чтобы начать писать.",
    steps: {
      provider: "Провайдер",
      baseUrl: "Base URL",
      apiKey: "API-ключ",
      model: "Модель",
      scope: "Область сохранения",
    },
    hints: {
      provider: "openai / anthropic / custom (OpenAI-совместимый прокси)",
      baseUrl: "Адрес вашего API",
      model: "напр. gpt-4o, claude-sonnet-4-20250514, deepseek-chat",
      scope: "global = все проекты, project = только этот каталог",
    },
    defaults: {
      provider: "openai",
      baseUrl: "(по умолчанию)",
      scope: "[global]",
    },
    scopeChoices: {
      global: "все проекты",
      project: "этот каталог",
    },
    savedTo: "Сохранено в",
    autoInit: {
      initializing: (projectName) => `Инициализация проекта: ${projectName}/ ...`,
      initialized: "Проект инициализирован",
      envTemplateHeader: "# Конфигурация LLM — запустите inkos tui для интерактивной настройки",
    },
  },
  slash: {
    newCommandHint: "/new опишите вашу идею",
  },
};

const COPIES: Record<TuiLocale, TuiCopy> = {
  "zh-CN": ZH_CN,
  en: EN,
  "ru-RU": RU_RU,
};

export function resolveTuiLocale(
  env: NodeJS.ProcessEnv = process.env,
  preferredLanguage?: string,
): TuiLocale {
  const requested = normalizeLocale(env.INKOS_TUI_LOCALE ?? env.INKOS_LOCALE);
  if (requested) {
    return requested;
  }

  const preferred = normalizeLocale(preferredLanguage);
  if (preferred) {
    return preferred;
  }

  const detected = normalizeLocale(env.LC_ALL ?? env.LC_MESSAGES ?? env.LANG);
  return detected ?? "zh-CN";
}

export function getTuiCopy(locale: TuiLocale): TuiCopy {
  return COPIES[locale];
}

export function normalizeStageLabel(label: string, copy: TuiCopy): string {
  const normalized = label.trim().toLowerCase();
  if (!normalized) {
    return label;
  }

  const replacements: Array<[RegExp, string]> = [
    [/^thinking\b/i, copy.activity.thinking],
    [/^checking\b/i, copy.activity.checking],
    [/^writing\b/i, copy.activity.writing],
    [/^reviewing\b/i, copy.activity.reviewing],
    [/^updating\b/i, copy.activity.updating],
    [/^completed\b/i, copy.stageLabels.completed],
    [/^failed\b/i, copy.stageLabels.failed],
    [/^blocked\b/i, copy.stageLabels.blocked],
    [/^waiting_human\b/i, copy.stageLabels.waitingHuman],
    [/^paused by user\b/i, copy.stageLabels.pausedByUser],
    [/^ready to continue\b/i, copy.stageLabels.readyToContinue],
  ];

  for (const [pattern, value] of replacements) {
    if (pattern.test(label)) {
      // For English, keep the original label (already in English);
      // for other locales, use the translated value
      return copy.locale === "en" ? label : value;
    }
  }

  if (normalized === "idle") {
    return copy.labels.ready;
  }

  return label;
}

export function formatModeLabel(mode: string, copy: TuiCopy): string {
  return copy.modeLabels[mode] ?? mode;
}

function normalizeLocale(value: string | undefined): TuiLocale | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized === "auto") {
    return undefined;
  }

  if (normalized.startsWith("zh")) {
    return "zh-CN";
  }

  if (normalized.startsWith("en")) {
    return "en";
  }

  if (normalized.startsWith("ru")) {
    return "ru-RU";
  }

  return undefined;
}
