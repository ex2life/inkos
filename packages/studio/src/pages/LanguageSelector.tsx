import { useState } from "react";

export type LanguageSelectorLang = "zh" | "en" | "ru";

export interface LanguageOption {
  readonly value: LanguageSelectorLang;
  readonly heading: string;
  readonly headingItalic: boolean;
  readonly description: string;
  readonly platforms: string;
}

export const LANGUAGE_OPTIONS: ReadonlyArray<LanguageOption> = [
  {
    value: "zh",
    heading: "中文创作",
    headingItalic: false,
    description: "玄幻 · 仙侠 · 都市 · 恐怖 · 通用",
    platforms: "番茄小说 · 起点中文网 · 飞卢",
  },
  {
    value: "en",
    heading: "English Writing",
    headingItalic: true,
    description: "LitRPG · Progression · Romantasy · Sci-Fi · Isekai",
    platforms: "Royal Road · Kindle Unlimited · Scribble Hub",
  },
  {
    value: "ru",
    heading: "Русское творчество",
    headingItalic: false,
    description: "ЛитРПГ · Попаданцы · Бояръ-аниме · Романтика · Фантастика",
    platforms: "Author.Today · Литнет · Литмаркет · ЛитРес-Самиздат · Boosty",
  },
];

export function LanguageSelector({ onSelect }: { onSelect: (lang: LanguageSelectorLang) => void }) {
  const [hovering, setHovering] = useState<LanguageSelectorLang | null>(null);
  const [selected, setSelected] = useState<LanguageSelectorLang | null>(null);

  const handleSelect = (lang: LanguageSelectorLang) => {
    setSelected(lang);
    // Brief pause for the selection animation before transitioning
    setTimeout(() => onSelect(lang), 400);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8">
      {/* Logo — cinematic scale */}
      <div className="mb-16 text-center">
        <div className="flex items-baseline justify-center gap-1.5 mb-4">
          <span className="font-serif text-6xl italic text-primary">Ink</span>
          <span className="text-5xl font-semibold tracking-tight text-foreground">OS</span>
        </div>
        <div className="text-base text-muted-foreground tracking-widest uppercase">Studio</div>
      </div>

      {/* Language cards — generous, distinct, immersive */}
      <div className="flex flex-wrap justify-center gap-8 mb-16">
        {LANGUAGE_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            onMouseEnter={() => setHovering(option.value)}
            onMouseLeave={() => setHovering(null)}
            className={`group w-80 border rounded-lg p-10 text-left transition-all duration-300 ${
              selected === option.value
                ? "border-primary bg-primary/10 scale-[1.02]"
                : hovering === option.value
                  ? "border-primary/50 bg-card"
                  : "border-border bg-card/50"
            }`}
          >
            <div className={`font-serif text-3xl mb-4 text-foreground${option.headingItalic ? " italic" : ""}`}>
              {option.heading}
            </div>
            <div className="text-base text-foreground/70 leading-relaxed mb-6">
              {option.description}
            </div>
            <div className="text-sm text-muted-foreground">
              {option.platforms}
            </div>
          </button>
        ))}
      </div>

      <div className="text-sm text-muted-foreground">
        可在设置中更改 · Can be changed in Settings · Можно изменить в настройках
      </div>
    </div>
  );
}
