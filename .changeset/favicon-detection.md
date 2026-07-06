---
"@mateusfg7/metatag-crawler": minor
---

Add favicon detection. The result now includes a `favicon` field holding the
main favicon URL, chosen from the page's `<link rel="...icon...">` tags
(preferring standard `icon`/`shortcut icon`, then scalable SVG, then the
largest declared `sizes`), falling back to the conventional `/favicon.ico`.
Like other URLs, it is resolved to an absolute URL unless `resolveUrls: false`.
