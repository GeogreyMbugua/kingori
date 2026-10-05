import { Grid, GridItem } from "@/components/layout/Grid";
import { Text } from "@/components/typography/Text";
import { Link } from "@/components/ui/Link";
import { Section } from "@/components/ui/Section";
import { contactContent } from "@/content/contact";
import styles from "./ContactPage.module.css";

/**
 * One invitation, one obvious action. The address itself is the largest
 * interactive element on the page; nothing competes with it.
 */
export function ContactPage() {
  const { primary, secondary } = contactContent;

  return (
    <Section spacing="lg" labelledBy="contact-title">
      <Grid className={styles.grid}>
        <GridItem>
          <h1 id="contact-title" data-type="giant">
            {contactContent.title}
          </h1>
        </GridItem>
        <GridItem span={{ tablet: 8, desktop: 6 }}>
          <p data-type="heading-xl" className={styles.invitation}>
            {contactContent.invitation}
          </p>
        </GridItem>
        <GridItem span={{ tablet: 6, desktop: 5 }} start={{ desktop: 8 }} className={styles.action}>
          <p data-type="meta">{primary.label}</p>
          <p>
            <Link href={primary.href} className={styles.primary}>
              {primary.value}
            </Link>
          </p>
          <Text>{contactContent.note}</Text>
          {secondary.length > 0 ? (
            <ul role="list" className={styles.secondary}>
              {secondary.map((channel) => (
                <li key={channel.href}>
                  <Link href={channel.href} variant="cta">
                    {channel.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </GridItem>
      </Grid>
    </Section>
  );
}
