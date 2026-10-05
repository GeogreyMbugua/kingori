import { Invitation } from "@/components/editorial/Invitation";
import { Grid, GridItem } from "@/components/layout/Grid";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { Prose } from "@/components/typography/Prose";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/content/about";
import { contactContent } from "@/content/contact";
import { buildSizes } from "@/lib/media";
import styles from "./AboutPage.module.css";

const portraitSizes = buildSizes({ base: "100vw", tablet: "50vw", wide: "52rem" });
const detailSizes = buildSizes({ base: "50vw", tablet: "33vw", desktop: "25vw", wide: "26rem" });

/**
 * Personal and spatial: the portrait and Kingori's own words share the
 * opening; chapters read like a conversation, with one close detail image as
 * a pause; capabilities are set as type, not icons.
 */
export function AboutPage() {
  const { chapters } = aboutContent;

  return (
    <>
      <Section spacing="none" labelledBy="about-title" className={styles.opening}>
        <Grid className={styles.openingGrid}>
          <GridItem span={{ tablet: 4, desktop: 5 }} start={{ tablet: 5, desktop: 8 }} className={styles.title}>
            <h1 id="about-title" data-type="giant">
              {aboutContent.title}
            </h1>
          </GridItem>
          <GridItem span={{ tablet: 4, desktop: 6 }} start={{ tablet: 1, desktop: 1 }} className={styles.portrait}>
            <MediaSlot slot={aboutContent.portrait} ratio="3:4" sizes={portraitSizes} preload />
          </GridItem>
          <GridItem span={{ tablet: 4, desktop: 5 }} start={{ tablet: 5, desktop: 8 }} className={styles.statementItem}>
            <p data-type="quote" className={styles.statement}>
              {aboutContent.statement}
            </p>
          </GridItem>
        </Grid>
      </Section>

      <Section labelledBy={`about-${chapters[0].heading.toLowerCase()}`}>
        <Grid className={styles.chapters}>
          {chapters.map((chapter, index) => {
            const id = `about-${chapter.heading.toLowerCase()}`;
            return (
              <GridItem
                key={chapter.heading}
                span={index === 0 ? { tablet: 6, desktop: 7 } : { tablet: 5, desktop: 6 }}
                start={index === 0 ? undefined : { tablet: 2, desktop: 3 }}
                className={styles.chapter}
              >
                <h2 id={id} data-type={index === 0 ? "heading-xl" : "h2"}>
                  {chapter.heading}
                </h2>
                <Prose>
                  {chapter.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </Prose>
              </GridItem>
            );
          })}
          <GridItem
            span={{ base: 2, tablet: 2, desktop: 3 }}
            start={{ base: 3, tablet: 7, desktop: 10 }}
            className={styles.detail}
          >
            <Reveal>
              <MediaSlot slot={aboutContent.detail} ratio="1:1" sizes={detailSizes} />
            </Reveal>
          </GridItem>
        </Grid>
      </Section>

      <Section surface="inverse" labelledBy="about-capabilities">
        <Grid>
          <GridItem span={{ tablet: 2, desktop: 3 }}>
            <h2 id="about-capabilities" data-type="eyebrow">
              {aboutContent.capabilitiesHeading}
            </h2>
          </GridItem>
          <GridItem span={{ tablet: 6, desktop: 9 }}>
            <ul role="list" className={styles.capabilities}>
              {aboutContent.capabilities.map((capability) => (
                <li key={capability} data-type="heading-xl">
                  {capability}
                </li>
              ))}
            </ul>
          </GridItem>
        </Grid>
      </Section>

      <Section spacing="lg" labelledBy="about-contact">
        <Invitation href="/contact" id="about-contact">
          {contactContent.invitation}
        </Invitation>
      </Section>
    </>
  );
}
