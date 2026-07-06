import { readFileSync } from 'node:fs'
import * as cheerio from 'cheerio'
import { beforeAll, describe, expect, it } from 'vitest'

import metaTagParser from './meta-tags'
import type { MetaTags } from '../types'

describe('Parsing title, meta[name=description] and link[rel=canonical] from html', () => {
  let parsedTags: MetaTags

  beforeAll(() => {
    const html = readFileSync(
      new URL('./__fixtures__/meta-tags.html', import.meta.url),
      'utf8',
    )
    parsedTags = metaTagParser(cheerio.load(html))
  })

  it('Title, description and canonical url are parsed correctly', () => {
    expect(parsedTags.title).toBe('THIS is A "TEST" Title!')
    expect(parsedTags.description).toBe('This is the meta-description.')
    expect(parsedTags.canonical).toBe(
      'https://example.com/example.html?asdf=1234',
    )
  })
})

describe('When no meta information exists in the html', () => {
  let parsedTags: MetaTags

  beforeAll(() => {
    const html = readFileSync(
      new URL('./__fixtures__/no-meta-tags.html', import.meta.url),
      'utf8',
    )
    parsedTags = metaTagParser(cheerio.load(html))
  })

  it('Title, description and canonical must be empty strings', () => {
    expect(parsedTags.title).toBe('')
    expect(parsedTags.description).toBe('')
    expect(parsedTags.canonical).toBe('')
  })
})
