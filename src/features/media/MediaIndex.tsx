import type { Route } from "next";
import { Grid, GridItem } from "@/components/layout/Grid";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { Text } from "@/components/typography/Text";
import { Link } from "@/components/ui/Link";
import { Section } from "@/components/ui/Section";
import { mediaContent, mediaItems } from "@/content/media";
import { buildSizes } from "@/lib/media";
import type { MediaItem } from "@/types/content";
import styles from "./MediaIndex.module.css";
import { MediaMeta } from "./MediaMeta";

const featureSizes = buildSizes({ base: "100vw", wide: "80rem" });
const visualSizes = buildSizes({ base: "100vw", tablet: "100vw", desktop: "58vw", wide: "47rem" });

/** Moving image and galleries are shown; writing and sound are read. */
const isVisual = (item: MediaItem) => item.format === "video" || item.format === "gallery";

function EntryTitle({ item, size }: { item: MediaItem; size: "heading-xl" | "h2" }) {
  return (
    <h2 data-type={size}>
      <Link href={`/media/${item.slug}` as Route} className={styles.titleLink}>
        {item.title}
      </Link>
    </h2>
  );
}

export function MediaIndex() {
  const [feature, ...rest] = mediaItems;

  return (
    <>
      <Section spacing="sm" labelledBy="media-title">
        <Grid className={styles.opening}>
          <GridItem span={{ tablet: 4, desktop: 6 }}>
            <h1 id="media-title" data-type="giant">
              {mediaContent.title}
            </h1>
          </GridItem>
          <GridItem span={{ tablet: 4, desktop: 4 }} start={{ desktop: 8 }} className={styles.intro}>
            <Text variant="body-lg">{mediaContent.intro}</Text>
          </GridItem>
        </Grid>
      </Section>

      {feature ? (
        <>
          {/* The feature: the largest image on the page, its title given the full voice. */}
          <Section as="div" spacing="none">
            <article className={styles.feature}>
              <div className={styles.featureImage}>
                <MediaSlot slot={feature.cover} ratio="16:9" sizes={featureSizes} preload />
              </div>
              <Grid className={styles.featureText}>
                <GridItem span={{ tablet: 5, desktop: 7 }}>
                  <MediaMeta item={feature} />
                  <EntryTitle item={feature} size="heading-xl" />
                </GridItem>
                <GridItem span={{ tablet: 3, desktop: 4 }} start={{ desktop: 9 }}>
                  <Text>{feature.summary}</Text>
                </GridItem>
              </Grid>
            </article>
          </Section>

          <Section>
            <Grid className={styles.rest}>
              {rest.map((item) =>
                isVisual(item) ? (
                  <GridItem key={item.slug} as="article" span={{ tablet: 8, desktop: 7 }} className={styles.visual}>
                    <Reveal>
                      <MediaSlot slot={item.cover} ratio="16:9" sizes={visualSizes} />
                    </Reveal>
                    <MediaMeta item={item} />
                    <EntryTitle item={item} size="h2" />
                    <Text variant="body-sm">{item.summary}</Text>
                  </GridItem>
                ) : (
                  <GridItem
                    key={item.slug}
                    as="article"
                    span={{ tablet: 6, desktop: 4 }}
                    start={{ desktop: 9 }}
                    className={styles.textual}
                  >
                    <MediaMeta item={item} />
                    <EntryTitle item={item} size="h2" />
                    <p data-type="body-lg" className={styles.standfirst}>
                      {item.summary}
                    </p>
                  </GridItem>
                ),
              )}
            </Grid>
          </Section>
        </>
      ) : (
        <Section>
          <Text>{mediaContent.emptyMessage}</Text>
        </Section>
      )}
    </>
  );
}
