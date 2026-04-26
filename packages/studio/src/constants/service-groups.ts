import type { EndpointGroup } from "../store/service/types";
import type { StringKey, TFunction } from "../hooks/use-i18n";

export const GROUP_ORDER: ReadonlyArray<EndpointGroup> = [
  "overseas",
  "china",
  "aggregator",
  "local",
  "codingPlan",
] as const;

const GROUP_LABEL_KEYS: Record<EndpointGroup, StringKey> = {
  overseas: "serviceGroup.overseas",
  china: "serviceGroup.china",
  aggregator: "serviceGroup.aggregator",
  local: "serviceGroup.local",
  codingPlan: "serviceGroup.codingPlan",
};

const GROUP_SHORT_LABEL_KEYS: Record<EndpointGroup, StringKey> = {
  overseas: "serviceGroup.short.overseas",
  china: "serviceGroup.short.china",
  aggregator: "serviceGroup.short.aggregator",
  local: "serviceGroup.short.local",
  codingPlan: "serviceGroup.short.codingPlan",
};

/**
 * Resolve the human-readable label for an endpoint group via the
 * shared i18n table. Callers provide the active `t` function so the
 * label follows the operator's UI language.
 */
export function groupLabel(group: EndpointGroup, t: TFunction): string {
  return t(GROUP_LABEL_KEYS[group]);
}

export function groupShortLabel(group: EndpointGroup, t: TFunction): string {
  return t(GROUP_SHORT_LABEL_KEYS[group]);
}

/**
 * Backwards-compatible label maps. These return Chinese strings so any
 * legacy caller that hasn't been migrated to the `groupLabel(...)` helper
 * still renders the historical fallback rather than crashing.
 */
export const GROUP_LABELS: Record<EndpointGroup, string> = {
  overseas: "海外原厂",
  china: "国产原厂",
  aggregator: "聚合 / 二手 API",
  local: "本地 / 订阅",
  codingPlan: "CodingPlan",
};

export const GROUP_SHORT_LABELS: Record<EndpointGroup, string> = {
  overseas: "海外",
  china: "国产",
  aggregator: "聚合",
  local: "本地",
  codingPlan: "CodingPlan",
};
