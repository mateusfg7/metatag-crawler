import type { CheerioAPI } from 'cheerio'

/** Path browsers request by convention when no icon is declared. */
const DEFAULT_FAVICON = '/favicon.ico'

interface Candidate {
  href: string
  rank: number
  isSvg: boolean
  size: number
}

/**
 * Ranks the `rel` of a `<link>` by how likely it is to be the browser-tab
 * favicon. Standard `icon`/`shortcut icon` win over platform-specific icons.
 */
function relRank(rel: string): number {
  const tokens = rel.split(/\s+/)
  if (tokens.includes('icon')) return 3 // "icon", "shortcut icon"
  if (rel === 'apple-touch-icon' || rel === 'apple-touch-icon-precomposed') {
    return 2
  }
  if (rel === 'mask-icon' || rel === 'fluid-icon') return 1
  return 0
}

/** Largest dimension declared in a `sizes` attribute (e.g. "16x16 32x32"). */
function largestSize(sizes?: string): number {
  if (!sizes) return 0
  if (sizes.toLowerCase() === 'any') return Number.POSITIVE_INFINITY
  return sizes
    .split(/\s+/)
    .map((token) => parseInt(token.split(/x/i)[0], 10))
    .filter((n) => !Number.isNaN(n))
    .reduce((max, n) => Math.max(max, n), 0)
}

function isSvg(href: string, type?: string): boolean {
  if (type && type.toLowerCase().includes('svg')) return true
  return /\.svg(\?|#|$)/i.test(href)
}

/** A candidate is "better" if it has a higher rel rank, then is scalable
 * (SVG), then declares a larger size. */
function isBetter(a: Candidate, b: Candidate): boolean {
  if (a.rank !== b.rank) return a.rank > b.rank
  if (a.isSvg !== b.isSvg) return a.isSvg
  return a.size > b.size
}

/**
 * Identifies the main favicon URL declared in the page. Falls back to the
 * conventional `/favicon.ico` when no `<link>` icon is present. The returned
 * value may be relative; it is resolved to an absolute URL later (unless
 * `resolveUrls: false`).
 */
export default function faviconParser($: CheerioAPI): string {
  let best: Candidate | undefined

  $('link[rel]').each((_idx, element) => {
    const $el = $(element)
    const rel = ($el.attr('rel') || '').trim().toLowerCase()
    const rank = relRank(rel)
    if (rank === 0) return

    const href = ($el.attr('href') || '').trim()
    if (!href) return

    const candidate: Candidate = {
      href,
      rank,
      isSvg: isSvg(href, $el.attr('type')),
      size: largestSize($el.attr('sizes')),
    }

    if (!best || isBetter(candidate, best)) {
      best = candidate
    }
  })

  return best ? best.href : DEFAULT_FAVICON
}
