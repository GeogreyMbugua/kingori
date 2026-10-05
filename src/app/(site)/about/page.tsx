import type { Metadata } from "next";
import { aboutContent } from "@/content/about";
import { AboutPage } from "@/features/about/AboutPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: aboutContent.title,
  description: aboutContent.description,
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
