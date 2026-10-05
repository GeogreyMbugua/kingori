export interface SiteConfig {
  readonly name: string;
  /** Canonical origin without trailing slash, e.g. "https://example.com". */
  readonly url: string;
  /** Sub-path the site is served under, e.g. "/kingori" on GitHub Pages; "" at the root. */
  readonly basePath: string;
  /** Built as static files (GitHub Pages): routes are served with a trailing slash. */
  readonly staticExport: boolean;
  /** BCP 47 language tag used for <html lang>. */
  readonly locale: string;
  readonly allowIndexing: boolean;
  /** Browser UI colour; must equal --color-background in tokens.css (test-enforced). */
  readonly themeColor: `#${string}`;
  /** Serves the internal /design-system preview. Never listed in the sitemap; always noindex. */
  readonly designSystemPreview: boolean;
}

export interface SeoDefaults {
  readonly defaultTitle: string;
  /** Must contain "%s", which is replaced by the page title. */
  readonly titleTemplate: `${string}%s${string}`;
  readonly description: string;
  readonly openGraphType: "website";
}
