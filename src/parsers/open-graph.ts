import type { CheerioAPI } from 'cheerio'

import normalize from '../utils/normalize'
import type { OgMedia, OpenGraph } from '../types'

export default function openGraphTagParser($: CheerioAPI): OpenGraph {
  function readOgTag(name: string): string {
    return normalize($(`meta[property="og:${name}"]`).attr('content'))
  }

  function media(prefix: string): OgMedia[] {
    const items: OgMedia[] = []

    $(`meta[property^="og:${prefix}"]`).each((_idx, element) => {
      const $el = $(element)
      const propName = $el.attr('property')
      const content = $el.attr('content')

      if (propName === `og:${prefix}` || propName === `og:${prefix}:url`) {
        items.push({ url: content })
      }

      const current = items[items.length - 1]
      if (!current) {
        return
      }

      switch (propName) {
        case `og:${prefix}:secure_url`:
          current.secure_url = content
          break
        case `og:${prefix}:type`:
          current.type = content
          break
        case `og:${prefix}:width`:
          current.width = content ? parseInt(content, 10) : undefined
          break
        case `og:${prefix}:height`:
          current.height = content ? parseInt(content, 10) : undefined
          break
      }
    })

    return items
  }

  return {
    title: readOgTag('title'),
    description: readOgTag('description'),
    url: readOgTag('url'),
    site_name: readOgTag('site_name'),
    type: readOgTag('type'),
    images: media('image'),
    videos: media('video'),
  }
}
