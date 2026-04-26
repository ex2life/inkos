/**
 * Configure undici (Node's built-in HTTP client used by native `fetch` and
 * therefore by the OpenAI / Anthropic SDKs) so long-running LLM streams aren't
 * killed by the 5-minute defaults.
 *
 * Why: `undici.Agent` defaults are `headersTimeout: 300_000 ms` and
 * `bodyTimeout: 300_000 ms`. A slow LLM provider that "thinks" silently for
 * more than 5 minutes before sending the first token (or pauses mid-stream)
 * triggers a `UND_ERR_HEADERS_TIMEOUT` / `UND_ERR_BODY_TIMEOUT`, which
 * surfaces as `fetch failed: ECONNREFUSED`-style noise downstream.
 *
 * The fork's default raises both to 1 hour. Operators can override with
 * `INKOS_LLM_HTTP_TIMEOUT_MS` if they need longer (e.g. very deep thinking
 * models on a slow connection).
 *
 * Idempotent — safe to call multiple times. Logs once and only once if the
 * environment supplies a non-default value.
 */

let _configured = false;

const DEFAULT_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour
const MIN_TIMEOUT_MS = 60_000; // 1 minute floor — anything shorter is almost certainly a misconfiguration

export interface ConfigureHttpTimeoutsOptions {
  /** Override per-call instead of reading INKOS_LLM_HTTP_TIMEOUT_MS. */
  readonly timeoutMs?: number;
}

export async function configureLLMHttpTimeouts(
  options?: ConfigureHttpTimeoutsOptions,
): Promise<void> {
  if (_configured) return;

  const envValue = process.env.INKOS_LLM_HTTP_TIMEOUT_MS;
  const parsedEnv = envValue ? Number(envValue) : NaN;
  const requested =
    options?.timeoutMs ?? (Number.isFinite(parsedEnv) && parsedEnv > 0 ? parsedEnv : DEFAULT_TIMEOUT_MS);
  const timeoutMs = Math.max(MIN_TIMEOUT_MS, requested);

  try {
    // `undici` is the HTTP client backing Node's native `fetch`. It ships
    // inside Node but is NOT importable as a top-level ESM module without an
    // explicit dependency declaration — that's why prior dynamic-import
    // attempts silently no-oped. We declare it in core/package.json so it
    // resolves cleanly at runtime.
    const undici = await import("undici").catch((error) => {
      process.stderr.write(
        `[inkos] WARN: undici unavailable — LLM HTTP timeouts stay at Node defaults (${String(error?.message ?? error)})\n`,
      );
      return null;
    });
    if (!undici || typeof undici.setGlobalDispatcher !== "function" || typeof undici.Agent !== "function") {
      process.stderr.write(
        "[inkos] WARN: undici loaded but missing setGlobalDispatcher/Agent — skipping HTTP timeout override\n",
      );
      return;
    }
    undici.setGlobalDispatcher(
      new undici.Agent({
        headersTimeout: timeoutMs,
        bodyTimeout: timeoutMs,
        connectTimeout: 60_000,
        keepAliveTimeout: 60_000,
        keepAliveMaxTimeout: 600_000,
      }),
    );
    _configured = true;
    // Always surface so operators can see the dispatcher is actually patched.
    // If you still see fetch failures around 5 minutes after this log fires,
    // the cap is server-side (provider / CDN / reverse-proxy idle timeout)
    // and no client-side change can extend it — switch provider or ask them
    // to lift their idle timeout.
    process.stderr.write(
      `[inkos] LLM HTTP timeout configured: ${Math.round(timeoutMs / 1000)}s` +
        `${envValue ? " (from INKOS_LLM_HTTP_TIMEOUT_MS)" : ""}\n`,
    );
  } catch {
    // Never fail startup because of this.
  }
}

/** Test-only: reset the idempotency flag. */
export function __resetLLMHttpTimeoutsForTesting(): void {
  _configured = false;
}
