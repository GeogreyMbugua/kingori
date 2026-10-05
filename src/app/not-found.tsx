import { PageShell } from "@/components/layout/PageShell";
import { Text } from "@/components/typography/Text";
import { Link } from "@/components/ui/Link";
import { Section } from "@/components/ui/Section";
import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { notFoundContent } from "@/content/not-found";

export default function NotFound() {
  return (
    <PageShell siteName={siteConfig.name} navigation={primaryNavigation}>
      <Section>
        <h1>{notFoundContent.title}</h1>
        <Text>{notFoundContent.message}</Text>
        <Text>
          <Link href="/" variant="cta">
            {notFoundContent.homeLinkLabel}
          </Link>
        </Text>
      </Section>
    </PageShell>
  );
}
