import { describe, expect, it } from "vitest";
import { classifyLocalTuiCommand, parseDepthCommand } from "../tui/local-commands.js";

describe("tui local commands", () => {
  it("recognizes help aliases", () => {
    expect(classifyLocalTuiCommand("/help")).toBe("help");
    expect(classifyLocalTuiCommand("help")).toBe("help");
    expect(classifyLocalTuiCommand("帮助")).toBe("help");
  });

  it("recognizes status aliases", () => {
    expect(classifyLocalTuiCommand("/status")).toBe("status");
    expect(classifyLocalTuiCommand("status")).toBe("status");
    expect(classifyLocalTuiCommand("状态")).toBe("status");
  });

  it("recognizes quit aliases", () => {
    expect(classifyLocalTuiCommand("/quit")).toBe("quit");
    expect(classifyLocalTuiCommand("/exit")).toBe("quit");
    expect(classifyLocalTuiCommand("quit")).toBe("quit");
    expect(classifyLocalTuiCommand("exit")).toBe("quit");
    expect(classifyLocalTuiCommand("bye")).toBe("quit");
    expect(classifyLocalTuiCommand("退出")).toBe("quit");
  });

  it("recognizes config and clear aliases", () => {
    expect(classifyLocalTuiCommand("/config")).toBe("config");
    expect(classifyLocalTuiCommand("配置")).toBe("config");
    expect(classifyLocalTuiCommand("/clear")).toBe("clear");
    expect(classifyLocalTuiCommand("清屏")).toBe("clear");
  });

  it("returns undefined for normal chat input", () => {
    expect(classifyLocalTuiCommand("hi")).toBeUndefined();
    expect(classifyLocalTuiCommand("continue current book")).toBeUndefined();
  });

  it("parses depth commands", () => {
    expect(parseDepthCommand("/depth deep")).toBe("deep");
    expect(parseDepthCommand("depth light")).toBe("light");
    expect(parseDepthCommand("/depth normal")).toBe("normal");
    expect(parseDepthCommand("深度 轻量")).toBe("light");
    expect(parseDepthCommand("/深度 标准")).toBe("normal");
    expect(parseDepthCommand("深度 深入")).toBe("deep");
    expect(parseDepthCommand("/depth weird")).toBeUndefined();
  });

  it("recognizes Russian command aliases", () => {
    expect(classifyLocalTuiCommand("помощь")).toBe("help");
    expect(classifyLocalTuiCommand("справка")).toBe("help");
    expect(classifyLocalTuiCommand("статус")).toBe("status");
    expect(classifyLocalTuiCommand("выход")).toBe("quit");
    expect(classifyLocalTuiCommand("выйти")).toBe("quit");
    expect(classifyLocalTuiCommand("настройки")).toBe("config");
    expect(classifyLocalTuiCommand("очистить")).toBe("clear");
  });

  it("parses Russian depth commands", () => {
    expect(parseDepthCommand("глубина лёгкая")).toBe("light");
    expect(parseDepthCommand("/глубина обычная")).toBe("normal");
    expect(parseDepthCommand("глубина глубокая")).toBe("deep");
  });
});
