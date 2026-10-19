import { Invitation } from "@/components/editorial/Invitation";
import { Grid, GridItem } from "@/components/layout/Grid";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Prose } from "@/components/typography/Prose";
import { Section } from "@/components/ui/Section";
import { aboutContent, aboutPhotographs } from "@/content/about";
import { contactContent } from "@/content/contact";
import { buildSizes } from "@/lib/media";
import { AboutImageTrail } from "./AboutImageTrail";
import { MobilePhotoStack } from "./MobilePhotoStack";
import styles from "./AboutPage.module.css";

const portraitSizes = buildSizes({ base: "100vw", tablet: "50vw", wide: "40rem" });

/**
 * From tablet up, the portrait and the biography share one opening and a
 * pointer trail sits behind it. On a small screen the portrait is hidden and
 * a swipeable stack of the same photographs sits between the statement and
 * the chapters.
 */
export function AboutPage() {
  const { chapters } = aboutContent;

  return (
    <>
      <AboutImageTrail images={aboutPhotographs}>
        <Section spacing="sm" labelledBy="about-title" className={styles.openingSection}>
          <Grid className={styles.opening}>
            <GridItem
              span={{ tablet: 4, desktop: 6 }}
              start={{ tablet: 5, desktop: 7 }}
              className={styles.intro}
            >
              <h1 id="about-title" data-type="display">
                {aboutContent.title}
              </h1>
              <p data-type="quote" className={styles.statement}>
                {aboutContent.statement}
              </p>
            </GridItem>
            <GridItem className={styles.mobileStack}>
              <MobilePhotoStack images={aboutPhotographs} />
            </GridItem>
            <GridItem span={{ tablet: 4, desktop: 5 }} className={styles.portrait}>
              <MediaSlot slot={aboutContent.portrait} ratio="3:4" sizes={portraitSizes} preload />
            </GridItem>
            <GridItem
              span={{ tablet: 4, desktop: 6 }}
              start={{ tablet: 5, desktop: 7 }}
              className={styles.chapters}
            >
              {chapters.map((chapter) => {
                const id = `about-${chapter.heading.toLowerCase()}`;
                return (
                  <div key={chapter.heading} className={styles.chapter}>
                    <h2 id={id} data-type="h2">
                      {chapter.heading}
                    </h2>
                    <Prose>
                      {chapter.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </Prose>
                  </div>
                );
              })}
            </GridItem>
          </Grid>
        </Section>
      </AboutImageTrail>

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
