import type { Metadata } from "next";
import { contactContent } from "@/content/contact";
import { ContactPage } from "@/features/contact/ContactPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: contactContent.title,
  description: contactContent.description,
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
