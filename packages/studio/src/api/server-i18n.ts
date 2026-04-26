// Backend-only i18n table for Studio HTTP responses, validation messages,
// and status descriptions. The React `use-i18n` hook lives in `src/hooks/`
// and cannot be imported from server code, so this module mirrors the same
// tri-language pattern in plain TS.
//
// Do NOT add UI-only strings here — keep this table focused on what the
// Studio backend actually emits to clients.

export type ServerLang = "zh" | "en" | "ru";

export const SERVER_STRINGS = {
  // --- Service probe / connection errors ---
  // Used as a substring marker against errors thrown by the core LLM
  // provider (`wrapLLMError` in core/src/llm/provider.ts). Keep these
  // values in sync with the strings core emits for each language.
  "probe.upstreamDetail": {
    zh: "上游详情：",
    en: "Upstream detail: ",
    ru: "Подробности от провайдера: ",
  },
  // Note on punctuation: the zh strings keep the original fullwidth colon
  // ("：") with no trailing space — that's how they have shipped and what
  // existing fixtures match. en/ru use the natural ASCII colon + space.
  "probe.serviceLabel": {
    zh: "服务商：",
    en: "Service: ",
    ru: "Сервис: ",
  },
  "probe.testModelLabel": {
    zh: "测试模型：",
    en: "Test model: ",
    ru: "Проверочная модель: ",
  },
  "probe.modelUndetermined": {
    zh: "未确定",
    en: "undetermined",
    ru: "не определена",
  },
  "probe.protocolLabel": {
    zh: "协议：",
    en: "Protocol: ",
    ru: "Протокол: ",
  },
  "probe.protocolResponses": {
    zh: "Responses",
    en: "Responses",
    ru: "Responses",
  },
  "probe.protocolChat": {
    zh: "Chat / Completions",
    en: "Chat / Completions",
    ru: "Chat / Completions",
  },
  "probe.streaming": {
    zh: "流式",
    en: "streaming",
    ru: "потоковый",
  },
  "probe.nonStreaming": {
    zh: "非流式",
    en: "non-streaming",
    ru: "не потоковый",
  },
  "probe.baseUrlLabel": {
    zh: "Base URL：",
    en: "Base URL: ",
    ru: "Base URL: ",
  },
  "probe.googleHeader": {
    zh: "Google Gemini 测试连接失败。",
    en: "Google Gemini test connection failed.",
    ru: "Тест соединения с Google Gemini не пройден.",
  },
  "probe.googleChecksHeader": {
    zh: "请优先检查：",
    en: "Please check:",
    ru: "Проверьте по порядку:",
  },
  "probe.googleCheck1": {
    zh: "1. API Key 是否来自 Google AI Studio 的 Gemini API key，而不是 OAuth、Vertex AI 或其它 Google 服务凭据。",
    en: "1. The API key must come from Google AI Studio's Gemini API key — not OAuth, Vertex AI, or other Google service credentials.",
    ru: "1. API key должен быть получен из Google AI Studio как Gemini API key, а не из OAuth, Vertex AI или других сервисов Google.",
  },
  "probe.googleCheck2": {
    zh: "2. 该 key 所属项目是否已启用 Gemini API，并且没有被限制到其它 API、来源或服务。",
    en: "2. The key's project must have Gemini API enabled and must not be restricted to other APIs, referrers, or services.",
    ru: "2. В проекте этого key должен быть включён Gemini API, и не должно быть ограничений на другие API, источники или сервисы.",
  },
  "probe.googleCheck3": {
    zh: "3. 当前地区/账号是否允许访问 Gemini API。",
    en: "3. The current region / account must be allowed to access the Gemini API.",
    ru: "3. Текущий регион и аккаунт должны иметь доступ к Gemini API.",
  },
  "probe.googleCheck4": {
    zh: "4. 如果 key 曾经泄露，请在 AI Studio 重新生成后再保存。",
    en: "4. If the key was ever leaked, regenerate it in AI Studio before saving.",
    ru: "4. Если key мог быть скомпрометирован, перевыпустите его в AI Studio и сохраните заново.",
  },
  // No-op suffix — kept inline so the prefix carries the colon/space split.
  "probe.upstreamReturn": {
    zh: "上游返回：",
    en: "Upstream response: ",
    ru: "Ответ сервиса: ",
  },
  "probe.serviceTestFailed": {
    zh: "{service} 测试连接失败。",
    en: "{service} test connection failed.",
    ru: "Тест соединения с {service} не пройден.",
  },
  "probe.moonshotHints": {
    zh: "请优先检查模型是否可用，以及 kimi-k2.x 这类模型是否需要 temperature=1。",
    en: "Check that the model is available, and remember that models like kimi-k2.x may require temperature=1.",
    ru: "Проверьте доступность модели и учтите, что моделям вроде kimi-k2.x может требоваться temperature=1.",
  },
  "probe.genericHints": {
    zh: "请检查 API Key、模型可用性、账号额度，以及协议类型是否匹配该服务商。",
    en: "Check the API key, model availability, account quota, and that the protocol type matches the provider.",
    ru: "Проверьте API key, доступность модели, квоту аккаунта и соответствие типа протокола сервису.",
  },
  "probe.upstreamStatus": {
    zh: "服务商返回 {status}: {body}",
    en: "Provider returned {status}: {body}",
    ru: "Сервис вернул {status}: {body}",
  },
  "probe.invalidApiKey": {
    zh: "API Key 无效或无权访问模型列表。",
    en: "API key is invalid or not authorized to list models.",
    ru: "API key недействителен либо не имеет доступа к списку моделей.",
  },
  "probe.cannotResolveModel": {
    zh: "无法自动确定模型，请先填写可用模型或提供支持 /models 的服务端点。",
    en: "Cannot auto-detect a model. Fill in an available model first or provide an endpoint that supports /models.",
    ru: "Не удалось автоматически определить модель. Укажите доступную модель или используйте сервис, поддерживающий /models.",
  },
  "probe.autoProbeFailed": {
    zh: "自动探测失败",
    en: "Auto-probe failed",
    ru: "Автоматическая проверка не пройдена",
  },
  "probe.connectionFailed": {
    zh: "连接失败",
    en: "Connection failed",
    ru: "Соединение не установлено",
  },

  // --- Non-text model warning ---
  "model.notTextChat": {
    zh: "模型 {model} 不适合文本聊天/写作。请在模型选择器中改用文本模型，例如 gemini-2.5-flash、gemini-2.5-pro 或对应服务的 chat 模型。",
    en: "Model {model} is not suitable for text chat / writing. Switch to a text model in the model picker — for example gemini-2.5-flash, gemini-2.5-pro, or the provider's chat model.",
    ru: "Модель {model} не подходит для текстового чата и письма. Выберите в селекторе текстовую модель, например gemini-2.5-flash, gemini-2.5-pro или chat-модель соответствующего сервиса.",
  },

  // --- Service config / validation ---
  "config.envSwitchUnsupported": {
    zh: "Studio 运行时不支持切换到 env；env 只在 CLI/daemon/部署运行时作为覆盖层使用。",
    en: "Studio runtime does not support switching to env; env is only used as an overlay for CLI / daemon / deployment runtimes.",
    ru: "Studio во время выполнения не поддерживает переключение на env; env применяется только как наложение для CLI, daemon и развёртываний.",
  },
  "config.apiKeyRequired": {
    zh: "API Key 不能为空",
    en: "API key is required",
    ru: "Требуется указать API key",
  },
  "config.unknownService": {
    zh: "未知服务商: {service}",
    en: "Unknown service: {service}",
    ru: "Неизвестный сервис: {service}",
  },

  // --- Agent errors ---
  // Use {service} placeholder so word order works for every locale.
  "agent.configureKeyError": {
    zh: "请先为 {service} 配置 API Key",
    en: "Configure an API key for {service} first",
    ru: "Сначала настройте API key для {service}",
  },
  "agent.configureKeyResponse": {
    zh: "请先在模型配置中为 {service} 填写 API Key，然后再试。",
    en: "Set the API key for {service} in model settings, then try again.",
    ru: "Укажите API key для {service} в настройках моделей и повторите попытку.",
  },
  "agent.emptyResponse": {
    zh: "模型未返回文本内容。请检查协议类型（chat/responses）、流式开关或上游服务兼容性。",
    en: "The model returned no text. Check the protocol type (chat/responses), the streaming toggle, or upstream service compatibility.",
    ru: "Модель не вернула текст. Проверьте тип протокола (chat/responses), переключатель потоковой передачи и совместимость с сервисом.",
  },
  "agent.busyMessage": {
    zh: "正在处理中，请等待当前操作完成",
    en: "Processing in progress; please wait for the current operation to finish",
    ru: "Идёт обработка; дождитесь завершения текущей операции",
  },
  "agent.busyResponse": {
    zh: "正在处理中，请等待当前操作完成后再发送。",
    en: "Processing in progress. Please wait for the current operation to finish before sending again.",
    ru: "Идёт обработка. Дождитесь завершения текущей операции, прежде чем отправлять снова.",
  },

  // --- Pipeline stage labels (writer) ---
  "stage.writer.prepareInput": {
    zh: "准备章节输入",
    en: "Prepare chapter input",
    ru: "Подготовка исходных данных главы",
  },
  "stage.writer.draft": {
    zh: "撰写章节草稿",
    en: "Draft chapter",
    ru: "Написание черновика главы",
  },
  "stage.writer.persistFinal": {
    zh: "落盘最终章节",
    en: "Persist final chapter",
    ru: "Сохранение итоговой главы",
  },
  "stage.writer.generateTruth": {
    zh: "生成最终真相文件",
    en: "Generate final truth files",
    ru: "Формирование итоговых truth-файлов",
  },
  "stage.writer.validateTruth": {
    zh: "校验真相文件变更",
    en: "Validate truth-file changes",
    ru: "Проверка изменений truth-файлов",
  },
  "stage.writer.syncMemory": {
    zh: "同步记忆索引",
    en: "Sync memory index",
    ru: "Синхронизация индекса памяти",
  },
  "stage.writer.updateIndex": {
    zh: "更新章节索引与快照",
    en: "Update chapter index and snapshot",
    ru: "Обновление индекса глав и снимка",
  },

  // --- Pipeline stage labels (architect) ---
  "stage.architect.generateBase": {
    zh: "生成基础设定",
    en: "Generate base setting",
    ru: "Формирование базового сеттинга",
  },
  "stage.architect.saveBookConfig": {
    zh: "保存书籍配置",
    en: "Save book config",
    ru: "Сохранение конфигурации книги",
  },
  "stage.architect.writeBaseFile": {
    zh: "写入基础设定文件",
    en: "Write base setting file",
    ru: "Запись файла базового сеттинга",
  },
  "stage.architect.initControlDocs": {
    zh: "初始化控制文档",
    en: "Initialize control documents",
    ru: "Инициализация управляющих документов",
  },
  "stage.architect.createSnapshot": {
    zh: "创建初始快照",
    en: "Create initial snapshot",
    ru: "Создание начального снимка",
  },

  // --- Pipeline stage labels (reviser) ---
  "stage.reviser.loadContext": {
    zh: "加载修订上下文",
    en: "Load revision context",
    ru: "Загрузка контекста правок",
  },
  "stage.reviser.revise": {
    zh: "修订章节",
    en: "Revise chapter",
    ru: "Правка главы",
  },
  "stage.reviser.persistResult": {
    zh: "落盘修订结果",
    en: "Persist revision result",
    ru: "Сохранение результата правки",
  },
  "stage.reviser.updateIndex": {
    zh: "更新索引与快照",
    en: "Update index and snapshot",
    ru: "Обновление индекса и снимка",
  },

  // --- Pipeline stage labels (auditor) ---
  "stage.auditor.audit": {
    zh: "审计章节",
    en: "Audit chapter",
    ru: "Аудит главы",
  },

  // --- Agent labels (sub_agent display names) ---
  "agentLabel.architect": {
    zh: "建书",
    en: "Build book",
    ru: "Создание книги",
  },
  "agentLabel.writer": {
    zh: "写作",
    en: "Write",
    ru: "Написание",
  },
  "agentLabel.auditor": {
    zh: "审计",
    en: "Audit",
    ru: "Аудит",
  },
  "agentLabel.reviser": {
    zh: "修订",
    en: "Revise",
    ru: "Правка",
  },
  "agentLabel.exporter": {
    zh: "导出",
    en: "Export",
    ru: "Экспорт",
  },

  // --- Tool labels ---
  "toolLabel.read": {
    zh: "读取文件",
    en: "Read file",
    ru: "Чтение файла",
  },
  "toolLabel.edit": {
    zh: "编辑文件",
    en: "Edit file",
    ru: "Редактирование файла",
  },
  "toolLabel.grep": {
    zh: "搜索",
    en: "Search",
    ru: "Поиск",
  },
  "toolLabel.ls": {
    zh: "列目录",
    en: "List directory",
    ru: "Список каталога",
  },
} as const satisfies Record<string, Record<ServerLang, string>>;

