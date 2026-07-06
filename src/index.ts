import axios from 'axios'
import * as cheerio from 'cheerio'

import compose from './parsers/compose'
import resolveUrlsInObj from './utils/resolve-urls'
import type { ScrapeOptions, ScrapeResult } from './types'

const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'

/**
 * Fetches `url` and extracts its metadata (`meta`, `images`, `og`).
 *
 * @param url The URL to crawl.
 * @param options Optional settings ({@link ScrapeOptions}).
 * @returns The parsed metadata.
 */
async function scrapeUrl(
  url: string,
  options: ScrapeOptions = {},
): Promise<ScrapeResult> {
  const response = await axios.get<string>(url, {
    responseType: 'text',
    headers: {
      'User-Agent': options.userAgent || DEFAULT_USER_AGENT,
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  })

  const $ = cheerio.load(response.data)
  const result = compose($)

  if (options.resolveUrls !== false) {
    resolveUrlsInObj(result, url)
  }

  return result
}

export default scrapeUrl

export type {
  ScrapeOptions,
  ScrapeResult,
  MetaTags,
  OpenGraph,
  OgMedia,
  ImageInfo,
} from './types'
