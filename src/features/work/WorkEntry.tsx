import type { Route } from "next";
import { Grid, GridItem } from "@/components/layout/Grid";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { Text } from "@/components/typography/Text";
import { Link } from "@/components/ui/Link";
import { buildSizes } from "@/lib/media";
import type { Project } from "@/types/content";
import styles from "./WorkEntry.module.css";

interface WorkEntryProps {
  readonly project: Project;
  readonly index: number;
  /** Image-led entries alternate sides; ignored for statement-led entries. */
  readonly imageSide: "start" | "end";
}

const largeSizes = buildSizes({ base: "100vw", desktop: "66vw", wide: "70rem" });
const smallSizes = buildSizes({ base: "100vw", tablet: "40vw", desktop: "25vw", wide: "26rem" });

/**
 * One project in the index. The composition follows the content's shape:
 * statement-led projects lead with type and keep the image small; image-led
 * projects alternate sides so the index reads as a sequence, not a grid.
 */
export function WorkEntry({ project, index, imageSide }: WorkEntryProps) {
  const href = `/work/${project.slug}` as Route;
  const headingId = `work-${project.slug}`;
  const number = String(index + 1).padStart(2, "0");

  const text = (
    <>
      <p className={styles.kicker}>
        <span data-type="meta">{number}</span>
        <span className={styles.kind}>{project.category}</span>
        <span data-type="meta">{project.year}</span>
      </p>
      <h2 id={headingId} data-type="heading-xl">
        <Link href={href} className={styles.titleLink}>
          {project.title}
        </Link>
      </h2>
      <Text>{project.summary}</Text>
      <p data-type="meta">{project.role.join(" · ")}</p>
    </>
  );

  if (project.statement) {
    return (
      <article aria-labelledby={headingId} className={styles.entry}>
        <Grid>
          <GridItem span={{ desktop: 9 }} className={styles.statement}>
            <Reveal>
              <p data-type="quote">{project.statement}</p>
            </Reveal>
          </GridItem>
          <GridItem span={{ tablet: 5, desktop: 5 }} start={{ desktop: 2 }} className={styles.text}>
            {text}
          </GridItem>
          <GridItem
            span={{ base: 2, tablet: 3, desktop: 3 }}
            start={{ tablet: 6, desktop: 9 }}
            className={styles.smallImage}
          >
            <MediaSlot slot={project.cover} ratio={project.coverRatio} sizes={smallSizes} />
          </GridItem>
        </Grid>
      </article>
    );
  }

  const imageFirst = imageSide === "start";

  return (
    <article aria-labelledby={headingId} className={styles.entry}>
      <Grid className={styles.imageLed}>
        <GridItem
          span={{ tablet: 8, desktop: 8 }}
          start={{ desktop: imageFirst ? 1 : 5 }}
          className={imageFirst ? styles.bleedStart : styles.bleedEnd}
        >
          <Reveal>
            <MediaSlot slot={project.cover} ratio={project.coverRatio} sizes={largeSizes} />
          </Reveal>
        </GridItem>
        <GridItem
          span={{ tablet: 6, desktop: 4 }}
          start={{ desktop: imageFirst ? 9 : 1 }}
          className={imageFirst ? styles.textEnd : styles.textStart}
        >
          {text}
        </GridItem>
      </Grid>
    </article>
  );
}