export type ServerStringKey = keyof typeof SERVER_STRINGS;

export function tServer(lang: ServerLang, key: ServerStringKey): string {
  return SERVER_STRINGS[key][lang];
}

/**
 * Interpolate `{name}` placeholders in a SERVER_STRINGS entry. Missing keys
 * are left as-is so a stale template surfaces visibly rather than silently
 * dropping a value.
 */
export function tServerFormat(
  lang: ServerLang,
  key: ServerStringKey,
  vars: Readonly<Record<string, string | number>>,
): string {
  const template = SERVER_STRINGS[key][lang];
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match,
  );
}

// --- Pipeline stage / label tables, resolved per request ---

export function pipelineStagesForLang(lang: ServerLang): Record<string, string[]> {
  return {
    writer: [
      tServer(lang, "stage.writer.prepareInput"),
      tServer(lang, "stage.writer.draft"),
      tServer(lang, "stage.writer.persistFinal"),
      tServer(lang, "stage.writer.generateTruth"),
      tServer(lang, "stage.writer.validateTruth"),
      tServer(lang, "stage.writer.syncMemory"),
      tServer(lang, "stage.writer.updateIndex"),
    ],
    architect: [
      tServer(lang, "stage.architect.generateBase"),
      tServer(lang, "stage.architect.saveBookConfig"),
      tServer(lang, "stage.architect.writeBaseFile"),
      tServer(lang, "stage.architect.initControlDocs"),
      tServer(lang, "stage.architect.createSnapshot"),
    ],
    reviser: [
      tServer(lang, "stage.reviser.loadContext"),
      tServer(lang, "stage.reviser.revise"),
      tServer(lang, "stage.reviser.persistResult"),
      tServer(lang, "stage.reviser.updateIndex"),
    ],
    auditor: [tServer(lang, "stage.auditor.audit")],
  };
}

export function agentLabelsForLang(lang: ServerLang): Record<string, string> {
  return {
    architect: tServer(lang, "agentLabel.architect"),
    writer: tServer(lang, "agentLabel.writer"),
    auditor: tServer(lang, "agentLabel.auditor"),
    reviser: tServer(lang, "agentLabel.reviser"),
    exporter: tServer(lang, "agentLabel.exporter"),
  };
}

export function toolLabelsForLang(lang: ServerLang): Record<string, string> {
  return {
    read: tServer(lang, "toolLabel.read"),
    edit: tServer(lang, "toolLabel.edit"),
    grep: tServer(lang, "toolLabel.grep"),
    ls: tServer(lang, "toolLabel.ls"),
  };
}
