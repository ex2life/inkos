import { useApi } from "./use-api";
import { setStoreLang } from "../store/chat/slices/message/i18n";

export type Lang = "zh" | "en" | "ru";

const strings = {
  // Header
  "nav.books": { zh: "书籍", en: "Books", ru: "Книги" },
  "nav.newBook": { zh: "新建书籍", en: "New Book", ru: "Новая книга" },
  "nav.config": { zh: "模型配置", en: "Model Config", ru: "Настройки модели" },
  "nav.connected": { zh: "已连接", en: "Connected", ru: "Подключено" },
  "nav.disconnected": { zh: "未连接", en: "Disconnected", ru: "Не подключено" },

  // Dashboard
  "dash.title": { zh: "书籍列表", en: "Books", ru: "Книги" },
  "dash.noBooks": { zh: "还没有书", en: "No books yet", ru: "Книг пока нет" },
  "dash.createFirst": {
    zh: "创建第一本书开始写作",
    en: "Create your first book to get started",
    ru: "Создайте первую книгу, чтобы начать",
  },
  "dash.writeNext": { zh: "写下一章", en: "Write Next", ru: "Следующая глава" },
  "dash.writing": { zh: "写作中...", en: "Writing...", ru: "Пишу..." },
  "dash.stats": { zh: "统计", en: "Stats", ru: "Статистика" },
  "dash.chapters": { zh: "章", en: "chapters", ru: "глав" },
  "dash.recentEvents": { zh: "最近事件", en: "Recent Events", ru: "Последние события" },
  "dash.writingProgress": { zh: "写作进度", en: "Writing Progress", ru: "Ход работы" },

  // Book Detail
  "book.writeNext": { zh: "写下一章", en: "Write Next", ru: "Следующая глава" },
  "book.draftOnly": { zh: "仅草稿", en: "Draft Only", ru: "Только черновик" },
  "book.approveAll": { zh: "全部通过", en: "Approve All", ru: "Утвердить всё" },
  "book.analytics": { zh: "数据分析", en: "Analytics", ru: "Аналитика" },
  "book.noChapters": {
    zh: "暂无章节，点击「写下一章」开始",
    en: 'No chapters yet. Click "Write Next" to start.',
    ru: 'Глав пока нет. Нажмите «Следующая глава», чтобы начать.',
  },
  "book.approve": { zh: "通过", en: "Approve", ru: "Утвердить" },
  "book.reject": { zh: "驳回", en: "Reject", ru: "Отклонить" },
  "book.words": { zh: "字", en: "words", ru: "слов" },

  // Chapter Reader
  "reader.backToList": { zh: "返回列表", en: "Back to List", ru: "К списку" },
  "reader.approve": { zh: "通过", en: "Approve", ru: "Утвердить" },
  "reader.reject": { zh: "驳回", en: "Reject", ru: "Отклонить" },
  "reader.chapterList": { zh: "章节列表", en: "Chapter List", ru: "Список глав" },
  "reader.characters": { zh: "字符", en: "characters", ru: "символов" },
  "reader.edit": { zh: "编辑", en: "Edit", ru: "Редактировать" },
  "reader.preview": { zh: "预览", en: "Preview", ru: "Предпросмотр" },

  // Book Create
  "create.title": { zh: "创建书籍", en: "Create Book", ru: "Создать книгу" },
  "create.bookTitle": { zh: "书名", en: "Title", ru: "Название" },
  "create.language": { zh: "语言", en: "Language", ru: "Язык" },
  "create.genre": { zh: "题材", en: "Genre", ru: "Жанр" },
  "create.wordsPerChapter": { zh: "每章字数", en: "Words / Chapter", ru: "Слов в главе" },
  "create.targetChapters": { zh: "目标章数", en: "Target Chapters", ru: "Целевое число глав" },
  "create.creating": { zh: "创建中...", en: "Creating...", ru: "Создание..." },
  "create.submit": { zh: "创建书籍", en: "Create Book", ru: "Создать книгу" },
  "create.titleRequired": { zh: "请输入书名", en: "Title is required", ru: "Укажите название" },
  "create.genreRequired": { zh: "请选择题材", en: "Genre is required", ru: "Выберите жанр" },
  "create.placeholder": { zh: "请输入书名...", en: "Book title...", ru: "Название книги..." },

  // Analytics
  "analytics.title": { zh: "数据分析", en: "Analytics", ru: "Аналитика" },
  "analytics.totalChapters": { zh: "总章数", en: "Total Chapters", ru: "Всего глав" },
  "analytics.totalWords": { zh: "总字数", en: "Total Words", ru: "Всего слов" },
  "analytics.avgWords": { zh: "平均字数/章", en: "Avg Words/Chapter", ru: "Среднее слов на главу" },
  "analytics.statusDist": { zh: "状态分布", en: "Status Distribution", ru: "Распределение по статусам" },

  // Breadcrumb
  "bread.books": { zh: "书籍", en: "Books", ru: "Книги" },
  "bread.newBook": { zh: "新建书籍", en: "New Book", ru: "Новая книга" },
  "bread.config": { zh: "配置", en: "Config", ru: "Настройки" },
  "bread.home": { zh: "首页", en: "Home", ru: "Главная" },
  "bread.chapter": { zh: "第{n}章", en: "Chapter {n}", ru: "Глава {n}" },

  // Config
  "config.title": { zh: "项目配置", en: "Project Config", ru: "Настройки проекта" },
  "config.project": { zh: "项目名", en: "Project", ru: "Проект" },
  "config.language": { zh: "语言", en: "Language", ru: "Язык" },
  "config.provider": { zh: "提供方", en: "Provider", ru: "Поставщик" },
  "config.model": { zh: "模型", en: "Model", ru: "Модель" },
  "config.editHint": { zh: "通过 CLI 编辑配置：", en: "Edit via CLI:", ru: "Редактируйте через CLI:" },

  // Sidebar
  "nav.system": { zh: "系统", en: "System", ru: "Система" },
  "nav.daemon": { zh: "守护进程", en: "Daemon", ru: "Демон" },
  "nav.logs": { zh: "日志", en: "Logs", ru: "Журналы" },
  "nav.running": { zh: "运行中", en: "Running", ru: "Работает" },
  "nav.agentOnline": { zh: "代理在线", en: "Agent Online", ru: "Агент в сети" },
  "nav.agentOffline": { zh: "代理离线", en: "Agent Offline", ru: "Агент не в сети" },
  "nav.tools": { zh: "工具", en: "Tools", ru: "Инструменты" },
  "nav.style": { zh: "文风", en: "Style", ru: "Стиль" },
  "nav.import": { zh: "导入", en: "Import", ru: "Импорт" },
  "nav.radar": { zh: "市场雷达", en: "Radar", ru: "Радар рынка" },
  "nav.doctor": { zh: "环境诊断", en: "Doctor", ru: "Диагностика" },

  // Book Detail extras
  "book.deleteBook": { zh: "删除书籍", en: "Delete Book", ru: "Удалить книгу" },
  "book.confirmDelete": {
    zh: "确认删除此书及所有章节？",
    en: "Delete this book and all chapters?",
    ru: "Удалить эту книгу вместе со всеми главами?",
  },
  "book.settings": { zh: "书籍设置", en: "Book Settings", ru: "Параметры книги" },
  "book.status": { zh: "状态", en: "Status", ru: "Статус" },
  "book.drafting": { zh: "草稿中...", en: "Drafting...", ru: "Создаю черновик..." },
  "book.pipelineWriting": {
    zh: "后台正在写作，本页会在完成后自动刷新。",
    en: "Background writing is running. This page will refresh automatically when it finishes.",
    ru: "Фоновая запись выполняется. Страница обновится автоматически по завершении.",
  },
  "book.pipelineDrafting": {
    zh: "后台正在生成草稿，本页会在完成后自动刷新。",
    en: "Background drafting is running. This page will refresh automatically when it finishes.",
    ru: "Фоновое создание черновика выполняется. Страница обновится автоматически по завершении.",
  },
  "book.pipelineFailed": { zh: "后台任务失败", en: "Background job failed", ru: "Фоновая задача завершилась с ошибкой" },
  "book.save": { zh: "保存", en: "Save", ru: "Сохранить" },
  "book.saving": { zh: "保存中...", en: "Saving...", ru: "Сохранение..." },
  "book.rewrite": { zh: "重写", en: "Rewrite", ru: "Переписать" },
  "book.audit": { zh: "审计", en: "Audit", ru: "Проверка" },
  "book.export": { zh: "导出", en: "Export", ru: "Экспорт" },
  "book.approvedOnly": { zh: "仅已通过", en: "Approved Only", ru: "Только утверждённые" },
  "book.manuscriptTitle": { zh: "章节标题", en: "Manuscript Title", ru: "Название главы" },
  "book.curate": { zh: "操作", en: "Actions", ru: "Действия" },
  "book.spotFix": { zh: "精修", en: "Spot Fix", ru: "Точечная правка" },
  "book.polish": { zh: "打磨", en: "Polish", ru: "Шлифовка" },
  "book.rework": { zh: "重作", en: "Rework", ru: "Переделать" },
  "book.antiDetect": { zh: "反检测", en: "Anti-Detect", ru: "Анти-детект" },
  "book.statusActive": { zh: "进行中", en: "Active", ru: "В работе" },
  "book.statusPaused": { zh: "已暂停", en: "Paused", ru: "Приостановлено" },
  "book.statusOutlining": { zh: "大纲中", en: "Outlining", ru: "Составление плана" },
  "book.statusCompleted": { zh: "已完成", en: "Completed", ru: "Завершено" },
  "book.statusDropped": { zh: "已放弃", en: "Dropped", ru: "Заброшено" },
  "book.truthFiles": { zh: "真相文件", en: "Truth Files", ru: "Канонические факты" },

  // Style
  "style.title": { zh: "文风分析", en: "Style Analyzer", ru: "Анализ стиля" },
  "style.sourceName": { zh: "来源名称", en: "Source Name", ru: "Название источника" },
  "style.sourceExample": { zh: "如：参考小说", en: "e.g. Reference Novel", ru: "напр.: Эталонный роман" },
  "style.textSample": { zh: "文本样本", en: "Text Sample", ru: "Образец текста" },
  "style.pasteHint": {
    zh: "粘贴参考文本进行文风分析...",
    en: "Paste reference text for style analysis...",
    ru: "Вставьте эталонный текст для анализа стиля...",
  },
  "style.analyze": { zh: "分析", en: "Analyze", ru: "Анализировать" },
  "style.analyzing": { zh: "分析中...", en: "Analyzing...", ru: "Анализ..." },
  "style.results": { zh: "分析结果", en: "Analysis Results", ru: "Результаты анализа" },
  "style.avgSentence": { zh: "平均句长", en: "Avg Sentence Length", ru: "Средняя длина предложения" },
  "style.vocabDiversity": { zh: "词汇多样性", en: "Vocabulary Diversity", ru: "Разнообразие лексики" },
  "style.avgParagraph": { zh: "平均段落长度", en: "Avg Paragraph Length", ru: "Средняя длина абзаца" },
  "style.sentenceStdDev": { zh: "句长标准差", en: "Sentence StdDev", ru: "Станд. отклонение длины предложения" },
  "style.topPatterns": { zh: "主要模式", en: "Top Patterns", ru: "Основные шаблоны" },
  "style.rhetoricalFeatures": { zh: "修辞特征", en: "Rhetorical Features", ru: "Риторические приёмы" },
  "style.importToBook": { zh: "导入到书籍", en: "Import to Book", ru: "Импорт в книгу" },
  "style.selectBook": { zh: "选择书籍...", en: "Select book...", ru: "Выберите книгу..." },
  "style.importGuide": { zh: "导入文风指南", en: "Import Style Guide", ru: "Импортировать стилевой гайд" },
  "style.emptyHint": {
    zh: "粘贴文本并点击分析查看文风档案",
    en: "Paste text and click Analyze to see style profile",
    ru: "Вставьте текст и нажмите «Анализировать», чтобы увидеть профиль стиля",
  },

  // Import
  "import.title": { zh: "导入工具", en: "Import Tools", ru: "Инструменты импорта" },
  "import.chapters": { zh: "导入章节", en: "Import Chapters", ru: "Импорт глав" },
  "import.canon": { zh: "导入母本", en: "Import Canon", ru: "Импорт первоисточника" },
  "import.fanfic": { zh: "同人创作", en: "Fanfic", ru: "Фанфик" },
  "import.selectTarget": { zh: "选择目标书籍...", en: "Select target book...", ru: "Выберите целевую книгу..." },
  "import.splitRegex": { zh: "分割正则（可选）", en: "Split regex (optional)", ru: "Регулярка разделения (необязательно)" },
  "import.pasteChapters": { zh: "粘贴章节文本...", en: "Paste chapter text...", ru: "Вставьте текст глав..." },
  "import.selectSource": { zh: "选择源（母本）...", en: "Select source (parent)...", ru: "Выберите источник (первоисточник)..." },
  "import.selectDerivative": {
    zh: "选择目标（衍生）...",
    en: "Select target (derivative)...",
    ru: "Выберите цель (производное произведение)...",
  },
  "import.fanficTitle": { zh: "同人小说标题", en: "Fanfic title", ru: "Название фанфика" },
  "import.pasteMaterial": {
    zh: "粘贴原作文本/设定/角色资料...",
    en: "Paste source material...",
    ru: "Вставьте исходный материал: текст, сеттинг, описания персонажей...",
  },
  "import.importing": { zh: "导入中...", en: "Importing...", ru: "Импорт..." },
  "import.creating": { zh: "创建中...", en: "Creating...", ru: "Создание..." },

  // Radar
  "radar.title": { zh: "市场雷达", en: "Market Radar", ru: "Радар рынка" },
  "radar.scan": { zh: "扫描市场", en: "Scan Market", ru: "Сканировать рынок" },
  "radar.scanning": { zh: "扫描中...", en: "Scanning...", ru: "Сканирование..." },
  "radar.summary": { zh: "市场概要", en: "Market Summary", ru: "Сводка по рынку" },
  "radar.emptyHint": {
    zh: "点击「扫描市场」分析当前趋势和机会",
    en: "Click \"Scan Market\" to analyze trends and opportunities",
    ru: "Нажмите «Сканировать рынок», чтобы проанализировать тренды и возможности",
  },

  // Doctor
  "doctor.title": { zh: "环境诊断", en: "Environment Check", ru: "Диагностика окружения" },
  "doctor.recheck": { zh: "重新检查", en: "Re-check", ru: "Проверить снова" },
  "doctor.inkosJson": { zh: "inkos.json 配置", en: "inkos.json configuration", ru: "Конфигурация inkos.json" },
  "doctor.projectEnv": { zh: "项目 .env 文件", en: "Project .env file", ru: "Файл .env проекта" },
  "doctor.globalEnv": { zh: "全局 ~/.inkos/.env", en: "Global ~/.inkos/.env", ru: "Глобальный ~/.inkos/.env" },
  "doctor.booksDir": { zh: "书籍目录", en: "Books directory", ru: "Каталог книг" },
  "doctor.llmApi": { zh: "LLM API 连接", en: "LLM API connectivity", ru: "Доступность LLM API" },
  "doctor.connected": { zh: "已连接", en: "Connected", ru: "Подключено" },
  "doctor.failed": { zh: "失败", en: "Failed", ru: "Ошибка" },
  "doctor.allPassed": {
    zh: "所有检查通过 — 环境健康",
    en: "All checks passed — environment is healthy",
    ru: "Все проверки пройдены — окружение в порядке",
  },
  "doctor.someFailed": {
    zh: "部分检查失败 — 请查看配置",
    en: "Some checks failed — review configuration",
    ru: "Часть проверок не пройдена — проверьте настройки",
  },

  // Genre extras
  "genre.createNew": { zh: "创建新题材", en: "Create New Genre", ru: "Создать новый жанр" },
  "genre.editGenre": { zh: "编辑", en: "Edit", ru: "Редактировать" },
  "genre.deleteGenre": { zh: "删除", en: "Delete", ru: "Удалить" },
  "genre.confirmDelete": { zh: "确认删除此题材？", en: "Delete this genre?", ru: "Удалить этот жанр?" },
  "genre.chapterTypes": { zh: "章节类型", en: "Chapter Types", ru: "Типы глав" },
  "genre.fatigueWords": { zh: "疲劳词", en: "Fatigue Words", ru: "Затасканные слова" },
  "genre.numericalSystem": { zh: "数值系统", en: "Numerical System", ru: "Числовая система" },
  "genre.powerScaling": { zh: "力量等级", en: "Power Scaling", ru: "Шкала силы" },
  "genre.eraResearch": { zh: "时代研究", en: "Era Research", ru: "Изучение эпохи" },
  "genre.pacingRule": { zh: "节奏规则", en: "Pacing Rule", ru: "Правило темпа" },
  "genre.rules": { zh: "规则", en: "Rules", ru: "Правила" },
  "genre.saveChanges": { zh: "保存更改", en: "Save Changes", ru: "Сохранить изменения" },
  "genre.cancel": { zh: "取消", en: "Cancel", ru: "Отмена" },
  "genre.copyToProject": { zh: "复制到项目", en: "Copy to Project", ru: "Скопировать в проект" },
  "genre.selectHint": { zh: "选择题材查看详情", en: "Select a genre to view details", ru: "Выберите жанр, чтобы увидеть детали" },
  "genre.commaSeparated": { zh: "逗号分隔", en: "comma-separated", ru: "через запятую" },
  "genre.rulesMd": { zh: "规则（Markdown）", en: "Rules (Markdown)", ru: "Правила (Markdown)" },

  // Config extras
  "config.modelRouting": { zh: "模型路由", en: "Model Routing", ru: "Маршрутизация моделей" },
  "config.agent": { zh: "代理", en: "Agent", ru: "Агент" },
  "config.baseUrl": { zh: "基础 URL", en: "Base URL", ru: "Базовый URL" },
  "config.default": { zh: "默认", en: "default", ru: "по умолчанию" },
  "config.optional": { zh: "可选", en: "optional", ru: "необязательно" },
  "config.saveOverrides": { zh: "保存路由", en: "Save Overrides", ru: "Сохранить маршруты" },
  "config.save": { zh: "保存", en: "Save", ru: "Сохранить" },
  "config.saving": { zh: "保存中...", en: "Saving...", ru: "Сохранение..." },
  "config.cancel": { zh: "取消", en: "Cancel", ru: "Отмена" },
  "config.edit": { zh: "编辑", en: "Edit", ru: "Редактировать" },
  "config.enabled": { zh: "启用", en: "Enabled", ru: "Включено" },
  "config.disabled": { zh: "禁用", en: "Disabled", ru: "Отключено" },

  // Truth Files extras
  "truth.title": { zh: "真相文件", en: "Truth Files", ru: "Канонические факты" },
  "truth.edit": { zh: "编辑", en: "Edit", ru: "Редактировать" },
  "truth.chars": { zh: "字", en: "chars", ru: "симв." },
  "truth.save": { zh: "保存", en: "Save", ru: "Сохранить" },
  "truth.saving": { zh: "保存中...", en: "Saving...", ru: "Сохранение..." },
  "truth.cancel": { zh: "取消", en: "Cancel", ru: "Отмена" },
  "truth.empty": { zh: "暂无文件", en: "No truth files", ru: "Файлов пока нет" },
  "truth.noFiles": { zh: "暂无文件", en: "No truth files", ru: "Файлов пока нет" },
  "truth.notFound": { zh: "文件未找到", en: "File not found", ru: "Файл не найден" },
  "truth.selectFile": { zh: "选择文件查看内容", en: "Select a file to view", ru: "Выберите файл для просмотра" },
  "truth.selectHint": { zh: "选择文件查看内容", en: "Select a file to view", ru: "Выберите файл для просмотра" },

  // Dashboard
  "dash.subtitle": {
    zh: "管理你的文学宇宙和 AI 辅助草稿。",
    en: "Manage your literary universe and AI-assisted drafts.",
    ru: "Управляйте своей литературной вселенной и черновиками с участием ИИ.",
  },

  // Chapter Reader extras
  "reader.openingManuscript": { zh: "打开书稿中...", en: "Opening manuscript...", ru: "Открываю рукопись..." },
  "reader.manuscriptPage": { zh: "书稿页", en: "Manuscript Page", ru: "Страница рукописи" },
  "reader.minRead": { zh: "分钟阅读", en: "min read", ru: "мин. чтения" },
  "reader.endOfChapter": { zh: "本章完", en: "End of Chapter", ru: "Конец главы" },

  // Daemon Control
  "daemon.title": { zh: "守护进程控制", en: "Daemon Control", ru: "Управление демоном" },
  "daemon.running": { zh: "运行中", en: "Running", ru: "Работает" },
  "daemon.stopped": { zh: "已停止", en: "Stopped", ru: "Остановлен" },
  "daemon.start": { zh: "启动", en: "Start", ru: "Запустить" },
  "daemon.stop": { zh: "停止", en: "Stop", ru: "Остановить" },
  "daemon.starting": { zh: "启动中...", en: "Starting...", ru: "Запуск..." },
  "daemon.stopping": { zh: "停止中...", en: "Stopping...", ru: "Остановка..." },
  "daemon.waitingEvents": { zh: "等待事件...", en: "Waiting for events...", ru: "Ожидание событий..." },
  "daemon.startHint": { zh: "启动守护进程查看事件", en: "Start the daemon to see events", ru: "Запустите демон, чтобы увидеть события" },
  "daemon.eventLog": { zh: "事件日志", en: "Event Log", ru: "Журнал событий" },

  // Config extras (labels)
  "config.temperature": { zh: "温度", en: "Temperature", ru: "Температура" },
  "config.maxTokens": { zh: "最大令牌数", en: "Max Tokens", ru: "Лимит токенов" },
  "config.stream": { zh: "流式输出", en: "Stream", ru: "Потоковый вывод" },
  "config.chinese": { zh: "中文", en: "Chinese", ru: "Китайский" },
  "config.english": { zh: "英文", en: "English", ru: "Английский" },

  // BookCreate extras
  "create.platform": { zh: "平台", en: "Platform", ru: "Платформа" },

  // Common
  "common.save": { zh: "保存", en: "Save", ru: "Сохранить" },
  "common.cancel": { zh: "取消", en: "Cancel", ru: "Отмена" },
  "common.delete": { zh: "删除", en: "Delete", ru: "Удалить" },
  "common.edit": { zh: "编辑", en: "Edit", ru: "Редактировать" },
  "common.error": { zh: "错误", en: "Error", ru: "Ошибка" },
  "common.loading": { zh: "加载中...", en: "Loading...", ru: "Загрузка..." },
  "common.refresh": { zh: "刷新", en: "Refresh", ru: "Обновить" },
  "common.enterCommand": { zh: "输入指令...", en: "Enter command...", ru: "Введите команду..." },
  "chapter.readyForReview": { zh: "待审核", en: "Ready for Review", ru: "Готово к проверке" },
  "chapter.approved": { zh: "已通过", en: "Approved", ru: "Утверждено" },
  "chapter.drafted": { zh: "草稿", en: "Drafted", ru: "Черновик" },
  "chapter.needsRevision": { zh: "需修订", en: "Needs Revision", ru: "Требует правок" },
  "chapter.imported": { zh: "已导入", en: "Imported", ru: "Импортировано" },
  "chapter.auditFailed": { zh: "审计失败", en: "Audit Failed", ru: "Проверка не пройдена" },
  "chapter.label": { zh: "第{n}章", en: "Chapter {n}", ru: "Глава {n}" },
  "common.exportSuccess": { zh: "已导出到项目目录", en: "Exported to project directory", ru: "Экспортировано в каталог проекта" },
  "common.exportFormat": { zh: "导出格式", en: "Export format", ru: "Формат экспорта" },
  "logs.title": { zh: "日志", en: "Logs", ru: "Журналы" },
  "logs.empty": { zh: "暂无日志", en: "No log entries yet", ru: "Записей пока нет" },
  "logs.showingRecent": { zh: "当前展示最近日志记录。", en: "Showing recent log entries.", ru: "Показаны последние записи журнала." },

  // Service Provider List page
  "service.list.connected": { zh: "已连接", en: "Connected", ru: "Подключено" },
  "service.list.notConfigured": { zh: "未配置", en: "Not configured", ru: "Не настроено" },
  "service.list.breadcrumbHome": { zh: "首页", en: "Home", ru: "Главная" },
  "service.list.title": { zh: "服务商管理", en: "Provider Manager", ru: "Провайдеры моделей" },
  "service.list.searchPlaceholder": { zh: "搜索服务商", en: "Search providers", ru: "Поиск провайдеров" },
  "service.list.clearSearch": { zh: "清空搜索", en: "Clear search", ru: "Очистить поиск" },
  "service.list.all": { zh: "全部", en: "All", ru: "Все" },
  "service.list.clearFilters": { zh: "清除筛选", en: "Clear filters", ru: "Сбросить фильтры" },
  "service.list.onlyConnected": { zh: "只看已连接", en: "Show only connected", ru: "Только подключённые" },
  "service.list.customSection": { zh: "自定义服务", en: "Custom Services", ru: "Свои сервисы" },
  "service.list.customCard": { zh: "自定义服务", en: "Custom Service", ru: "Свой сервис" },
  "service.list.empty": { zh: "没有匹配的服务商", en: "No matching providers", ru: "Подходящих провайдеров не найдено" },

  // Service Provider Detail page
  "service.detail.customLabel": { zh: "自定义服务", en: "Custom Service", ru: "Свой сервис" },
  "service.detail.errorEnterApiKey": { zh: "请先输入 API Key", en: "Please enter the API Key first", ru: "Сначала введите API Key" },
  "service.detail.errorEnterBaseUrl": { zh: "请先填写 Base URL", en: "Please enter the Base URL first", ru: "Сначала укажите Base URL" },
  "service.detail.errorConnectionFailed": { zh: "连接失败", en: "Connection failed", ru: "Соединение не удалось" },
  "service.detail.errorSaveFailed": { zh: "保存失败", en: "Save failed", ru: "Не удалось сохранить" },
  "service.detail.back": { zh: "返回服务商管理", en: "Back to Providers", ru: "Назад к провайдерам" },
  "service.detail.connected": { zh: "已连接", en: "Connected", ru: "Подключено" },
  "service.detail.serviceName": { zh: "服务名称", en: "Service Name", ru: "Название сервиса" },
  "service.detail.serviceNamePlaceholder": { zh: "例如：本地 Ollama", en: "e.g. Local Ollama", ru: "например, Local Ollama" },
  "service.detail.testConnection": { zh: "测试连接", en: "Test Connection", ru: "Проверить соединение" },
  "service.detail.saveButton": { zh: "保存", en: "Save", ru: "Сохранить" },
  "service.detail.connectionSuccessPrefix": { zh: "连接成功，", en: "Connection successful, ", ru: "Соединение установлено, " },
  "service.detail.modelsCountSuffix": { zh: " 个模型", en: " models", ru: " моделей" },
  "service.detail.autoMatchedPrefix": { zh: "，已自动匹配 ", en: ", auto-matched ", ru: ", автоматически выбран " },
  "service.detail.streamLabel": { zh: "流式", en: "Stream", ru: "Поток" },
  "service.detail.nonStreamLabel": { zh: "非流式", en: "Non-stream", ru: "Без потока" },
  "service.detail.saved": { zh: "已保存", en: "Saved", ru: "Сохранено" },
  "service.detail.protocolType": { zh: "协议类型", en: "Protocol Type", ru: "Тип протокола" },
  "service.detail.streamResponse": { zh: "流式响应", en: "Streaming Response", ru: "Потоковый ответ" },
  "service.detail.streamOn": { zh: "开启", en: "On", ru: "Включено" },
  "service.detail.streamOff": { zh: "关闭", en: "Off", ru: "Выключено" },
  "service.detail.availableModels": { zh: "可用模型", en: "Available models", ru: "Доступные модели" },
  "service.detail.modelsHint": { zh: "点击“测试连接”查看可用模型", en: "Click “Test Connection” to view available models", ru: "Нажмите «Проверить соединение», чтобы увидеть доступные модели" },
  "service.detail.advancedParams": { zh: "高级参数", en: "Advanced parameters", ru: "Дополнительные параметры" },

  // Chat page
  "chat.empty.guidance": {
    zh: "告诉我你想写什么——题材、世界观、主角、核心冲突",
    en: "Tell me what you want to write — genre, world, protagonist, core conflict",
    ru: "Расскажите, что хотите написать — жанр, мир, протагонист, ключевой конфликт",
  },
  "chat.thinking": { zh: "思考中...", en: "Thinking...", ru: "Думаю..." },
  "chat.inputPlaceholder": { zh: "输入指令...", en: "Enter command...", ru: "Введите команду..." },
  "chat.loadingModels": { zh: "加载模型...", en: "Loading models...", ru: "Загрузка моделей..." },
  "chat.selectModel": { zh: "选择模型", en: "Select model", ru: "Выбрать модель" },
  "chat.configureModel": { zh: "配置模型 →", en: "Configure model →", ru: "Настроить модель →" },
  "chat.searchModels": { zh: "搜索模型...", en: "Search models...", ru: "Поиск моделей..." },
  "chat.noMatchModel": { zh: "无匹配模型", en: "No matching models", ru: "Нет подходящих моделей" },
  "chat.manageProviders": { zh: "管理服务商", en: "Manage providers", ru: "Управление провайдерами" },
  "chat.selectModelFirst": { zh: "请先选择一个模型", en: "Please select a model first", ru: "Сначала выберите модель" },
  "chat.emptyResponse": {
    zh: "模型未返回文本内容。请检查协议类型（chat/responses）、流式开关或上游服务兼容性。",
    en: "The model returned no text. Check the protocol type (chat/responses), streaming flag, or upstream service compatibility.",
    ru: "Модель не вернула текст. Проверьте тип протокола (chat/responses), потоковый режим и совместимость провайдера.",
  },

  // Quick actions
  "qa.writeNext": { zh: "写下一章", en: "Write next", ru: "Следующая глава" },
  "qa.audit": { zh: "审计", en: "Audit", ru: "Аудит" },
  "qa.export": { zh: "导出", en: "Export", ru: "Экспорт" },
  "qa.radar": { zh: "市场雷达", en: "Market radar", ru: "Радар рынка" },

  // Tool execution status
  "tool.status.running": { zh: "执行中", en: "Running", ru: "Выполняется" },
  "tool.status.processing": { zh: "处理结果", en: "Processing", ru: "Обработка" },
  "tool.status.completed": { zh: "已完成", en: "Completed", ru: "Готово" },
  "tool.status.error": { zh: "失败", en: "Failed", ru: "Ошибка" },
  "tool.status.waitingApproval": { zh: "等待确认", en: "Waiting approval", ru: "Ожидает подтверждения" },
  "tool.status.responded": { zh: "已响应", en: "Responded", ru: "Обработано" },
  "tool.status.streaming": { zh: "处理中", en: "Streaming", ru: "Идёт обработка" },
  "tool.status.denied": { zh: "已拒绝", en: "Denied", ru: "Отклонено" },
  "tool.status.outputError": { zh: "出错", en: "Error", ru: "Ошибка" },
  "tool.thinking": { zh: "思考中", en: "thinking", ru: "размышление" },
  "tool.fileOps": { zh: "{n} 个文件操作", en: "{n} file operations", ru: "Операций с файлами: {n}" },

  // Tool labels (shown in tool-execution rows)
  "tool.label.read": { zh: "读取文件", en: "Read file", ru: "Чтение файла" },
  "tool.label.edit": { zh: "编辑文件", en: "Edit file", ru: "Правка файла" },
  "tool.label.grep": { zh: "搜索", en: "Search", ru: "Поиск" },
  "tool.label.ls": { zh: "列目录", en: "List directory", ru: "Список каталога" },
  "tool.agent.architect": { zh: "建书", en: "Build book", ru: "Сборка книги" },
  "tool.agent.writer": { zh: "写作", en: "Writing", ru: "Письмо" },
  "tool.agent.auditor": { zh: "审计", en: "Audit", ru: "Аудит" },
  "tool.agent.reviser": { zh: "修订", en: "Revise", ru: "Правка" },
  "tool.agent.exporter": { zh: "导出", en: "Export", ru: "Экспорт" },

  // Sidebar (left)
  "sidebar.rename": { zh: "改名", en: "Rename", ru: "Переименовать" },
  "sidebar.delete": { zh: "删除", en: "Delete", ru: "Удалить" },
  "sidebar.newSession": { zh: "新建会话", en: "New session", ru: "Новый чат" },
  "sidebar.renameTitle": { zh: "重命名会话", en: "Rename session", ru: "Переименовать чат" },
  "sidebar.renamePlaceholder": { zh: "输入新标题", en: "Enter new title", ru: "Введите новый заголовок" },
  "sidebar.cancel": { zh: "取消", en: "Cancel", ru: "Отмена" },
  "sidebar.save": { zh: "保存", en: "Save", ru: "Сохранить" },
  "sidebar.deleteSessionTitle": { zh: "删除会话", en: "Delete session", ru: "Удалить чат" },
  "sidebar.deleteSessionMessage": {
    zh: "确认删除「{title}」吗？该操作只删除这条会话，不影响书籍内容。",
    en: "Delete \"{title}\"? Only this session is removed; book content stays intact.",
    ru: "Удалить «{title}»? Это удалит только сам чат — содержимое книги не пострадает.",
  },
  "sidebar.newSessionFallback": { zh: "新会话", en: "New session", ru: "Новый чат" },
  "sidebar.justNow": { zh: "刚刚", en: "just now", ru: "только что" },
  "sidebar.minutesAgo": { zh: "{n} 分钟", en: "{n} min", ru: "{n} мин" },
  "sidebar.hoursAgo": { zh: "{n} 小时", en: "{n} h", ru: "{n} ч" },
  "sidebar.daysAgo": { zh: "{n} 天", en: "{n} d", ru: "{n} дн" },
  "sidebar.monthsAgo": { zh: "{n} 个月", en: "{n} mo", ru: "{n} мес" },

  // Book sidebar (right)
  "bookSidebar.bookInfo": { zh: "书籍信息", en: "Book info", ru: "О книге" },
  "bookSidebar.fileMissing": { zh: "文件不存在", en: "File not found", ru: "Файл не найден" },
  "bookSidebar.chapterLabel": { zh: "第 {n} 章", en: "Chapter {n}", ru: "Глава {n}" },
  "bookSidebar.writing": { zh: "正在写作中...", en: "Writing...", ru: "Идёт запись..." },
  "bookSidebar.auditing": { zh: "正在审计中...", en: "Auditing...", ru: "Идёт проверка..." },
  "bookSidebar.revising": { zh: "正在修订中...", en: "Revising...", ru: "Идёт правка..." },

  // Foundation files
  "foundation.title": { zh: "核心文件", en: "Core Files", ru: "Опорные файлы" },
  "foundation.story_bible": { zh: "世界观设定", en: "Story Bible", ru: "Сеттинг и канон" },
  "foundation.volume_outline": { zh: "卷纲规划", en: "Volume Outline", ru: "План тома" },
  "foundation.book_rules": { zh: "叙事规则", en: "Narrative Rules", ru: "Правила повествования" },
  "foundation.current_state": { zh: "状态卡", en: "State Card", ru: "Карточка состояния" },
  "foundation.pending_hooks": { zh: "伏笔池", en: "Pending Hooks", ru: "Заделы" },
  "foundation.subplot_board": { zh: "支线进度", en: "Subplot Board", ru: "Сюжетные линии" },
  "foundation.emotional_arcs": { zh: "感情线", en: "Emotional Arcs", ru: "Эмоциональные арки" },
  "foundation.character_matrix": { zh: "角色矩阵", en: "Character Matrix", ru: "Матрица персонажей" },

  // Summary section
  "summary.world": { zh: "世界观", en: "World", ru: "Мир" },
  "summary.characters": { zh: "角色", en: "Characters", ru: "Персонажи" },

  // Character section
  "character.title": { zh: "角色", en: "Characters", ru: "Персонажи" },
  "character.tags": { zh: "标签", en: "Tags", ru: "Теги" },
  "character.current": { zh: "当前", en: "Current", ru: "Сейчас" },

  // Chapters section
  "chaptersSection.title": { zh: "章节", en: "Chapters", ru: "Главы" },
  "chaptersSection.empty": { zh: "暂无章节", en: "No chapters", ru: "Глав пока нет" },

  // Progress section (pipeline stages)
  "progress.title": { zh: "执行", en: "Pipeline", ru: "Этапы" },
  "progress.init.generateFoundation": { zh: "生成基础设定", en: "Generate foundation", ru: "Создание основания" },
  "progress.init.saveBookConfig": { zh: "保存书籍配置", en: "Save book config", ru: "Сохранение настроек книги" },
  "progress.init.writeFoundation": { zh: "写入基础设定文件", en: "Write foundation files", ru: "Запись опорных файлов" },
  "progress.init.initControl": { zh: "初始化控制文档", en: "Init control docs", ru: "Инициализация служебных документов" },
  "progress.init.createSnapshot": { zh: "创建初始快照", en: "Create initial snapshot", ru: "Создание стартового снимка" },
  "progress.write.prepareInput": { zh: "准备章节输入", en: "Prepare chapter input", ru: "Подготовка входных данных" },
  "progress.write.draft": { zh: "撰写章节草稿", en: "Draft chapter", ru: "Черновик главы" },
  "progress.write.persistChapter": { zh: "落盘最终章节", en: "Persist final chapter", ru: "Сохранение финальной главы" },
  "progress.write.generateTruth": { zh: "生成最终真相文件", en: "Generate truth files", ru: "Обновление канонических фактов" },
  "progress.write.verifyTruth": { zh: "校验真相文件变更", en: "Verify truth diffs", ru: "Проверка изменений канона" },
  "progress.write.syncMemory": { zh: "同步记忆索引", en: "Sync memory index", ru: "Синхронизация индекса памяти" },
  "progress.write.updateIndex": { zh: "更新章节索引与快照", en: "Update index & snapshot", ru: "Обновление индекса и снимка" },

  // ServiceConfigSourceCard
  "svcSrc.loading": { zh: "正在读取配置来源…", en: "Loading config source…", ru: "Загрузка источника настроек…" },
  "svcSrc.loadFailed": { zh: "读取配置来源失败", en: "Failed to load config source", ru: "Не удалось загрузить источник настроек" },
  "svcSrc.switchFailed": { zh: "切换配置来源失败", en: "Failed to switch config source", ru: "Не удалось переключить источник настроек" },
  "svcSrc.title": { zh: "LLM 配置来源", en: "LLM Config Source", ru: "Источник настроек LLM" },
  "svcSrc.studioRuntime": { zh: "Studio 运行时：", en: "Studio runtime:", ru: "Среда Studio:" },
  "svcSrc.usingStudio": { zh: " 使用服务页配置和 Studio 密钥", en: " using service-page config and Studio secrets", ru: " используются настройки страницы провайдеров и ключи Studio" },
  "svcSrc.switching": { zh: "切换中…", en: "Switching…", ru: "Переключение…" },
  "svcSrc.useStudio": { zh: "使用 Studio 配置", en: "Use Studio config", ru: "Использовать настройки Studio" },
  "svcSrc.legacyEnvWarn": {
    zh: "检测到旧配置标记为 `.env` 优先。Studio 运行时不会使用它；CLI、daemon 和部署环境仍可按 env 覆盖层使用。",
    en: "Legacy config marks `.env` as preferred. Studio runtime ignores it; CLI, daemon and deployments still apply the env overlay.",
    ru: "В сохранённых настройках `.env` отмечен как приоритетный. Studio его игнорирует; CLI, демон и окружения деплоя по-прежнему используют env-оверлей.",
  },
  "svcSrc.envDetectedTitle": { zh: "检测到 LLM 环境变量覆盖：", en: "LLM env override detected:", ru: "Обнаружен env-оверлей для LLM:" },
  "svcSrc.envUnknownSource": { zh: "已检测到但未定位来源", en: "detected but source unknown", ru: "обнаружен, но источник неизвестен" },
  "svcSrc.envProject": { zh: "项目 .env", en: "project .env", ru: ".env проекта" },
  "svcSrc.envGlobal": { zh: "全局 ~/.inkos/.env", en: "global ~/.inkos/.env", ru: "глобальный ~/.inkos/.env" },
  "svcSrc.apiKeySet": { zh: "已设置", en: "set", ru: "задан" },
  "svcSrc.apiKeyMissing": { zh: "未设置", en: "missing", ru: "не задан" },
  "svcSrc.envIgnoredHint": {
    zh: "当前虽然检测到 .env，但 Studio 和 Agent 请求会忽略这套 LLM 覆盖；CLI、daemon 和部署环境可以使用它。",
    en: "Although a .env was detected, Studio and Agent requests ignore this LLM overlay; CLI, daemon and deployments can still use it.",
    ru: "Файл .env обнаружен, но Studio и запросы агента этот LLM-оверлей игнорируют; CLI, демон и среды деплоя продолжат им пользоваться.",
  },
  "svcSrc.envNoneHint": {
    zh: "未检测到目录或全局 `.env` 里的 LLM 覆盖变量。当前会直接使用项目配置和 Studio 服务配置。",
    en: "No LLM overrides found in project or global `.env`. Project config and Studio service config are used directly.",
    ru: "Переменных LLM-оверлея в проектном или глобальном `.env` не найдено. Используются настройки проекта и страницы провайдеров Studio.",
  },

  // Service groups
  "serviceGroup.overseas": { zh: "海外原厂", en: "Overseas vendors", ru: "Зарубежные провайдеры" },
  "serviceGroup.china": { zh: "国产原厂", en: "Chinese vendors", ru: "Китайские провайдеры" },
  "serviceGroup.aggregator": { zh: "聚合 / 二手 API", en: "Aggregators / proxies", ru: "Агрегаторы / прокси" },
  "serviceGroup.local": { zh: "本地 / 订阅", en: "Local / subscription", ru: "Локально / по подписке" },
  "serviceGroup.codingPlan": { zh: "CodingPlan", en: "CodingPlan", ru: "CodingPlan" },
  "serviceGroup.short.overseas": { zh: "海外", en: "Overseas", ru: "За рубежом" },
  "serviceGroup.short.china": { zh: "国产", en: "China", ru: "Китай" },
  "serviceGroup.short.aggregator": { zh: "聚合", en: "Aggreg.", ru: "Агрегаторы" },
  "serviceGroup.short.local": { zh: "本地", en: "Local", ru: "Локально" },
  "serviceGroup.short.codingPlan": { zh: "CodingPlan", en: "CodingPlan", ru: "CodingPlan" },

  // Truth files (legacy shim warning)
  "truth.legacyShimTitle": { zh: "兼容层只读 / Read-only compat shim", en: "Read-only compatibility shim", ru: "Слой совместимости только для чтения" },
  "truth.legacyShimBody": {
    zh: "本文件已废弃，仅供外部读取。权威来源：",
    en: "This file is deprecated and read-only. Authoritative source:",
    ru: "Файл устарел и доступен только для чтения. Актуальный источник:",
  },
  "truth.editLabel": { zh: "编辑", en: "Edit", ru: "Редактировать" },
  "truth.cancelLabel": { zh: "取消", en: "Cancel", ru: "Отмена" },
  "truth.saveFailed": { zh: "保存失败", en: "Failed to save", ru: "Не удалось сохранить" },

  // Dashboard extras
  "dash.noModelsTitle": { zh: "还没有配置 AI 模型", en: "No AI model configured", ru: "Модель ИИ ещё не настроена" },
  "dash.noModelsBody": { zh: "配好一个服务商才能开始创作", en: "Configure a provider to start writing", ru: "Подключите провайдера, чтобы начать работу" },
  "dash.goConfigure": { zh: "去配置", en: "Configure", ru: "Настроить" },
  "dash.writeFailed": { zh: "写作启动失败", en: "Write failed", ru: "Не удалось запустить запись" },

  // BookCreate extras (loading + missing-id error)
  "create.loadingDraft": { zh: "读取共享草案中…", en: "Loading shared draft…", ru: "Загрузка общего черновика…" },
  "create.missingBookIdError": {
    zh: "创建完成后没有返回书籍 ID。",
    en: "Create succeeded but no book id was returned.",
    ru: "Создание прошло, но идентификатор книги не вернулся.",
  },
} as const satisfies Record<string, Record<Lang, string>>;

export type StringKey = keyof typeof strings;
export type TFunction = (key: StringKey) => string;

/**
 * Pure resolver: maps a project's configured language string to the
 * Studio UI language. Unknown / missing values fall back to Chinese.
 */
export function resolveLang(projectLanguage: string | null | undefined): Lang {
  if (projectLanguage === "en") return "en";
  if (projectLanguage === "ru") return "ru";
  return "zh";
}

export function useI18n(override?: Lang) {
  const { data } = useApi<{ language: string }>("/project");
  const lang: Lang = override ?? resolveLang(data?.language);

  // Mirror the active language into the chat store's hook-free i18n shim
  // so toast / error strings raised from zustand actions match the UI.
  // Done synchronously (no useEffect) so the call is safe in test renderers
  // that invoke the hook outside the React render lifecycle.
  setStoreLang(lang);

  function t(key: StringKey): string {
    return strings[key][lang];
  }

  return { t, lang };
}
