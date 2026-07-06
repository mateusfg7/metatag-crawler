import type { CheerioAPI } from 'cheerio'

import normalize from '../utils/normalize'
import type { MetaTags } from '../types'

export default function metaTagParser($: CheerioAPI): MetaTags {
  return {
    title: normalize($('head title').text()),
    description: normalize($('meta[name="description"]').attr('content')),
    canonical: normalize($('link[rel=canonical]').attr('href')),
  }
}
