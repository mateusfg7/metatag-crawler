import * as cheerio from 'cheerio'
import { describe, expect, it } from 'vitest'

import faviconParser from './favicon'

const favicon = (head: string) =>
  faviconParser(cheerio.load(`<html><head>${head}</head><body></body></html>`))

describe('Identifying the main favicon', () => {
  it('falls back to /favicon.ico when nothing is declared', () => {
    expect(favicon('')).toBe('/favicon.ico')
  })

  it('picks the largest declared rel="icon" size', () => {
    expect(
      favicon(`
        <link rel="icon" href="/favicon-16.png" sizes="16x16" type="image/png">
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
      `),
    ).toBe('/favicon-32.png')
  })

  it('handles a single "shortcut icon" link', () => {
    expect(favicon('<link rel="shortcut icon" href="/legacy.ico">')).toBe(
      '/legacy.ico',
    )
  })

  it('prefers rel="icon" over apple-touch-icon even when apple is larger', () => {
    expect(
      favicon(`
        <link rel="apple-touch-icon" href="/apple.png" sizes="180x180">
        <link rel="icon" href="/favicon.png" sizes="32x32">
      `),
    ).toBe('/favicon.png')
  })

  it('prefers a scalable SVG icon over a raster one', () => {
    expect(
      favicon(`
        <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
      `),
    ).toBe('/favicon.svg')
  })

  it('treats sizes="any" as the largest', () => {
    expect(
      favicon(`
        <link rel="icon" href="/favicon-48.png" sizes="48x48">
        <link rel="icon" href="/favicon-any.ico" sizes="any">
      `),
    ).toBe('/favicon-any.ico')
  })

  it('falls back to apple-touch-icon when no standard icon exists', () => {
    expect(
      favicon('<link rel="apple-touch-icon" href="/apple.png" sizes="180x180">'),
    ).toBe('/apple.png')
  })
})
