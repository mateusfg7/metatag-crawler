import type { CheerioAPI } from 'cheerio'

import type { ImageInfo } from '../types'

export default function imageParser($: CheerioAPI): ImageInfo[] {
  const urls: ImageInfo[] = []

  $('img').each((_idx, element) => {
    const $el = $(element)
    const img: ImageInfo = { url: $el.attr('src') }

    const width = $el.attr('width')
    const height = $el.attr('height')
    if (width) {
      img.width = parseInt(width, 10)
    }
    if (height) {
      img.height = parseInt(height, 10)
    }

    urls.push(img)
  })

  return urls
}
