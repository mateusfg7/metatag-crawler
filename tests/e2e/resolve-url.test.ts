import { readFileSync } from 'node:fs'
import nock from 'nock'
import { afterEach, describe, expect, it } from 'vitest'

import scrapeUrl from '../../src/index'

const homePage = readFileSync(
  new URL('./__fixtures__/youtube-home-page.html', import.meta.url),
  'utf8',
)

afterEach(() => {
  nock.cleanAll()
})

describe('When crawling with { resolveUrls: true }', () => {
  it('Urls in the result must be absolute', async () => {
    nock('https://www.youtube.com').get('/').query(true).reply(200, homePage)

    const result = await scrapeUrl('https://www.youtube.com/', {
      resolveUrls: true,
    })

    expect(result.og.images[0].url).toBe(
      'https://s.ytimg.com/yts/img/yt_1200-vfl4C3T0K.png',
    )
  })
})

describe('When crawling with { resolveUrls: false }', () => {
  it('Urls in the result must stay relative', async () => {
    nock('https://www.youtube.com').get('/').query(true).reply(200, homePage)

    const result = await scrapeUrl('https://www.youtube.com/', {
      resolveUrls: false,
    })

    expect(result.og.images[0].url).toBe(
      '//s.ytimg.com/yts/img/yt_1200-vfl4C3T0K.png',
    )
  })
})
