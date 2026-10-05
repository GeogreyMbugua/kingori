import type { Metadata } from "next";
import { seoDefaults } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/url";

export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: seoDefaults.defaultTitle,
      template: seoDefaults.titleTemplate,
    },
    description: seoDefaults.description,
    applicationName: siteConfig.name,
    robots: siteConfig.allowIndexing
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: seoDefaults.openGraphType,
      siteName: siteConfig.name,
      url: absoluteUrl("/"),
      title: seoDefaults.defaultTitle,
      description: seoDefaults.description,
    },
  };
}

interface PageMetadataInput {
  /** Omit on the homepage to use the site default title. */
  readonly title?: string;
  readonly description?: string;
  /** Path relative to the site origin, e.g. "/work". */
  readonly path: string;
}

/**
 * Next.js shallow-merges metadata, so a page-level `openGraph` object replaces
 * the root one entirely. This helper re-applies the shared Open Graph fields.
 */
export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const resolvedDescription = description ?? seoDefaults.description;
  const canonical = absoluteUrl(path);

  return {
    ...(title ? { title } : {}),
    description: resolvedDescription,
    alternates: { canonical },
    openGraph: {
      type: seoDefaults.openGraphType,
      siteName: siteConfig.name,
      url: canonical,
      title: title ?? seoDefaults.defaultTitle,
      description: resolvedDescription,
    },
  };
}
