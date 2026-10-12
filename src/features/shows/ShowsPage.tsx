import { Invitation } from "@/components/editorial/Invitation";
import { Grid, GridItem } from "@/components/layout/Grid";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Drift } from "@/components/motion/Drift";
import { Marquee } from "@/components/motion/Marquee";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Text } from "@/components/typography/Text";
import { Section } from "@/components/ui/Section";
import { contactContent } from "@/content/contact";
import { getUpcomingShows, shows, showsContent } from "@/content/shows";
import { buildSizes } from "@/lib/media";
import styles from "./ShowsPage.module.css";
import { ShowRow } from "./ShowRow";

const featureSizes = buildSizes({ base: "100vw", wide: "104rem" });

/**
 * Tour-poster energy: the title rises in, the next stop scrolls past in a
 * marquee, a stage image drifts under it, and the dates are set as a
 * typographic list where the date is the largest thing in each row.
 */
export function ShowsPage() {
  const upcoming = getUpcomingShows();
  const [next] = upcoming;

  return (
    <>
      <Section spacing="sm" labelledBy="shows-title">
        <Grid className={styles.opening}>
          <GridItem span={{ tablet: 5, desktop: 7 }}>
            <h1 id="shows-title" data-type="giant">
              <SplitReveal text={showsContent.title} />
            </h1>
          </GridItem>
          <GridItem span={{ tablet: 3, desktop: 4 }} start={{ desktop: 9 }} className={styles.intro}>
            <Text variant="body-lg">{showsContent.intro}</Text>
            {upcoming.length > 0 ? (
              <p data-type="meta">
                {String(upcoming.length).padStart(2, "0")}{" "}
                {upcoming.length === 1 ? "date" : "dates"} announced
              </p>
            ) : null}
          </GridItem>
        </Grid>
      </Section>

      <Marquee
        label={showsContent.marquee}
        items={[
          showsContent.marquee,
          ...(next ? [<em key="next">{`Next: ${next.city}`}</em>] : []),
          showsContent.marquee,
        ]}
      />

      <div className={styles.feature}>
        <Drift strength="strong">
          <MediaSlot slot={showsContent.feature} ratio="21:9" sizes={featureSizes} />
        </Drift>
      </div>

      <Section labelledBy="shows-dates" className={styles.dates}>
        <h2 id="shows-dates" data-type="eyebrow" className={styles.label}>
          Dates
        </h2>
        {upcoming.length > 0 ? (
          <ol role="list" className={styles.list}>
            {upcoming.map((show) => (
              <ShowRow key={show.slug} show={show} />
            ))}
          </ol>
        ) : (
          <Text variant="body-lg">
            {shows.length > 0 ? showsContent.pastMessage : showsContent.emptyMessage}
          </Text>
        )}
      </Section>

      <Section spacing="lg" labelledBy="shows-contact">
        <Invitation href="/contact" id="shows-contact">
          {contactContent.invitation}
        </Invitation>
      </Section>
    </>
  );
}
