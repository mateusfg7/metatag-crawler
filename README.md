# @mateusfg7/metatag-crawler

This is a simple node.js module for scraping meta information from web pages.

At the moment this module supports:
* the `<title>` tag in the document head
* meta[name="description"] tag
* link[rel="canonical"] tag
* the main favicon (`link[rel*="icon"]`, with `/favicon.ico` fallback)
* img elements on the page
* many [Open Graph](http://ogp.me/) tags (such as: title, description, url, type, image, video)


## Install

```
npm install @mateusfg7/metatag-crawler
```

## Usage

The module is distributed as both ESM and CommonJS and ships with TypeScript
type definitions. `scrape(url, options?)` returns a `Promise`.

```JavaScript
// ESM
import scrape from '@mateusfg7/metatag-crawler';
// CommonJS
const scrape = require('@mateusfg7/metatag-crawler');

const data = await scrape('https://www.youtube.com/watch?v=jNQXAC9IVRw');

// if you do not want the relative URLs to be resolved
const raw = await scrape('https://www.youtube.com/watch?v=jNQXAC9IVRw', { resolveUrls: false });
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `resolveUrls` | `boolean` | `true` | Resolve relative URLs against the crawled URL. |
| `userAgent` | `string` | Chrome UA | Override the `User-Agent` request header. |

## Limitations

This crawler is a plain HTTP client (axios + cheerio). Some sites sit behind
bot-protection services such as **Cloudflare**, which fingerprint the TLS/HTTP
client rather than just inspecting headers. These sites (for example
`https://claude.ai`) return **`403 Forbidden`** to any non-browser client
regardless of the `User-Agent` or other headers you send. Bypassing this
requires a real browser engine (e.g. Playwright/Puppeteer) and is out of scope
for this library.

## Example

```JavaScript
import scrape from '@mateusfg7/metatag-crawler';

const data = await scrape('https://www.youtube.com/watch?v=jNQXAC9IVRw');

console.log(data.meta.title); // Me at the zoo - YouTube
console.log(data.meta.description); // The first video on YouTube. Maybe it's time to go back to the zoo?
console.log(data.meta.canonical); // https://www.youtube.com/watch?v=jNQXAC9IVRw
console.log(data.favicon); // https://s.ytimg.com/yts/img/favicon_144-vflWmzoXw.png

console.log(data);
/*
    {
        "meta": {
            "title": "Me at the zoo - YouTube",
            "description": "The first video on YouTube. Maybe it's time to go back to the zoo?",
            "canonical": "https://www.youtube.com/watch?v=jNQXAC9IVRw"
        },
        "images": [
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 48,
                "height": 48
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            },
            {
                "url": "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif",
                "width": 120,
                "height": 90
            }
        ],
        "og": {
            "title": "Me at the zoo",
            "description": "The first video on YouTube. Maybe it's time to go back to the zoo?",
            "url": "https://www.youtube.com/watch?v=jNQXAC9IVRw",
            "site_name": "YouTube",
            "type": "video",
            "images": [
                {
                    "url": "https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg"
                }
            ],
            "videos": [
                {
                    "url": "https://www.youtube.com/embed/jNQXAC9IVRw",
                    "secure_url": "https://www.youtube.com/embed/jNQXAC9IVRw",
                    "type": "text/html",
                    "width": 480,
                    "height": 360
                },
                {
                    "url": "http://www.youtube.com/v/jNQXAC9IVRw?version=3&autohide=1",
                    "secure_url": "https://www.youtube.com/v/jNQXAC9IVRw?version=3&autohide=1",
                    "type": "application/x-shockwave-flash",
                    "width": 480,
                    "height": 360
                }
            ]
        },
        "favicon": "https://s.ytimg.com/yts/img/favicon_144-vflWmzoXw.png"
    }
    */
```
