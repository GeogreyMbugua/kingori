import { PageShell } from "@/components/layout/PageShell";
import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/** Internal tooling routes: never linked, never in the sitemap, always noindex. */
export default function InternalLayout({ children }: LayoutProps<"/">) {
  return (
    <PageShell siteName={siteConfig.name} navigation={primaryNavigation}>
      {children}
    </PageShell>
  );
}
