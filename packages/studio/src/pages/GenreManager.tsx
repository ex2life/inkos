import { fetchJson, useApi, postApi } from "../hooks/use-api";
import { useState } from "react";
import type { Theme } from "../hooks/use-theme";
import type { TFunction } from "../hooks/use-i18n";
import { useI18n } from "../hooks/use-i18n";
import { useColors } from "../hooks/use-colors";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Plus, Pencil, Trash2 } from "lucide-react";

export type GenreLang = "zh" | "en" | "ru";

interface GenreInfo {
  readonly id: string;
  readonly name: string;
  readonly source: "project" | "builtin";
  readonly language: GenreLang;
}

interface GenreDetail {
  readonly profile: {
    readonly name: string;
    readonly id: string;
    readonly language: string;
    readonly chapterTypes: ReadonlyArray<string>;
    readonly fatigueWords: ReadonlyArray<string>;
    readonly numericalSystem: boolean;
    readonly powerScaling: boolean;
    readonly eraResearch: boolean;
    readonly pacingRule: string;
    readonly auditDimensions: ReadonlyArray<number>;
  };
  readonly body: string;
}

interface GenreFormData {
  readonly id: string;
  readonly name: string;
  readonly language: GenreLang;
  readonly chapterTypes: string;
  readonly fatigueWords: string;
  readonly numericalSystem: boolean;
  readonly powerScaling: boolean;
  readonly eraResearch: boolean;
  readonly pacingRule: string;
  readonly body: string;
}

const EMPTY_FORM: GenreFormData = {
  id: "",
  name: "",
  language: "zh",
  chapterTypes: "",
  fatigueWords: "",
  numericalSystem: false,
  powerScaling: false,
  eraResearch: false,
  pacingRule: "",
  body: "",
};

/**
 * Coerce an unknown language string from the backend into the
 * tri-language union the form understands. Anything we do not
 * recognise falls back to Chinese to preserve historical behaviour.
 */
export function coerceGenreLanguage(raw: string | undefined | null): GenreLang {
  if (raw === "en" || raw === "ru" || raw === "zh") return raw;
  return "zh";
}

/**
 * Localised, human-readable label for a genre's language tag, shown
 * in the active Studio UI language. Uses the wider string union of
 * the source language so the picker can render labels even when the
 * Studio shell is still on `zh | en` (the i18n core widening lands
 * separately).
 */
export function genreLanguageLabel(
  lang: GenreLang,
  uiLang: string,
): string {
  if (uiLang === "ru") {
    if (lang === "zh") return "Китайский";
    if (lang === "en") return "Английский";
    return "Русский";
  }
  if (uiLang === "en") {
    if (lang === "zh") return "Chinese";
    if (lang === "en") return "English";
    return "Russian";
  }
  // default: zh UI
  if (lang === "zh") return "中文";
  if (lang === "en") return "英文";
  return "俄文";
}

/**
 * Tri-lingual UI strings for in-page labels and placeholders. The
 * picker labels itself in the active Studio UI language so a Russian
 * operator sees Russian, an English operator sees English, etc.
 */
