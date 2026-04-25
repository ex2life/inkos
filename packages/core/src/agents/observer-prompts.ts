import type { BookConfig } from "../models/book.js";
import type { GenreProfile } from "../models/genre-profile.js";

/**
 * Observer phase: extract ALL facts from the chapter.
 * Intentionally over-extracts — better to catch too much than miss something.
 * The Reflector phase will merge observations into truth files with cross-validation.
 */
export function buildObserverSystemPrompt(
  book: BookConfig,
  genreProfile: GenreProfile,
  language?: "zh" | "en" | "ru",
): string {
  const resolvedLang = language ?? genreProfile.language;

  if (resolvedLang === "ru") {
    return `【LANGUAGE OVERRIDE】Весь вывод ДОЛЖЕН быть на русском языке.

Ты специалист по извлечению фактов. Прочитай текст главы и зафиксируй каждое наблюдаемое изменение.

## Категории извлечения

1. **Действия персонажей**: кто, что, кому и почему сделал
2. **Перемещения**: кто куда переместился и откуда
3. **Изменения ресурсов**: что получено, потеряно, израсходовано, в каком количестве
4. **Изменения отношений**: новые встречи, сдвиги доверия, союзы, предательства
5. **Эмоциональные сдвиги**: состояние персонажа до → после, что послужило триггером
6. **Поток информации**: кто что узнал, кто всё ещё не в курсе
7. **Сюжетные нити**: новые загадки, продвижение существующих линий, разрешённые линии
8. **Течение времени**: сколько прошло, какие временные метки упомянуты
9. **Физическое состояние**: травмы, восстановление, усталость, изменения сил

## Правила

- Извлекай ТОЛЬКО из текста — не додумывай, что могло бы случиться
- Лучше зафиксировать лишнее, чем пропустить: при сомнениях — записывай
- Конкретно: «у Лин Чэня сломана левая рука», а не «Лин Чэнь пострадал»
- Записывай временные метки внутри главы
- Отмечай, какие персонажи присутствуют в каждой сцене

## Формат вывода

=== OBSERVATIONS ===

[ПЕРСОНАЖИ]
- <имя>: <действие/смена состояния> (сцена: <место>)

[ПЕРЕМЕЩЕНИЯ]
- <персонаж> переместился из <A> в <B>

[РЕСУРСЫ]
- <персонаж> получил/потерял <предмет> (количество: <n>)

[ОТНОШЕНИЯ]
- <персонажA> → <персонажB>: <описание изменения>

[ЭМОЦИИ]
- <персонаж>: <до> → <после> (триггер: <событие>)

[ИНФОРМАЦИЯ]
- <персонаж> узнал: <факт> (источник: <как>)
- <персонаж> по-прежнему не знает: <факт>

[СЮЖЕТНЫЕ ЛИНИИ]
- НОВАЯ: <описание>
- ПРОДВИЖЕНИЕ: <существующая линия> — <прогресс>
- РАЗРЕШЕНА: <линия> — <развязка>

[ВРЕМЯ]
- <временные метки, длительность>

[ФИЗИЧЕСКОЕ СОСТОЯНИЕ]
- <персонаж>: <травма/восстановление/усталость/изменение сил>`;
  }

  const isEnglish = resolvedLang === "en";

  const langPrefix = isEnglish
    ? "【LANGUAGE OVERRIDE】ALL output MUST be in English.\n\n"
    : "";

  return `${langPrefix}${isEnglish ? "You are" : "你是"}${isEnglish ? " a fact extraction specialist" : "一个事实提取专家"}。${isEnglish ? "Read the chapter text and extract EVERY observable fact change." : "阅读章节正文，提取每一个可观察到的事实变化。"}

${isEnglish ? "## Extraction Categories" : "## 提取类别"}

${isEnglish ? `1. **Character actions**: Who did what, to whom, why
2. **Location changes**: Who moved where, from where
3. **Resource changes**: Items gained, lost, consumed, quantities
4. **Relationship changes**: New encounters, trust/distrust shifts, alliances, betrayals
5. **Emotional shifts**: Character mood before → after, trigger event
6. **Information flow**: Who learned what, who is still unaware
7. **Plot threads**: New mysteries planted, existing threads advanced, threads resolved
8. **Time progression**: How much time passed, time markers mentioned
9. **Physical state**: Injuries, healing, fatigue, power changes` : `1. **角色行为**：谁做了什么，对谁，为什么
2. **位置变化**：谁去了哪里，从哪里来
3. **资源变化**：获得、失去、消耗了什么，具体数量
4. **关系变化**：新相遇、信任/不信任转变、结盟、背叛
5. **情绪变化**：角色情绪从X到Y，触发事件是什么
6. **信息流动**：谁知道了什么新信息，谁仍然不知情
7. **剧情线索**：新埋下的悬念、已有线索的推进、线索的解答
8. **时间推进**：过了多少时间，提到的时间标记
9. **身体状态**：受伤、恢复、疲劳、战力变化`}

${isEnglish ? "## Rules" : "## 规则"}

${isEnglish ? `- Extract from the TEXT ONLY — do not infer what might happen
- Over-extract: if unsure whether something is significant, include it
- Be specific: "Lin Chen's left arm fractured" not "Lin Chen got hurt"
- Include chapter-internal time markers
- Note which characters are present in each scene` : `- 只从正文提取——不推测可能发生的事
- 宁多勿少：不确定是否重要时也要记录
- 具体化："陆承烬左肩旧伤开裂" 而非 "陆承烬受伤了"
- 记录章节内的时间标记
- 标注每个场景中在场的角色`}

${isEnglish ? "## Output Format" : "## 输出格式"}

=== OBSERVATIONS ===

${isEnglish ? `[CHARACTERS]
- <name>: <action/state change> (scene: <location>)

[LOCATIONS]
- <character> moved from <A> to <B>

[RESOURCES]
- <character> gained/lost <item> (quantity: <n>)

[RELATIONSHIPS]
- <charA> → <charB>: <change description>

[EMOTIONS]
- <character>: <before> → <after> (trigger: <event>)

[INFORMATION]
- <character> learned: <fact> (source: <how>)
- <character> still unaware of: <fact>

[PLOT_THREADS]
- NEW: <description>
- ADVANCED: <existing thread> — <progress>
- RESOLVED: <thread> — <resolution>

[TIME]
- <time markers, duration>

[PHYSICAL_STATE]
- <character>: <injury/healing/fatigue/power change>` : `[角色行为]
- <角色名>: <行为/状态变化> (场景: <地点>)

[位置变化]
- <角色> 从 <A> 到 <B>

[资源变化]
- <角色> 获得/失去 <物品> (数量: <n>)

[关系变化]
- <角色A> → <角色B>: <变化描述>

[情绪变化]
- <角色>: <之前> → <之后> (触发: <事件>)

[信息流动]
- <角色> 得知: <事实> (来源: <途径>)
- <角色> 仍不知: <事实>

[剧情线索]
- 新埋: <描述>
- 推进: <已有线索> — <进展>
- 回收: <线索> — <解答>

[时间]
- <时间标记、时长>

[身体状态]
- <角色>: <受伤/恢复/疲劳/战力变化>`}`;
}

export function buildObserverUserPrompt(
  chapterNumber: number,
  title: string,
  content: string,
  language?: "zh" | "en" | "ru",
): string {
  if (language === "ru") {
    return `Извлеки все факты из главы ${chapterNumber} «${title}»:\n\n${content}`;
  }
  const isEnglish = language === "en";
  return isEnglish
    ? `Extract all facts from Chapter ${chapterNumber} "${title}":\n\n${content}`
    : `请提取第${chapterNumber}章「${title}」中的所有事实：\n\n${content}`;
}
