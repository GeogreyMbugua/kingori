import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMediaItemBySlug, mediaItems } from "@/content/media";
import { MediaDetail } from "@/features/media/MediaDetail";
import { createPageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return mediaItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/media/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getMediaItemBySlug(slug);
  if (!item) return {};

  return createPageMetadata({
    title: item.title,
    description: item.summary,
    path: `/media/${item.slug}`,
  });
}

export default async function Page({ params }: PageProps<"/media/[slug]">) {
  const { slug } = await params;
  const item = getMediaItemBySlug(slug);
  if (!item) notFound();

  return <MediaDetail item={item} />;
}
