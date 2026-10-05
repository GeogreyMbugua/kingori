import type { Metadata } from "next";
import { workContent } from "@/content/work";
import { WorkIndex } from "@/features/work/WorkIndex";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: workContent.title,
  description: workContent.description,
  path: "/work",
});

export default function Page() {
  return <WorkIndex />;
}
