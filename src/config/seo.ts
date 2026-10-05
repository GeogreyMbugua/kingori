import { siteConfig } from "@/config/site";
import type { SeoDefaults } from "@/types/site";

export const seoDefaults: SeoDefaults = {
  defaultTitle: siteConfig.name,
  titleTemplate: `%s — ${siteConfig.name}`,
  // Placeholder: final SEO description pending approved copy.
  description: "[Placeholder] Site description pending final copy.",
  openGraphType: "website",
};
