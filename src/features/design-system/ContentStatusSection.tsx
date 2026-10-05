import { Text } from "@/components/typography/Text";
import { Section } from "@/components/ui/Section";
import { findPlaceholderContent } from "@/content/status";
import styles from "./DesignSystem.module.css";

/** Launch readiness at a glance: everything the launch guard would reject. */
export function ContentStatusSection() {
  const pending = findPlaceholderContent();

  return (
    <Section surface="raised" label="Content" labelledBy="ds-content">
      <h2 id="ds-content">Content status</h2>
      <Text variant="body-sm">
        {pending.length === 0
          ? "All content is final. Indexing can be enabled."
          : `${pending.length} entries are placeholder or wait on real assets. The build fails if SITE_ALLOW_INDEXING=true while any remain.`}
      </Text>
      {pending.length > 0 ? (
        <ul role="list" className={styles.statusList}>
          {pending.map((entry) => (
            <li key={entry}>
              <code>{entry}</code>
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}
