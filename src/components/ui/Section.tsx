import type { ReactNode } from "react";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Container, type ContainerWidth } from "@/components/ui/Container";
import { cx } from "@/lib/classnames";
import styles from "./Section.module.css";

interface SectionProps {
  readonly children: ReactNode;
  readonly as?: "section" | "div" | "aside";
  /** Eyebrow label rendered above the content. */
  readonly label?: string;
  /** "full" removes the container for edge-to-edge media. */
  readonly width?: ContainerWidth | "full";
  readonly spacing?: "none" | "sm" | "md" | "lg";
  /**
   * Omit to inherit. "default" restores the dark surface inside an inverse
   * section; "raised" is the secondary surface tone.
   */
  readonly surface?: "default" | "raised" | "inverse";
  readonly align?: "start" | "center";
  /** Id of the section's heading: gives <section> an accessible name. */
  readonly labelledBy?: string;
  readonly className?: string;
}

export function Section({
  children,
  as: Tag = "section",
  label,
  width = "content",
  spacing = "md",
  surface,
  align = "start",
  labelledBy,
  className,
}: SectionProps) {
  const labelNode = label ? <Eyebrow className={styles.label}>{label}</Eyebrow> : null;

  return (
    <Tag
      aria-labelledby={labelledBy}
      data-surface={surface === "default" || surface === "inverse" ? surface : undefined}
      className={cx(
        styles.section,
        styles[`spacing-${spacing}`],
        surface === "raised" && styles.raised,
        align === "center" && styles.center,
        className,
      )}
    >
      {width === "full" ? (
        <>
          {labelNode ? <Container>{labelNode}</Container> : null}
          {children}
        </>
      ) : (
        <Container width={width}>
          {labelNode}
          {children}
        </Container>
      )}
    </Tag>
  );
}
