import type { Metadata } from "next";
import { mediaContent } from "@/content/media";
import { MediaIndex } from "@/features/media/MediaIndex";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: mediaContent.title,
  description: mediaContent.description,
  path: "/media",
});

export default function Page() {
  return <MediaIndex />;
}
