import type { SiteConfig } from "@/types/site";

const FALLBACK_SITE_URL = "http://localhost:3000";

export function parseSiteUrl(value: string | undefined): string {
  if (!value) return FALLBACK_SITE_URL;

  const url = new URL(value);
  return url.origin;
}

export function parseBasePath(value: string | undefined): string {
  if (!value) return "";
  if (!/^\/[\w.-]+(\/[\w.-]+)*$/.test(value)) {
    throw new Error(`NEXT_PUBLIC_BASE_PATH must look like "/segment", received "${value}".`);
  }
  return value;
}

export function parseAllowIndexing(value: string | undefined): boolean {
  return value === "true";
}

/** Always on outside production builds; production must opt in explicitly. */
export function parseDesignSystemPreview(
  flag: string | undefined,
  nodeEnv: string | undefined,
): boolean {
  return flag === "true" || nodeEnv !== "production";
}

export const siteConfig: SiteConfig = {
  name: "Kingori",
  url: parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  basePath: parseBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
  staticExport: process.env.STATIC_EXPORT === "true",
  locale: "en",
  allowIndexing: parseAllowIndexing(process.env.SITE_ALLOW_INDEXING),
  themeColor: "#000030",
  designSystemPreview: parseDesignSystemPreview(
    process.env.ENABLE_DESIGN_SYSTEM_PREVIEW,
    process.env.NODE_ENV,
  ),
};
