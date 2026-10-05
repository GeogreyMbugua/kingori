import { Grid, GridItem } from "@/components/layout/Grid";
import { Text } from "@/components/typography/Text";
import { Section } from "@/components/ui/Section";
import { projects, workContent } from "@/content/work";
import styles from "./WorkIndex.module.css";
import { WorkEntry } from "./WorkEntry";

export function WorkIndex() {
  return (
    <>
      <Section spacing="sm" labelledBy="work-title">
        <Grid className={styles.opening}>
          <GridItem span={{ tablet: 4, desktop: 6 }}>
            <h1 id="work-title" data-type="giant">
              {workContent.title}
            </h1>
          </GridItem>
          <GridItem span={{ tablet: 4, desktop: 4 }} start={{ desktop: 8 }} className={styles.intro}>
            <Text variant="body-lg">{workContent.intro}</Text>
            {projects.length > 0 ? (
              <p data-type="meta">
                {String(projects.length).padStart(2, "0")}{" "}
                {projects.length === 1 ? "project" : "projects"}
              </p>
            ) : null}
          </GridItem>
        </Grid>
      </Section>
      <Section spacing="none" className={styles.entries}>
        {projects.length === 0 ? (
          <Text>{workContent.emptyMessage}</Text>
        ) : (
          projects.map((project, index) => {
            const imageLedBefore = projects
              .slice(0, index)
              .filter((previous) => !previous.statement).length;
            return (
              <WorkEntry
                key={project.slug}
                project={project}
                index={index}
                imageSide={imageLedBefore % 2 === 0 ? "start" : "end"}
              />
            );
          })
        )}
      </Section>
    </>
  );
}
