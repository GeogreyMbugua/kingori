import type { MetadataRoute } from "next";
import { primaryNavigation } from "@/config/navigation";
import { mediaItems } from "@/content/media";
import { projects } from "@/content/work";
import { absoluteUrl } from "@/lib/url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", ...primaryNavigation.map((item) => item.href)];
  // Placeholder projects, media and shows stay routable for review and are
  // omitted here so the sitemap does not advertise unfinished entries.
  const projectPaths = projects
    .filter((project) => project.status === "final")
    .map((project) => `/work/${project.slug}`);
  const mediaPaths = mediaItems
    .filter((item) => item.status === "final")
    .map((item) => `/media/${item.slug}`);

  return [...staticPaths, ...projectPaths, ...mediaPaths].map((path) => ({
    url: absoluteUrl(path),
  }));
}
