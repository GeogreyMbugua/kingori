import { Grid, GridItem } from "@/components/layout/Grid";
import { Reveal } from "@/components/motion/Reveal";
import { Text } from "@/components/typography/Text";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import styles from "./DesignSystem.module.css";

const SPACES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const CONTAINERS = ["reading", "content", "wide"] as const;

export function LayoutSection() {
  return (
    <>
      <Section label="Layout" labelledBy="ds-layout">
        <h2 id="ds-layout">Grid, containers and spacing</h2>
        <h3>Grid: 4 / 8 / 12 columns</h3>
        <Grid className={styles.gridDemo}>
          {Array.from({ length: 12 }, (_, index) => (
            <GridItem key={index} className={styles.cell}>
              <span data-type="meta">{index + 1}</span>
            </GridItem>
          ))}
          <GridItem span={{ base: 4, tablet: 5, desktop: 7 }} className={styles.cell}>
            <span data-type="meta">span 4 / 5 / 7</span>
          </GridItem>
          <GridItem span={{ base: 4, tablet: 3, desktop: 4 }} start={{ desktop: 9 }} className={styles.cell}>
            <span data-type="meta">span 4 / 3 / 4, desktop start 9</span>
          </GridItem>
        </Grid>
        <h3>Spacing scale</h3>
        <ul role="list" className={styles.scale}>
          {SPACES.map((step) => (
            <li key={step} className={styles.scaleRow}>
              <code>--space-{step}</code>
              <span className={styles.bar} style={{ inlineSize: `var(--space-${step})` }} />
            </li>
          ))}
        </ul>
      </Section>
      <Section width="full" spacing="sm" labelledBy="ds-containers">
        <Container>
          <h3 id="ds-containers">Containers</h3>
        </Container>
        {CONTAINERS.map((width) => (
          <Container key={width} width={width} className={styles.containerDemo}>
            <span data-type="meta">{width}</span>
          </Container>
        ))}
      </Section>
      <Section label="Motion" labelledBy="ds-motion">
        <h2 id="ds-motion">Motion</h2>
        <Text variant="body-sm">
          Durations: fast 150ms for hover and focus, base 250ms for directional changes, slow
          600ms for images and reveals. Everything collapses to instant under reduced motion.
        </Text>
        <div className={styles.revealStack}>
          {[1, 2, 3].map((item) => (
            <Reveal key={item} className={styles.cell}>
              <span data-type="meta">Reveal {item}</span>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
