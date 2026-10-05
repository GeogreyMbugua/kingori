import styles from "./SkipLink.module.css";

interface SkipLinkProps {
  readonly targetId: string;
}

export function SkipLink({ targetId }: SkipLinkProps) {
  return (
    <a className={styles.skipLink} href={`#${targetId}`}>
      Skip to main content
    </a>
  );
}
