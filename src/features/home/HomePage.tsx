import type { Route } from "next";
import type { CSSProperties } from "react";
import { Invitation } from "@/components/editorial/Invitation";
import { Grid, GridItem } from "@/components/layout/Grid";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Drift } from "@/components/motion/Drift";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { GiantTitle } from "@/components/typography/GiantTitle";
import { Text } from "@/components/typography/Text";
import { Link } from "@/components/ui/Link";
import { Section } from "@/components/ui/Section";
import { contactContent } from "@/content/contact";
import { archiveThemes, homeContent } from "@/content/home";
import { MEDIA_FORMAT_LABELS, publishedMedia } from "@/content/media";
import { buildSizes } from "@/lib/media";
import { withBasePath } from "@/lib/url";
import styles from "./HomePage.module.css";

const heroMediaSizes = buildSizes({ base: "100vw", tablet: "50vw", desktop: "40vw", wide: "51rem" });
const mediaSizes = buildSizes({ base: "100vw", desktop: "75vw", wide: "70rem" });

export function HomePage() {
  const [featured, ...moreMedia] = publishedMedia().filter(
    (item) => item.asset?.kind === "youtube",
  );
  const { statement, feature, detail } = homeContent;
  const leadWords = statement.lead.split(/\s+/).filter(Boolean).length;

  return (
    <>
      {/* The split opening pairs brand and next steps with the full-height portrait. */}
      <Section spacing="sm" labelledBy="home-title" className={styles.hero}>
        <div
          className={styles.heroBackdrop}
          style={{ "--hero-backdrop": `url("${withBasePath("/images/backgrounds/bg-3.webp")}")` } as CSSProperties}
          aria-hidden="true"
        />
        <Grid className={styles.heroGrid}>
          <GridItem span={{ tablet: 6, desktop: 6 }} className={styles.heroText}>
            <Eyebrow className={styles.heroEyebrow}>Questions that matter</Eyebrow>
            <GiantTitle as="h1" id="home-title">
              <SplitReveal text={homeContent.title} />
            </GiantTitle>
            <Text variant="body-lg">{homeContent.intro}</Text>
            <div className={styles.actions}>
              <Link href={featured ? (`/media/${featured.slug}` as Route) : "/media"} variant="primary">
                Watch
              </Link>
              <Link href="/contact" variant="secondary">
                Book
              </Link>
            </div>
          </GridItem>
          <GridItem span={{ tablet: 6, desktop: 6 }} className={styles.heroMedia}>
            <div className={styles.heroStack}>
              <div className={styles.heroPrimary}>
                <Drift strength="strong">
                  <Reveal className={styles.heroPortraitReveal}>
                    <MediaSlot slot={feature} ratio="4:5" sizes={heroMediaSizes} preload />
                  </Reveal>
                </Drift>
              </div>
            </div>
          </GridItem>
        </Grid>
        {featured ? (
          <a href="#home-now-playing" className={styles.scrollCue}>
            <span data-type="meta">Have a look</span>
            <span aria-hidden="true" className={styles.scrollLine} />
          </a>
        ) : null}
      </Section>

      {/* Interruption: one statement on the cyan spotlight ground, nothing else. */}
      <Section as="div" surface="accent" spacing="lg">
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

      <section aria-labelledby="home-archive" className={styles.threads}>
        <h2 id="home-archive" data-type="eyebrow" className={styles.threadsLabel}>
          {homeContent.archiveHeading}
        </h2>
        <Marquee
          label="Theme names"
          items={archiveThemes.map((theme) => (
            <Link key={theme} href="/media" className={styles.theme}>
              {theme}
            </Link>
          ))}
        />
      </section>

      {featured ? (
        <Section surface="raised" labelledBy="home-now-playing">
          <h2 id="home-now-playing" data-type="eyebrow" className={styles.label}>
            {homeContent.featuredHeading}
          </h2>
          <Grid>
            <GridItem span={{ tablet: 8, desktop: 8 }}>
              <figure className={styles.mediaFeature}>
                <Drift direction="down">
                  <MediaSlot slot={featured.cover} ratio="16:9" sizes={mediaSizes} />
                </Drift>
                <figcaption className={styles.mediaCaption}>
                  <span className={styles.kind}>{MEDIA_FORMAT_LABELS[featured.format]}</span>
                  <Link href={`/media/${featured.slug}` as Route} className={styles.mediaTitle}>
                    {featured.title}
                  </Link>
                </figcaption>
              </figure>
            </GridItem>
            <GridItem as="div" span={{ tablet: 8, desktop: 4 }} className={styles.mediaMore}>
              {moreMedia.length > 0 ? (
                <ul role="list" className={styles.mediaList}>
                  {moreMedia.map((item) => (
                    <li key={item.slug}>
                      <span className={styles.kind}>{MEDIA_FORMAT_LABELS[item.format]}</span>
                      <h3 data-type="h3">
                        <Link href={`/media/${item.slug}` as Route} className={styles.titleLink}>
                          {item.title}
                        </Link>
                      </h3>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text variant="body-lg">{featured.summary}</Text>
              )}
              <Link href="/media" variant="cta">
                Open the watch list
              </Link>
            </GridItem>
          </Grid>
        </Section>
      ) : null}

      <Section labelledBy="home-behind">
        <Grid className={styles.feature}>
          <GridItem span={{ tablet: 5, desktop: 5 }} className={styles.featureImage}>
            <Drift strength="strong">
              <Reveal>
                <MediaSlot slot={detail} ratio="1:1" sizes={heroMediaSizes} />
              </Reveal>
            </Drift>
          </GridItem>
          <GridItem span={{ tablet: 3, desktop: 5 }} className={styles.featureText}>
            <h2 id="home-behind" data-type="eyebrow" className={styles.label}>
              {homeContent.behindHeading}
            </h2>
            <Text variant="body-lg">The chair, the guest, the bit before the red light.</Text>
          </GridItem>
        </Grid>
      </Section>

      {/* Close: the invitation is the link. */}
      <Section spacing="lg" labelledBy="home-contact">
        <Invitation href="/contact" id="home-contact">
          {contactContent.invitation}
        </Invitation>
      </Section>
    </>
  );
}
