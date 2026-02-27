export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  signal?: AbortSignal;
};

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE?.toString().trim() || "/api";

function buildUrl(
  path: string,
  query?: Record<string, string | number | boolean | undefined | null>,
) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(
    API_BASE.replace(/\/$/, "") + cleanPath,
    window.location.origin,
  );

  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null || v === "") continue;
      url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

export async function http<T>(
  path: string,
  options: RequestOptions = {},
  query?: Record<string, string | number | boolean | undefined | null>,
): Promise<T> {
  const res = await fetch(buildUrl(path, query), {
    method: options.method || "GET",
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
