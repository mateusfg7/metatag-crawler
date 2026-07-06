import { readFileSync } from 'node:fs'
import nock from 'nock'
import { afterEach, describe, expect, it } from 'vitest'

import scrapeUrl from '../../src/index'

const homePage = readFileSync(
  new URL('./__fixtures__/youtube-home-page.html', import.meta.url),
  'utf8',
)
const videoPage = readFileSync(
  new URL('./__fixtures__/youtube-video-page.html', import.meta.url),
  'utf8',
)

afterEach(() => {
  nock.cleanAll()
})

describe('When crawling a youtube video page', () => {
  it('Results should be fine', async () => {
    nock('https://www.youtube.com')
      .get('/watch')
      .query(true)
      .reply(200, videoPage)

    const result = await scrapeUrl(
      'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    )

    expect(Object.keys(result).sort()).toEqual([
      'favicon',
      'images',
      'meta',
      'og',
    ])
    expect(result.meta.title).toBe('Me at the zoo - YouTube')
    expect(result.og.title).toBe('Me at the zoo')
    expect(result.og.images[0].url).toBeTruthy()
    expect(result.og.videos[0].url).toBeTruthy()
  })
})

describe('When crawling the youtube home page', () => {
  it('Results should be fine', async () => {
    nock('https://www.youtube.com').get('/').query(true).reply(200, homePage)

    const result = await scrapeUrl('https://www.youtube.com/')

    expect(Object.keys(result).sort()).toEqual([
      'favicon',
      'images',
      'meta',
      'og',
    ])
    expect(result.meta.title).toBe('YouTube')
    expect(result.og.title).toBe('')
    expect(result.og.images[0].url).toBe(
      'https://s.ytimg.com/yts/img/yt_1200-vfl4C3T0K.png',
    )
    // Main favicon = largest declared rel="icon", resolved to absolute.
    expect(result.favicon).toBe(
      'https://s.ytimg.com/yts/img/favicon_144-vflWmzoXw.png',
    )
  })
})