function pageStrings(uiLang: string) {
  if (uiLang === "ru") {
    return {
      languageLabel: "Язык",
      idLabel: "ID",
      nameLabel: "Название",
      chapterTypesLabel: "Типы глав (через запятую)",
      fatigueWordsLabel: "Слова-паразиты (через запятую)",
      numericalSystem: "Числовая система",
      powerScaling: "Шкала силы",
      eraResearch: "Исследование эпохи",
      pacingRule: "Правило темпа",
      rulesMarkdown: "Правила (Markdown)",
      createGenreBtn: "Создать жанр",
      createNewHeading: "Создать новый жанр",
      editPrefix: "Редактировать",
      editBtn: "Редактировать",
      deleteBtn: "Удалить",
      copyToProject: "Копировать в проект",
      copiedAlert: (id: string) => `Скопировано ${id} в genres/ проекта`,
      createFailed: "Не удалось создать жанр",
      updateFailed: "Не удалось обновить жанр",
      deleteFailed: "Не удалось удалить жанр",
      selectHint: "Выберите жанр для просмотра деталей",
      deleteTitle: "Удалить жанр",
      deleteMessage: (id: string) => `Удалить жанр «${id}»?`,
      defaultDeleteLabel: "Удалить",
      defaultCancelLabel: "Отмена",
      chapterTypesHeading: "Типы глав",
      fatigueWordsHeading: "Слова-паразиты",
      pacingHeading: "Темп",
      rulesHeading: "Правила",
    };
  }
  if (uiLang === "en") {
    return {
      languageLabel: "Language",
      idLabel: "ID",
      nameLabel: "Name",
      chapterTypesLabel: "Chapter Types (comma-separated)",
      fatigueWordsLabel: "Fatigue Words (comma-separated)",
      numericalSystem: "Numerical System",
      powerScaling: "Power Scaling",
      eraResearch: "Era Research",
      pacingRule: "Pacing Rule",
      rulesMarkdown: "Rules (Markdown)",
      createGenreBtn: "Create Genre",
      createNewHeading: "Create New Genre",
      editPrefix: "Edit",
      editBtn: "Edit",
      deleteBtn: "Delete",
      copyToProject: "Copy to Project",
      copiedAlert: (id: string) => `Copied ${id} to project genres/`,
      createFailed: "Failed to create genre",
      updateFailed: "Failed to update genre",
      deleteFailed: "Failed to delete genre",
      selectHint: "Select a genre to view details",
      deleteTitle: "Delete Genre",
      deleteMessage: (id: string) => `Delete genre "${id}"?`,
      defaultDeleteLabel: "Delete",
      defaultCancelLabel: "Cancel",
      chapterTypesHeading: "Chapter Types",
      fatigueWordsHeading: "Fatigue Words",
      pacingHeading: "Pacing",
      rulesHeading: "Rules",
    };
  }
  // default: zh
  return {
    languageLabel: "语言",
    idLabel: "ID",
    nameLabel: "名称",
    chapterTypesLabel: "章节类型（逗号分隔）",
    fatigueWordsLabel: "疲劳词（逗号分隔）",
    numericalSystem: "数值系统",
    powerScaling: "力量等级",
    eraResearch: "时代研究",
    pacingRule: "节奏规则",
    rulesMarkdown: "规则（Markdown）",
    createGenreBtn: "创建题材",
    createNewHeading: "创建新题材",
    editPrefix: "编辑",
    editBtn: "编辑",
    deleteBtn: "删除",
    copyToProject: "复制到项目",
    copiedAlert: (id: string) => `已复制 ${id} 到项目 genres/`,
    createFailed: "创建题材失败",
    updateFailed: "更新题材失败",
    deleteFailed: "删除题材失败",
    selectHint: "选择题材查看详情",
    deleteTitle: "删除题材",
    deleteMessage: (id: string) => `确认删除题材「${id}」？`,
    defaultDeleteLabel: "删除",
    defaultCancelLabel: "取消",
    chapterTypesHeading: "章节类型",
    fatigueWordsHeading: "疲劳词",
    pacingHeading: "节奏",
    rulesHeading: "规则",
  };
}

function parseCommaSeparated(value: string): ReadonlyArray<string> {
  return value.split(",").map((s) => s.trim()).filter(Boolean);
}

function GenreForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEdit,
  c,
  t,
  uiLang,
}: {
  readonly form: GenreFormData;
  readonly onChange: (next: GenreFormData) => void;
  readonly onSubmit: () => void;
  readonly onCancel: () => void;
  readonly isEdit: boolean;
  readonly c: ReturnType<typeof useColors>;
  readonly t: TFunction;
  readonly uiLang: string;
}) {
  const set = <K extends keyof GenreFormData>(key: K, value: GenreFormData[K]) =>
    onChange({ ...form, [key]: value });

  const s = pageStrings(uiLang);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wide">{s.idLabel}</label>
          <input
            type="text"
            value={form.id}
            onChange={(e) => set("id", e.target.value)}
            disabled={isEdit}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm disabled:opacity-50"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wide">{s.nameLabel}</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wide">{s.languageLabel}</label>
        <select
          value={form.language}
          onChange={(e) => set("language", coerceGenreLanguage(e.target.value))}
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="zh">{genreLanguageLabel("zh", uiLang)}</option>
          <option value="en">{genreLanguageLabel("en", uiLang)}</option>
          <option value="ru">{genreLanguageLabel("ru", uiLang)}</option>
        </select>
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wide">
          {s.chapterTypesLabel}
        </label>
        <input
          type="text"
          value={form.chapterTypes}
          onChange={(e) => set("chapterTypes", e.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wide">
          {s.fatigueWordsLabel}
        </label>
        <input
          type="text"
          value={form.fatigueWords}
          onChange={(e) => set("fatigueWords", e.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.numericalSystem}
            onChange={(e) => set("numericalSystem", e.target.checked)}
          />
          {s.numericalSystem}
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.powerScaling}
            onChange={(e) => set("powerScaling", e.target.checked)}
          />
          {s.powerScaling}
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.eraResearch}
            onChange={(e) => set("eraResearch", e.target.checked)}
          />
          {s.eraResearch}
        </label>
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wide">{s.pacingRule}</label>
        <input
          type="text"
          value={form.pacingRule}
          onChange={(e) => set("pacingRule", e.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wide">{s.rulesMarkdown}</label>
        <textarea
          value={form.body}
          onChange={(e) => set("body", e.target.value)}
          rows={6}
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-mono"
        />
      </div>

      <div className="flex gap-2">
        <button onClick={onSubmit} className={`px-4 py-2 text-sm rounded-md ${c.btnPrimary}`}>
          {isEdit ? t("genre.saveChanges") : t("genre.createNew")}
        </button>
        <button onClick={onCancel} className={`px-4 py-2 text-sm rounded-md ${c.btnSecondary}`}>
          {t("genre.cancel")}
        </button>
      </div>
    </div>
  );
}

interface Nav {
  toDashboard: () => void;
}

export function GenreManager({ nav, theme, t }: { nav: Nav; theme: Theme; t: TFunction }) {
  const c = useColors(theme);
  const { lang } = useI18n();
  // Studio UI language may currently be "zh" | "en" but the i18n widening
  // is in flight; we treat it as a plain string so this page handles "ru"
  // naturally once the core lands.
  const uiLang: string = lang;
  const s = pageStrings(uiLang);

  const { data, refetch } = useApi<{ genres: ReadonlyArray<GenreInfo> }>("/genres");
  const [selected, setSelected] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<"hidden" | "create" | "edit">("hidden");
  const [form, setForm] = useState<GenreFormData>(EMPTY_FORM);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  // Show genres matching the current UI language plus any custom project genres
  const filteredGenres = data?.genres.filter((g) => g.language === uiLang || g.source === "project") ?? [];
  const validSelected = selected && filteredGenres.some((g) => g.id === selected) ? selected : null;
  const selectedGenre = filteredGenres.find((g) => g.id === validSelected) ?? null;

  const { data: detail } = useApi<GenreDetail>(validSelected ? `/genres/${validSelected}` : "");

  const handleCopy = async (id: string) => {
    await postApi(`/genres/${id}/copy`);
    alert(s.copiedAlert(id));
    refetch();
  };

  const openCreateForm = () => {
    setForm(EMPTY_FORM);
    setFormMode("create");
  };

  const openEditForm = () => {
    if (!detail) return;
    setForm({
      id: detail.profile.id,
      name: detail.profile.name,
      language: coerceGenreLanguage(detail.profile.language),
      chapterTypes: detail.profile.chapterTypes.join(", "),
      fatigueWords: detail.profile.fatigueWords.join(", "),
      numericalSystem: detail.profile.numericalSystem,
      powerScaling: detail.profile.powerScaling,
      eraResearch: detail.profile.eraResearch ?? false,
      pacingRule: detail.profile.pacingRule,
      body: detail.body,
    });
    setFormMode("edit");
  };

  const closeForm = () => {
    setFormMode("hidden");
  };

  const handleCreate = async () => {
    try {
      await postApi("/genres/create", {
        id: form.id,
        name: form.name,
        language: form.language,
        chapterTypes: parseCommaSeparated(form.chapterTypes),
        fatigueWords: parseCommaSeparated(form.fatigueWords),
        numericalSystem: form.numericalSystem,
        powerScaling: form.powerScaling,
        eraResearch: form.eraResearch,
        pacingRule: form.pacingRule,
        body: form.body,
      });
      setFormMode("hidden");
      refetch();
    } catch (e) {
      alert(e instanceof Error ? e.message : s.createFailed);
    }
  };

  const handleEdit = async () => {
    if (!validSelected) return;
    try {
      await fetchJson(`/genres/${validSelected}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: {
            id: form.id,
            name: form.name,
            language: form.language,
            chapterTypes: parseCommaSeparated(form.chapterTypes),
            fatigueWords: parseCommaSeparated(form.fatigueWords),
            numericalSystem: form.numericalSystem,
            powerScaling: form.powerScaling,
            eraResearch: form.eraResearch,
            pacingRule: form.pacingRule,
          },
          body: form.body,
        }),
      });
      setFormMode("hidden");
      refetch();
    } catch (e) {
      alert(e instanceof Error ? e.message : s.updateFailed);
    }
  };

  const handleDelete = async () => {
    if (!validSelected) return;
    setConfirmDeleteOpen(false);
    try {
      await fetchJson(`/genres/${validSelected}`, { method: "DELETE" });
      setSelected(null);
      refetch();
    } catch (e) {
      alert(e instanceof Error ? e.message : s.deleteFailed);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button onClick={nav.toDashboard} className={c.link}>{t("bread.home")}</button>
        <span className="text-border">/</span>
        <span>{t("create.genre")}</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">{t("create.genre")}</h1>
        <button
          onClick={openCreateForm}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md ${c.btnPrimary}`}
        >
          <Plus size={16} />
          {s.createGenreBtn}
        </button>
      </div>

      {formMode !== "hidden" && (
        <div className={`border ${c.cardStatic} rounded-lg p-6`}>
          <h2 className="text-lg font-medium mb-4">
            {formMode === "create" ? s.createNewHeading : `${s.editPrefix}: ${form.id}`}
          </h2>
          <GenreForm
            form={form}
            onChange={setForm}
            onSubmit={formMode === "create" ? handleCreate : handleEdit}
            onCancel={closeForm}
            isEdit={formMode === "edit"}
            c={c}
            t={t}
            uiLang={uiLang}
          />
        </div>
      )}

      <div className="grid grid-cols-[250px_1fr] gap-6">
        {/* Genre list */}
        <div className={`border ${c.cardStatic} rounded-lg overflow-hidden`}>
          {filteredGenres.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelected(g.id)}
              className={`w-full text-left px-4 py-3 border-b border-border/40 transition-colors ${
                validSelected === g.id ? "bg-primary/10 text-primary" : "hover:bg-muted/30"
              }`}
            >
              <div className="text-sm font-medium">{g.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {g.id} · {genreLanguageLabel(g.language, uiLang)} · {g.source}
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className={`border ${c.cardStatic} rounded-lg p-6 min-h-[400px]`}>
          {validSelected && detail ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-medium">{detail.profile.name}</h2>
                  <div className="text-sm text-muted-foreground mt-1">
                    {detail.profile.id} · {genreLanguageLabel(coerceGenreLanguage(detail.profile.language), uiLang)} ·
                    {detail.profile.numericalSystem ? ` ${s.numericalSystem}` : ""}
                    {detail.profile.powerScaling ? ` ${s.powerScaling}` : ""}
                    {detail.profile.eraResearch ? ` ${s.eraResearch}` : ""}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={openEditForm}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm ${c.btnSecondary} rounded-md`}
                  >
                    <Pencil size={14} />
                    {s.editBtn}
                  </button>
                  {selectedGenre?.source === "project" && (
                    <button
                      onClick={() => setConfirmDeleteOpen(true)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm ${c.btnDanger} rounded-md`}
                    >
                      <Trash2 size={14} />
                      {s.deleteBtn}
                    </button>
                  )}
                  <button
                    onClick={() => validSelected && handleCopy(validSelected)}
                    className={`px-3 py-1.5 text-sm ${c.btnSecondary} rounded-md`}
                  >
                    {s.copyToProject}
                  </button>
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{s.chapterTypesHeading}</div>
                <div className="flex gap-2 flex-wrap">
                  {detail.profile.chapterTypes.map((ct) => (
                    <span key={ct} className="px-2 py-1 text-xs bg-secondary rounded">{ct}</span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{s.fatigueWordsHeading}</div>
                <div className="flex gap-2 flex-wrap">
                  {detail.profile.fatigueWords.slice(0, 15).map((w) => (
                    <span key={w} className="px-2 py-1 text-xs bg-secondary rounded">{w}</span>
                  ))}
                  {detail.profile.fatigueWords.length > 15 && (
                    <span className="text-xs text-muted-foreground">+{detail.profile.fatigueWords.length - 15}</span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{s.pacingHeading}</div>
                <div className="text-sm">{detail.profile.pacingRule || "—"}</div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{s.rulesHeading}</div>
                <pre className="text-sm leading-relaxed whitespace-pre-wrap font-mono text-foreground/80 bg-muted/30 p-4 rounded-md max-h-[300px] overflow-y-auto">
                  {detail.body || "—"}
                </pre>
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground text-sm italic flex items-center justify-center h-full">
              {s.selectHint}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmDeleteOpen}
        title={s.deleteTitle}
        message={s.deleteMessage(validSelected ?? "")}
        confirmLabel={t("common.delete") ?? s.defaultDeleteLabel}
        cancelLabel={t("genre.cancel") ?? s.defaultCancelLabel}
        variant="danger"
        onConfirm={() => void handleDelete()}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </div>
  );
}
