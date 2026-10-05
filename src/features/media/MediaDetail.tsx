import type { Route } from "next";
import { FigureSequence } from "@/components/editorial/FigureSequence";
import { IndexList } from "@/components/editorial/IndexList";
import { Grid, GridItem } from "@/components/layout/Grid";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Video } from "@/components/media/Video";
import { Prose } from "@/components/typography/Prose";
import { Text } from "@/components/typography/Text";
import { Link } from "@/components/ui/Link";
import { Section } from "@/components/ui/Section";
import { getProjectBySlug } from "@/content/work";
import type { MediaItem } from "@/types/content";
import styles from "./MediaDetail.module.css";
import { MediaMeta } from "./MediaMeta";

interface MediaDetailProps {
  readonly item: MediaItem;
}

function Asset({ item }: MediaDetailProps) {
  const { asset } = item;
  if (!asset) return null;

  switch (asset.kind) {
    case "video":
      return <Video video={asset} />;
    case "image":
      return <MediaSlot slot={asset} ratio="16:9" sizes="100vw" preload />;
    case "pending":
      return (
        <MediaPlaceholder
          ratio={asset.media === "audio" ? "21:9" : "16:9"}
          label={`${asset.description} · ${asset.media}`}
        />
      );
  }
}

/**
 * The format decides the page: films and galleries lead with the work at
 * full width, essays lead with the image and then give the text a reading
 * column. Metadata stays in one quiet line.
 */
export function MediaDetail({ item }: MediaDetailProps) {
  const project = item.relatedProjectSlug ? getProjectBySlug(item.relatedProjectSlug) : undefined;

  return (
    <article aria-labelledby="media-item-title">
      <Section spacing="sm">
        <Grid className={styles.opening}>
          <GridItem className={styles.kicker}>
            <Link href="/media" variant="nav">
              Media
            </Link>
            <MediaMeta item={item} />
          </GridItem>
          <GridItem span={{ desktop: 10 }}>
            <h1 id="media-item-title" data-type="display">
              {item.title}
            </h1>
          </GridItem>
          <GridItem span={{ tablet: 5, desktop: 6 }}>
            <Text variant="body-lg">{item.summary}</Text>
          </GridItem>
          {item.context || item.credits?.length ? (
            <GridItem span={{ tablet: 3, desktop: 3 }} start={{ desktop: 10 }} className={styles.context}>
              {item.context ? <Text variant="caption">{item.context}</Text> : null}
              {item.credits?.length ? (
                <dl className={styles.credits}>
                  {item.credits.map((credit) => (
                    <div key={`${credit.role}-${credit.name}`}>
                      <dt data-type="meta">{credit.role}</dt>
                      <dd>{credit.name}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </GridItem>
          ) : null}
        </Grid>
      </Section>

      {item.format === "article" ? (
        <>
          <Section as="div" width="full" spacing="none">
            <MediaSlot slot={item.cover} ratio="21:9" sizes="100vw" preload />
          </Section>
          {item.body ? (
            <Section as="div">
              <Grid>
                <GridItem span={{ tablet: 7, desktop: 7 }} start={{ tablet: 2, desktop: 4 }}>
                  <Prose className={styles.essay}>
                    {item.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </Prose>
                </GridItem>
              </Grid>
            </Section>
          ) : null}
        </>
      ) : (
        <Section as="div" width="wide" spacing="none" className={styles.work}>
          <Asset item={item} />
          {item.figures?.length ? <FigureSequence figures={item.figures} /> : null}
        </Section>
      )}

      {project ? (
        <Section labelledBy="media-related">
          <h2 id="media-related" data-type="eyebrow" className={styles.relatedLabel}>
            From the work
          </h2>
          <IndexList
            size="md"
            entries={[
              {
                href: `/work/${project.slug}` as Route,
                title: project.title,
                kind: project.category,
                meta: String(project.year),
              },
            ]}
          />
        </Section>
      ) : null}
    </article>
  );
}
