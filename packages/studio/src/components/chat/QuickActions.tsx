import {
  Zap,
  Search,
  FileOutput,
  TrendingUp,
} from "lucide-react";
import type { TFunction, StringKey } from "../../hooks/use-i18n";

export interface QuickActionsProps {
  readonly onAction: (command: string) => void;
  readonly disabled: boolean;
  readonly t: TFunction;
}

interface ChipDef {
  readonly icon: React.ReactNode;
  readonly labelKey: StringKey;
  readonly commandZh: string;
  readonly commandEn: string;
  readonly commandRu: string;
}

const CHIPS: ReadonlyArray<ChipDef> = [
  {
    icon: <Zap size={12} />,
    labelKey: "qa.writeNext",
    commandZh: "写下一章",
    commandEn: "write next",
    commandRu: "напиши следующую главу",
  },
  {
    icon: <Search size={12} />,
    labelKey: "qa.audit",
    commandZh: "审计",
    commandEn: "audit",
    commandRu: "проведи аудит",
  },
  {
    icon: <FileOutput size={12} />,
    labelKey: "qa.export",
    commandZh: "导出全书",
    commandEn: "export book",
    commandRu: "экспортируй книгу",
  },
  {
    icon: <TrendingUp size={12} />,
    labelKey: "qa.radar",
    commandZh: "扫描市场趋势",
    commandEn: "scan market trends",
    commandRu: "проанализируй тренды рынка",
  },
];

/**
 * Pick a quick-action command in the operator's language. The command
 * text is what gets sent to the agent so the response uses the same
 * language; we treat unknown languages as English so the agent still
 * gets an actionable instruction.
 */
export function pickQuickActionCommand(chip: ChipDef, lang: string): string {
  if (lang === "zh") return chip.commandZh;
  if (lang === "ru") return chip.commandRu;
  return chip.commandEn;
}

export function QuickActions({ onAction, disabled, t }: QuickActionsProps) {
  // Probe the active language by looking at a known string with distinct values per locale.
  const probe = t("nav.connected");
  const lang = probe === "已连接" ? "zh" : probe === "Подключено" ? "ru" : "en";

  return (
    <div className="flex gap-2 overflow-x-auto px-1 py-1">
      {CHIPS.map((chip) => {
        const label = t(chip.labelKey);
        const command = pickQuickActionCommand(chip, lang);
        return (
          <button
            key={chip.labelKey}
            onClick={() => onAction(command)}
            disabled={disabled}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/30 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all disabled:opacity-40 disabled:pointer-events-none group"
          >
            <span className="group-hover:scale-110 transition-transform">{chip.icon}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
