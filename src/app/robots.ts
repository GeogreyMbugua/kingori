import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { assertLaunchReady } from "@/content/status";
import { absoluteUrl } from "@/lib/url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  assertLaunchReady(siteConfig.allowIndexing);

  if (!siteConfig.allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
