import nock from 'nock'
import { afterEach, describe, expect, it } from 'vitest'

import scrapeUrl from '../../src/index'

afterEach(() => {
  nock.cleanAll()
})

describe('When providing an invalid domain or address', () => {
  it('The returned promise must reject', async () => {
    nock('http://example.invalid.domain123')
      .get('/')
      .replyWithError('getaddrinfo ENOTFOUND example.invalid.domain123')

    await expect(
      scrapeUrl('http://example.invalid.domain123'),
    ).rejects.toThrow()
  })
})
