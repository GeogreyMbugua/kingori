import { aboutContent } from "@/content/about";
import { contactContent } from "@/content/contact";
import { homeContent } from "@/content/home";
import { mediaContent, mediaItems } from "@/content/media";
import { projects, workContent } from "@/content/work";

function hasPendingAsset(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(hasPendingAsset);
  if (value === null || typeof value !== "object") return false;
  if ((value as { kind?: unknown }).kind === "pending") return true;
  return Object.values(value).some(hasPendingAsset);
}

/** Every content entry that is still placeholder or still waits on a real asset. */
export function findPlaceholderContent(): readonly string[] {
  const entries: ReadonlyArray<[string, { readonly status: string }]> = [
    ["home", homeContent],
    ["about", aboutContent],
    ["contact", contactContent],
    ["work", workContent],
    ["media", mediaContent],
    ...projects.map((project): [string, typeof project] => [`work/${project.slug}`, project]),
    ...mediaItems.map((item): [string, typeof item] => [`media/${item.slug}`, item]),
  ];

  return entries
    .filter(([, entry]) => entry.status === "placeholder" || hasPendingAsset(entry))
    .map(([label]) => label);
}

/**
 * Launch guard: enabling indexing while placeholder content remains fails the
 * build instead of publishing scaffolding to search engines.
 */
export function assertLaunchReady(allowIndexing: boolean): void {
  if (!allowIndexing) return;
  const pending = findPlaceholderContent();
  if (pending.length > 0) {
    throw new Error(
      `Indexing is enabled but placeholder content remains: ${pending.join(", ")}. ` +
        "Replace it, or unset SITE_ALLOW_INDEXING.",
    );
  }
}
