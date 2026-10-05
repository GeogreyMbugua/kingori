import { PageShell } from "@/components/layout/PageShell";
import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <PageShell siteName={siteConfig.name} navigation={primaryNavigation}>
      {children}
    </PageShell>
  );
}
