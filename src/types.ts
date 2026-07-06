export interface MetaTags {
  title: string;
  description: string;
  canonical: string;
}

export interface OgMedia {
  url?: string;
  secure_url?: string;
  type?: string;
  width?: number;
  height?: number;
}

export interface OpenGraph {
  title: string;
  description: string;
  url: string;
  site_name: string;
  type: string;
  images: OgMedia[];
  videos: OgMedia[];
}

export interface ImageInfo {
  url?: string;
  width?: number;
  height?: number;
}

export interface ScrapeResult {
  meta: MetaTags;
  images: ImageInfo[];
  og: OpenGraph;
  /** The main favicon URL (falls back to `/favicon.ico`). */
  favicon: string;
}

export interface ScrapeOptions {
  /** Resolve relative URLs against the crawled URL. Defaults to `true`. */
  resolveUrls?: boolean;
  /** Override the `User-Agent` header sent with the request. */
  userAgent?: string;
}
