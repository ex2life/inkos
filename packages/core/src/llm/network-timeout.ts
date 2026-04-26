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
    // undici ships with Node 18+; importing dynamically so the build doesn't
    // require an explicit dependency declaration. If undici is unavailable we
    // silently skip — falls back to Node's defaults.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore — undici is a Node built-in, no types declared in this workspace
    const undici = await import("undici").catch(() => null) as null | {
      setGlobalDispatcher: (dispatcher: unknown) => void;
      Agent: new (opts: Record<string, unknown>) => unknown;
    };
    if (!undici || typeof undici.setGlobalDispatcher !== "function" || typeof undici.Agent !== "function") {
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
    if (envValue) {
      // Surface that the user-set value was honored so misconfiguration is visible.
      // Use process.stderr directly (no logger dependency) so this works very early.
      process.stderr.write(
        `[inkos] LLM HTTP timeout set to ${timeoutMs} ms (from INKOS_LLM_HTTP_TIMEOUT_MS)\n`,
      );
    }
  } catch {
    // Never fail startup because of this.
  }
}

/** Test-only: reset the idempotency flag. */
export function __resetLLMHttpTimeoutsForTesting(): void {
  _configured = false;
}
