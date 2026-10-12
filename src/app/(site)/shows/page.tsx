import type { Metadata } from "next";
import { showsContent } from "@/content/shows";
import { ShowsPage } from "@/features/shows/ShowsPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: showsContent.title,
  description: showsContent.description,
  path: "/shows",
});

export default function Page() {
  return <ShowsPage />;
}
