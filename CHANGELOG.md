# @mateusfg7/metatag-crawler

## 1.1.0

### Minor Changes

- 4c309a7: Add favicon detection. The result now includes a `favicon` field holding the
  main favicon URL, chosen from the page's `<link rel="...icon...">` tags
  (preferring standard `icon`/`shortcut icon`, then scalable SVG, then the
  largest declared `sizes`), falling back to the conventional `/favicon.ico`.
  Like other URLs, it is resolved to an absolute URL unless `resolveUrls: false`.

## 1.0.0

### Major Changes

- 3ab90b6: Release the first stable version. The library is rewritten in TypeScript, ships
  dual ESM + CommonJS builds with type definitions, uses `axios`, and exposes a
  Promise-based `scrape(url, options?)` API.
