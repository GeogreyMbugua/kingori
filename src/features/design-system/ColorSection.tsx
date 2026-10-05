import { Section } from "@/components/ui/Section";
import { ContrastSample } from "./ContrastSample";
import styles from "./DesignSystem.module.css";

const BRAND = [
  "deep-navy",
  "midnight-navy",
  "muted-purple",
  "blue",
  "hot-pink",
  "coral-red",
  "orange",
  "soft-white",
  "lavender-white",
] as const;

const PAIRS = [
  ["text", "background"],
  ["text-secondary", "background"],
  ["text-muted", "background"],
  ["accent-text", "background"],
  ["accent-contrast", "accent"],
  ["accent-contrast", "accent-hover"],
  ["text", "surface-structural"],
  ["warm", "background"],
  ["emphasis", "background"],
  ["success", "surface"],
  ["info", "surface"],
] as const;

const INVERSE_PAIRS = [
  ["text", "background"],
  ["text-secondary", "background"],
  ["accent-text", "background"],
  ["emphasis", "background"],
  ["error", "background"],
] as const;

function ContrastGrid({ pairs }: { readonly pairs: readonly (readonly [string, string])[] }) {
  return (
    <ul role="list" className={styles.cards}>
      {pairs.map(([foreground, background]) => (
        <li key={`${foreground}-${background}`}>
          <ContrastSample foreground={foreground} background={background} />
        </li>
      ))}
    </ul>
  );
}

export function ColorSection() {
  return (
    <>
      <Section label="Tokens" labelledBy="ds-colour">
        <h2 id="ds-colour">Colour</h2>
        <h3>Brand palette</h3>
        <ul role="list" className={styles.cards}>
          {BRAND.map((name) => (
            <li key={name} className={styles.swatch}>
              <span
                className={styles.chip}
                style={{ backgroundColor: `var(--brand-${name})` }}
              />
              <code>--brand-{name}</code>
            </li>
          ))}
        </ul>
        <h3>Semantic pairs, default surface</h3>
        <ContrastGrid pairs={PAIRS} />
      </Section>
      <Section surface="inverse" labelledBy="ds-colour-inverse">
        <h2 id="ds-colour-inverse">Semantic pairs, inverse surface</h2>
        <ContrastGrid pairs={INVERSE_PAIRS} />
      </Section>
    </>
  );
}
