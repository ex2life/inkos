/**
 * Lightweight, hook-free i18n shim for code paths that run outside React
 * (zustand actions, runtime stream handlers). The chat store cannot call
 * `useI18n()` because zustand actions are not React render cycles.
 *
 * Strategy: cache the active language in module scope; components that
 * already know the language push it here via `setStoreLang(...)`. We
 * default to Russian for this fork — Chinese / English are still
 * available, but only if a component pushes them in.
 *
 * The string table here only covers the chat-store-specific messages
 * that surface to the operator (model not selected, empty response).
 * UI rendering paths use the full `useI18n()` table directly.
 */

export type StoreLang = "zh" | "en" | "ru";

type StoreStringKey = "chat.selectModelFirst" | "chat.emptyResponse" | "tool.error.errorPrefix";

const STORE_STRINGS: Record<StoreStringKey, Record<StoreLang, string>> = {
  "chat.selectModelFirst": {
    zh: "请先选择一个模型",
    en: "Please select a model first",
    ru: "Сначала выберите модель",
  },
  "chat.emptyResponse": {
    zh: "模型未返回文本内容。请检查协议类型（chat/responses）、流式开关或上游服务兼容性。",
    en: "The model returned no text. Check the protocol type (chat/responses), streaming flag, or upstream service compatibility.",
    ru: "Модель не вернула текст. Проверьте тип протокола (chat/responses), потоковый режим и совместимость провайдера.",
  },
  "tool.error.errorPrefix": {
    zh: "错误：",
    en: "Error: ",
    ru: "Ошибка: ",
  },
};

let storeLang: StoreLang = "ru";

export function setStoreLang(lang: StoreLang): void {
  storeLang = lang;
}

export function resolveStoreLang(): StoreLang {
  return storeLang;
}

export function storeT(key: StoreStringKey, lang: StoreLang = storeLang): string {
  return STORE_STRINGS[key][lang];
}
