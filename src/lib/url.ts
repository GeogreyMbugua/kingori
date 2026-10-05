import { siteConfig } from "@/config/site";

/** Prefixes a root-relative /public path with the deployment base path. */
export function withBasePath(src: string, basePath: string = siteConfig.basePath): string {
  return src.startsWith("/") && !src.startsWith("//") ? `${basePath}${src}` : src;
}

export function absoluteUrl(
  path: string,
  origin: string = siteConfig.url,
  { basePath = siteConfig.basePath, trailingSlash = siteConfig.staticExport } = {},
): string {
  // Static hosts serve /work as /work/; files such as /sitemap.xml keep their name.
  const needsSlash = trailingSlash && !path.endsWith("/") && !/\.\w+$/.test(path);
  return new URL(`${basePath}${path}${needsSlash ? "/" : ""}`, origin).toString();
}
