import { readFileSync } from 'node:fs'
import * as cheerio from 'cheerio'
import { beforeAll, describe, expect, it } from 'vitest'

import compose from './compose'
import type { ScrapeResult } from '../types'

describe('Parsing the entire html page', () => {
  let result: ScrapeResult

  beforeAll(() => {
    const html = readFileSync(
      new URL('./__fixtures__/composed.html', import.meta.url),
      'utf8',
    )
    result = compose(cheerio.load(html))
  })

  it('All tags should be parsed correctly', () => {
    expect(Object.keys(result.meta).sort()).toEqual([
      'canonical',
      'description',
      'title',
    ])
    expect(result.images).toHaveLength(2)
    expect(result.og).toHaveProperty('title')
    expect(result.og).toHaveProperty('images')
    expect(result.og).toHaveProperty('videos')
  })
})
