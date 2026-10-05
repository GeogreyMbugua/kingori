import type { ReactNode } from "react";
import { DisplayHeading } from "@/components/typography/DisplayHeading";
import { EditorialQuote } from "@/components/typography/EditorialQuote";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { GiantTitle } from "@/components/typography/GiantTitle";
import { Prose } from "@/components/typography/Prose";
import { Text } from "@/components/typography/Text";
import { Section } from "@/components/ui/Section";
import { designSystemDemo } from "@/content/demo/design-system";
import styles from "./DesignSystem.module.css";

const { specimen } = designSystemDemo;

function Role({ name, children }: { readonly name: string; readonly children: ReactNode }) {
  return (
    <div className={styles.specimen}>
      <code className={styles.roleName}>{name}</code>
      {children}
    </div>
  );
}

/* Heading-sized specimens use <p data-type> so they don't pollute the document outline. */
export function TypographySection() {
  return (
    <Section label="Typography" labelledBy="ds-type">
      <h2 id="ds-type">Type roles</h2>
      <Role name="giant · GiantTitle">
        <GiantTitle>{specimen.giant}</GiantTitle>
      </Role>
      <Role name="display · DisplayHeading">
        <DisplayHeading as="h3">
          {specimen.display} <em>{specimen.displayAccent}</em>
        </DisplayHeading>
      </Role>
      <Role name="heading-xl · DisplayHeading">
        <DisplayHeading as="h3" size="heading-xl">
          {specimen.headingXl}
        </DisplayHeading>
      </Role>
      {(["h1", "h2", "h3"] as const).map((role) => (
        <Role key={role} name={role}>
          <p data-type={role}>{specimen.heading}</p>
        </Role>
      ))}
      <Role name="eyebrow · Eyebrow">
        <Eyebrow>{specimen.eyebrow}</Eyebrow>
      </Role>
      <Role name="body-lg">
        <Text variant="body-lg">{specimen.bodyLg}</Text>
      </Role>
      <Role name="body">
        <Text>{specimen.body}</Text>
      </Role>
      <Role name="body-sm">
        <Text variant="body-sm">{specimen.bodySm}</Text>
      </Role>
      <Role name="caption">
        <Text variant="caption">{specimen.caption}</Text>
      </Role>
      <Role name="meta">
        <Text variant="meta">{specimen.meta}</Text>
      </Role>
      <Role name="quote · EditorialQuote">
        <EditorialQuote attribution={specimen.quoteAttribution} source={specimen.quoteSource}>
          {specimen.quote}
        </EditorialQuote>
      </Role>
      <Role name="long-form · Prose">
        <Prose>
          <p>{specimen.body}</p>
          <h3>{specimen.heading}</h3>
          <p>{specimen.bodySm}</p>
          <ul>
            <li>{specimen.caption}</li>
            <li>{specimen.bodySm}</li>
          </ul>
        </Prose>
      </Role>
      <Role name="language coverage">
        <Text>{specimen.diacritics}</Text>
      </Role>
    </Section>
  );
}
