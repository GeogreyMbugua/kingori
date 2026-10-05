import type { MetadataRoute } from "next";
import { primaryNavigation } from "@/config/navigation";
import { mediaItems } from "@/content/media";
import { projects } from "@/content/work";
import { absoluteUrl } from "@/lib/url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", ...primaryNavigation.map((item) => item.href)];
  const projectPaths = projects.map((project) => `/work/${project.slug}`);
  const mediaPaths = mediaItems.map((item) => `/media/${item.slug}`);

  return [...staticPaths, ...projectPaths, ...mediaPaths].map((path) => ({
    url: absoluteUrl(path),
  }));
}
