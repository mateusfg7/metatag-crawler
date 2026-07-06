---
'@mateusfg7/metatag-crawler': patch
---

Update the default `User-Agent` from a 2015-era Chrome 46 string to a current
Chrome 131 string. The stale UA caused some sites to reject requests with
`403 Forbidden`. Also documented that bot-protected sites (e.g. Cloudflare)
cannot be crawled with a plain HTTP client regardless of headers.
