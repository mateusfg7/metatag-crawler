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

## Changes in version 2.x

Version 2 is a modernization of the module:

* **Promise-based API** — `scrape(url, options?)` now returns a `Promise` instead
  of taking a `(err, data)` callback. Use `await` or `.then()`.
* Rewritten in **TypeScript** and shipped with type definitions, as dual
  **ESM + CommonJS** builds.
* `request` was replaced with [`axios`](https://github.com/axios/axios).

The module does not automatically merge properties from different meta
information sources — all information available on the page is provided as-is.
If you need the old merged shape, process the result yourself:

```JavaScript
const data = await scrape('https://www.youtube.com/watch?v=jNQXAC9IVRw');

const oldStyleData = {
    title: data.og.title || data.meta.title,
    description: data.og.description || data.meta.description,
    images: data.og.images,
    videos: data.og.videos
};

// ... do what you used to do before with the oldStyleData
```
