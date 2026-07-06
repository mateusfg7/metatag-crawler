import { readFileSync } from 'node:fs'
import * as cheerio from 'cheerio'
import { beforeAll, describe, expect, it } from 'vitest'

import imageParser from './images'
import type { ImageInfo } from '../types'

describe('Parsing images from the page', () => {
  let parsedImages: ImageInfo[]

  beforeAll(() => {
    const html = readFileSync(
      new URL('./__fixtures__/images.html', import.meta.url),
      'utf8',
    )
    parsedImages = imageParser(cheerio.load(html))
  })

  it('All img sources are parsed correctly', () => {
    expect(parsedImages).toHaveLength(2)

    expect(parsedImages[0].url).toBe('image-url')
    expect(parsedImages[0].width).toBeUndefined()

    expect(parsedImages[1].url).toBe('image-url-2')
    expect(parsedImages[1].width).toBe(300)
    expect(parsedImages[1].height).toBe(200)
  })
})
