import type { Route } from "next";
import { Grid, GridItem } from "@/components/layout/Grid";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { Text } from "@/components/typography/Text";
import { Link } from "@/components/ui/Link";
import { Section } from "@/components/ui/Section";
import { mediaContent, publishedMedia } from "@/content/media";
import { cx } from "@/lib/classnames";
import { buildSizes } from "@/lib/media";
import type { MediaItem } from "@/types/content";
import styles from "./MediaIndex.module.css";
import { MediaMeta } from "./MediaMeta";

/* One column, then two from tablet, then three once the column is wide. */
const cardSizes = buildSizes({ base: "100vw", tablet: "50vw", desktop: "46vw", wide: "34rem" });

/** Moving image and galleries are shown; writing and sound are read. */
const isVisual = (item: MediaItem) => item.format === "video" || item.format === "gallery";

function EntryTitle({ item }: { item: MediaItem }) {
  return (
    <h2 data-type="h2">
      <Link href={`/media/${item.slug}` as Route} className={styles.titleLink}>
        {item.title}
      </Link>
    </h2>
  );
}

export function MediaIndex() {
  const items = publishedMedia();

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

      {items.length > 0 ? (
        <Section>
          <Grid as="ul" className={styles.catalogue}>
            {items.map((item, index) => {
              const visual = isVisual(item);
              return (
                <GridItem
                  key={item.slug}
                  as="li"
                  span={{ tablet: 4, desktop: 6, wide: 4 }}
                  className={cx(styles.entry, visual ? styles.visual : styles.textual)}
                >
                  {visual ? (
                    <Reveal>
                      <MediaSlot
                        slot={item.cover}
                        ratio="16:9"
                        sizes={cardSizes}
                        preload={index === 0}
                      />
                    </Reveal>
                  ) : null}
                  <MediaMeta item={item} />
                  <EntryTitle item={item} />
                  {visual ? (
                    <Text variant="body-sm">{item.summary}</Text>
                  ) : (
                    <p data-type="body-lg" className={styles.standfirst}>
                      {item.summary}
                    </p>
                  )}
                </GridItem>
              );
            })}
          </Grid>
        </Section>
      ) : (
        <Section>
          <Text>{mediaContent.emptyMessage}</Text>
        </Section>
      )}
    </>
  );
}
