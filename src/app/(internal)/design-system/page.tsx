import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { designSystemDemo } from "@/content/demo/design-system";
import { DesignSystemPreview } from "@/features/design-system/DesignSystemPreview";

export const metadata: Metadata = {
  title: designSystemDemo.title,
  robots: { index: false, follow: false },
};

export default function Page() {
  if (!siteConfig.designSystemPreview) notFound();
  return <DesignSystemPreview />;
}
