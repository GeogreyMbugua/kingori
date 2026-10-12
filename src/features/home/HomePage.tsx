import type { Route } from "next";
import { IndexList } from "@/components/editorial/IndexList";
import { Invitation } from "@/components/editorial/Invitation";
import { Grid, GridItem } from "@/components/layout/Grid";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Drift } from "@/components/motion/Drift";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { GiantTitle } from "@/components/typography/GiantTitle";
import { Text } from "@/components/typography/Text";
import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";
import { Section } from "@/components/ui/Section";
import { contactContent } from "@/content/contact";
import { homeContent } from "@/content/home";
import { MEDIA_FORMAT_LABELS, mediaItems } from "@/content/media";
import { getUpcomingShows } from "@/content/shows";
import { projects } from "@/content/work";
import { formatDate } from "@/lib/date";
import { buildSizes } from "@/lib/media";
import styles from "./HomePage.module.css";

const portraitSizes = buildSizes({ base: "100vw", tablet: "60vw", desktop: "33vw", wide: "28rem" });
const featureSizes = buildSizes({ base: "100vw", desktop: "66vw", wide: "70rem" });
const mediaSizes = buildSizes({ base: "100vw", desktop: "75vw", wide: "60rem" });

export function HomePage() {
  const [leadProject] = projects;
  const [leadMedia, ...moreMedia] = mediaItems;
  const { statement } = homeContent;
  const leadWords = statement.lead.split(/\s+/).filter(Boolean).length;
  const upcomingShows = getUpcomingShows();

  return (
    <>
      {/* Opening: the name at full voice beside a tall portrait; the intro answers it. */}
      <Section spacing="sm" labelledBy="home-title" className={styles.opening}>
        <Grid>
          <GridItem span={{ tablet: 8, desktop: 8 }} className={styles.wordmark}>
            <GiantTitle as="h1" id="home-title">
              <SplitReveal text={homeContent.title} />
            </GiantTitle>
          </GridItem>
          <GridItem
            span={{ tablet: 5, desktop: 4 }}
            start={{ tablet: 4, desktop: 9 }}
            className={styles.portrait}
          >
            <Drift>
              <MediaSlot slot={homeContent.portrait} ratio="4:5" sizes={portraitSizes} preload />
            </Drift>
          </GridItem>
          <GridItem span={{ tablet: 3, desktop: 5 }} className={styles.intro}>
            <Text variant="body-lg">{homeContent.intro}</Text>
            <Link href="/about" variant="cta">
              About Kingori
            </Link>
          </GridItem>
        </Grid>
      </Section>

      {/* Interruption: one statement on the light surface, nothing else. */}
      <Section as="div" surface="inverse" spacing="lg">
        <Grid>
          <GridItem span={{ desktop: 10 }} start={{ desktop: 2 }}>
            <p data-type="display" className={styles.statement}>
              <SplitReveal text={statement.lead} trigger="scroll" />{" "}
              <em>
                <SplitReveal text={statement.accent} trigger="scroll" offset={leadWords} />
              </em>{" "}
              <SplitReveal text={statement.tail} trigger="scroll" offset={leadWords + 1} />
            </p>
          </GridItem>
        </Grid>
      </Section>

      {upcomingShows.length > 0 ? (
        <section aria-labelledby="home-shows" className={styles.shows}>
          <Container>
            <h2 id="home-shows" data-type="eyebrow" className={styles.label}>
              {homeContent.showsHeading}
            </h2>
          </Container>
          <Marquee
            label="Upcoming dates"
            items={upcomingShows.map((show) => (
              <span key={show.slug}>
                {show.city} <em>{formatDate(show.date)}</em>
              </span>
            ))}
          />
          <Container>
            <p className={styles.more}>
              <Link href="/shows" variant="cta">
                All shows
              </Link>
            </p>
          </Container>
        </section>
      ) : null}

      {leadProject ? (
        <Section labelledBy="home-work" className={styles.work}>
          <h2 id="home-work" data-type="eyebrow" className={styles.label}>
            {homeContent.selectedWorkHeading}
          </h2>
          {/* The lead project gets an image; the rest are carried by type alone. */}
          <Grid className={styles.feature}>
            <GridItem span={{ tablet: 8, desktop: 8 }} className={styles.featureImage}>
              <Reveal>
                <MediaSlot slot={leadProject.cover} ratio="3:2" sizes={featureSizes} />
              </Reveal>
            </GridItem>
            <GridItem span={{ tablet: 6, desktop: 4 }} className={styles.featureText}>
              <p className={styles.kicker}>
                <span data-type="meta">01</span>
                <span className={styles.kind}>{leadProject.category}</span>
                <span data-type="meta">{leadProject.year}</span>
              </p>
              <h3 data-type="heading-xl">
                <Link href={`/work/${leadProject.slug}` as Route} className={styles.titleLink}>
                  {leadProject.title}
                </Link>
              </h3>
              <Text>{leadProject.summary}</Text>
            </GridItem>
          </Grid>
          <IndexList
            start={2}
            entries={projects.slice(1).map((project) => ({
              href: `/work/${project.slug}` as Route,
              title: project.title,
              kind: project.category,
              meta: String(project.year),
            }))}
          />
          <p className={styles.more}>
            <Link href="/work" variant="cta">
              All work
            </Link>
          </p>
        </Section>
      ) : null}

      {leadMedia ? (
        <Section surface="raised" labelledBy="home-media">
          <h2 id="home-media" data-type="eyebrow" className={styles.label}>
            {homeContent.mediaHeading}
          </h2>
          <Grid>
            <GridItem span={{ tablet: 8, desktop: 9 }}>
              <figure className={styles.mediaFeature}>
                <MediaSlot slot={leadMedia.cover} ratio="16:9" sizes={mediaSizes} />
                <figcaption className={styles.mediaCaption}>
                  <span className={styles.kind}>{MEDIA_FORMAT_LABELS[leadMedia.format]}</span>
                  <Link href={`/media/${leadMedia.slug}` as Route} className={styles.mediaTitle}>
                    {leadMedia.title}
                  </Link>
                </figcaption>
              </figure>
            </GridItem>
            <GridItem as="div" span={{ tablet: 8, desktop: 3 }} className={styles.mediaMore}>
              <ul role="list" className={styles.mediaList}>
                {moreMedia.map((item) => (
                  <li key={item.slug}>
                    <span className={styles.kind}>{MEDIA_FORMAT_LABELS[item.format]}</span>
                    <h3 data-type="h3">
                      <Link href={`/media/${item.slug}` as Route} className={styles.titleLink}>
                        {item.title}
                      </Link>
                    </h3>
                    {item.durationMinutes ? (
                      <span data-type="meta">{item.durationMinutes} min</span>
                    ) : null}
                  </li>
                ))}
              </ul>
              <Link href="/media" variant="cta">
                All media
              </Link>
            </GridItem>
          </Grid>
        </Section>
      ) : null}

      {/* Close: the invitation is the link. */}
      <Section spacing="lg" labelledBy="home-contact">
        <Invitation href="/contact" id="home-contact">
          {contactContent.invitation}
        </Invitation>
      </Section>
    </>
  );
}
