import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/typography/Text";
import styles from "./DesignSystem.module.css";

function Controls() {
  return (
    <>
      <div className={styles.row}>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="quiet">Quiet</Button>
      </div>
      <div className={styles.row}>
        <Button disabled>Primary</Button>
        <Button variant="secondary" disabled>
          Secondary
        </Button>
        <Button variant="quiet" disabled>
          Quiet
        </Button>
      </div>
      <Text>
        An <Link href="/design-system">inline link</Link> sits inside running text, and an{" "}
        <Link href="https://example.com">external link</Link> opens in the same tab.
      </Text>
      <div className={styles.row}>
        <Link href="/design-system" variant="cta">
          Call to action
        </Link>
        <Link href="/design-system" variant="nav" aria-current="page">
          Nav (current)
        </Link>
        <Link href="/design-system" variant="nav">
          Nav
        </Link>
      </div>
    </>
  );
}

export function UiSection() {
  return (
    <>
      <Section label="Interface" labelledBy="ds-ui">
        <h2 id="ds-ui">Buttons and links</h2>
        <Text variant="body-sm">
          Tab through this section to check focus rings. Disabled buttons are in the second row.
        </Text>
        <Controls />
      </Section>
      <Section surface="raised" labelledBy="ds-ui-raised">
        <h2 id="ds-ui-raised">Raised surface</h2>
        <Controls />
      </Section>
      <Section surface="inverse" labelledBy="ds-ui-inverse">
        <h2 id="ds-ui-inverse">Inverse surface</h2>
        <Controls />
      </Section>
    </>
  );
}
