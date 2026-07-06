import type { CheerioAPI } from 'cheerio'

import faviconParser from './favicon'
import imageParser from './images'
import metaTagParser from './meta-tags'
import openGraphTagParser from './open-graph'
import type { ScrapeResult } from '../types'

export default function compose($: CheerioAPI): ScrapeResult {
  return {
    meta: metaTagParser($),
    images: imageParser($),
    og: openGraphTagParser($),
    favicon: faviconParser($),
  }
}
