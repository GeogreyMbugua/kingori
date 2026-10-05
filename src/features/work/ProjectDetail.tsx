import type { Route } from "next";
import { IndexList } from "@/components/editorial/IndexList";
import { Grid, GridItem } from "@/components/layout/Grid";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Prose } from "@/components/typography/Prose";
import { Text } from "@/components/typography/Text";
import { Link } from "@/components/ui/Link";
import { Section } from "@/components/ui/Section";
import { getRelatedProjects } from "@/content/work";
import { buildSizes } from "@/lib/media";
import type { Paragraphs, Project } from "@/types/content";
import styles from "./ProjectDetail.module.css";
import { FigureSequence } from "@/components/editorial/FigureSequence";

interface ProjectDetailProps {
  readonly project: Project;
}

const heroSizes = "100vw";
const asideSizes = buildSizes({ base: "100vw", tablet: "40vw", desktop: "25vw", wide: "26rem" });

function Chapter({ id, heading, body }: { id: string; heading: string; body: Paragraphs }) {
  return (
    <Grid className={styles.chapter}>
      <GridItem span={{ tablet: 2, desktop: 3 }}>
        <h2 id={id} data-type="eyebrow" className={styles.chapterLabel}>
          {heading}
        </h2>
      </GridItem>
      <GridItem span={{ tablet: 6, desktop: 7 }}>
        <Prose>
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
      </GridItem>
    </Grid>
  );
}

/**
 * Editorial case study. The page shape follows the content: a statement
 * replaces the hero image, and challenge/approach/outcome add chapters.
 */
export function ProjectDetail({ project }: ProjectDetailProps) {
  const related = getRelatedProjects(project);
  const caseStudy = [
    ["challenge", "Challenge", project.challenge],
    ["approach", "Approach", project.approach],
    ["outcome", "Outcome", project.outcome],
  ] as const;

  return (
    <article aria-labelledby="project-title">
      <Section spacing="sm">
        <Grid className={styles.opening}>
          <GridItem className={styles.kicker}>
            <Link href="/work" variant="nav">
              Work
            </Link>
            <span className={styles.kind}>{project.category}</span>
            <span data-type="meta">{project.year}</span>
          </GridItem>
          <GridItem span={{ desktop: 10 }}>
            <h1 id="project-title" data-type="display">
              {project.title}
            </h1>
          </GridItem>
          <GridItem span={{ tablet: 5, desktop: 6 }}>
            <Text variant="body-lg">{project.summary}</Text>
          </GridItem>
          <GridItem span={{ tablet: 3, desktop: 3 }} start={{ desktop: 10 }}>
            <dl className={styles.facts}>
              <div>
                <dt data-type="meta">Role</dt>
                <dd>{project.role.join(", ")}</dd>
              </div>
              <div>
                <dt data-type="meta">Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt data-type="meta">Discipline</dt>
                <dd>{project.category}</dd>
              </div>
            </dl>
          </GridItem>
        </Grid>
      </Section>

      {project.statement ? (
        <Section as="div" surface="inverse" spacing="lg">
          <Grid>
            <GridItem span={{ desktop: 9 }} start={{ desktop: 2 }}>
              <blockquote className={styles.statement}>
                <p data-type="quote">{project.statement}</p>
              </blockquote>
            </GridItem>
          </Grid>
        </Section>
      ) : (
        <Section as="div" width="full" spacing="none">
          <MediaSlot slot={project.cover} ratio={project.coverRatio} sizes={heroSizes} preload />
        </Section>
      )}

      <Section labelledBy="project-overview" className={styles.chapters}>
        <Grid>
          <GridItem span={{ tablet: 8, desktop: project.statement ? 9 : 12 }}>
            <Chapter id="project-overview" heading="Overview" body={project.overview} />
          </GridItem>
          {project.statement ? (
            <GridItem span={{ base: 3, tablet: 4, desktop: 3 }} className={styles.aside}>
              <MediaSlot slot={project.cover} ratio={project.coverRatio} sizes={asideSizes} />
            </GridItem>
          ) : null}
        </Grid>
        {caseStudy.map(([id, heading, body]) =>
          body ? <Chapter key={id} id={`project-${id}`} heading={heading} body={body} /> : null,
        )}
      </Section>

      {project.figures?.length ? (
        <Section as="div" width="wide" spacing="none" className={styles.figures}>
          <FigureSequence figures={project.figures} />
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section labelledBy="project-related">
          <h2 id="project-related" data-type="eyebrow" className={styles.relatedLabel}>
            Related work
          </h2>
          <IndexList
            size="md"
            entries={related.map((item) => ({
              href: `/work/${item.slug}` as Route,
              title: item.title,
              kind: item.category,
              meta: String(item.year),
            }))}
          />
        </Section>
      ) : null}
    </article>
  );
}
