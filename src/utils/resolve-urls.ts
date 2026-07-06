const RESOLVABLE_KEYS = new Set(['url', 'secure_url', 'canonical'])

function resolve(value: string, baseUrl: string): string {
  try {
    return new URL(value, baseUrl).href
  } catch {
    return value
  }
}

/**
 * Recursively resolves relative `url`/`secure_url`/`canonical` values in an
 * object (or array) against `baseUrl`. Mutates and returns the same object.
 */
export default function resolveUrlsInObj<T>(obj: T, baseUrl: string): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  for (const key of Object.keys(obj)) {
    const value = (obj as Record<string, unknown>)[key]

    if (value !== null && typeof value === 'object') {
      resolveUrlsInObj(value, baseUrl)
    } else if (typeof value === 'string' && RESOLVABLE_KEYS.has(key)) {
      ;(obj as Record<string, unknown>)[key] = resolve(value, baseUrl)
    }
  }

  return obj
}
