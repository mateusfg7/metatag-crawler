import { readFileSync } from 'node:fs'
import * as cheerio from 'cheerio'
import { beforeAll, describe, expect, it } from 'vitest'

import openGraphTagParser from './open-graph'
import type { OpenGraph } from '../types'

describe('Parsing Open Graph tags from html', () => {
  let parsedTags: OpenGraph

  beforeAll(() => {
    const html = readFileSync(
      new URL('./__fixtures__/open-graph.html', import.meta.url),
      'utf8',
    )
    parsedTags = openGraphTagParser(cheerio.load(html))
  })

  it('Basic open graph tags are parsed correctly', () => {
    expect(parsedTags.title).toBe('test-title')
    expect(parsedTags.description).toBe('test-description')
    expect(parsedTags.url).toBe('test-url')
    expect(parsedTags.type).toBe('test-type')
    expect(parsedTags.site_name).toBe('test-site_name')
  })

  it('Images are parsed correctly', () => {
    expect(parsedTags.images).toHaveLength(2)

    expect(parsedTags.images[0]).toMatchObject({
      url: 'test-image-url',
      secure_url: 'test-image-secure_url',
      width: 1024,
      height: 768,
      type: 'image/jpeg',
    })

    expect(parsedTags.images[1].type).toBe('image/png')
  })

  it('Videos are parsed correctly', () => {
    expect(parsedTags.videos).toHaveLength(2)

    expect(parsedTags.videos[0]).toMatchObject({
      url: 'test-video-url',
      secure_url: 'test-video-secure_url',
      width: 1280,
      height: 720,
      type: 'text/html',
    })

    expect(parsedTags.videos[1].type).toBe('application/x-shockwave-flash')
  })
})
