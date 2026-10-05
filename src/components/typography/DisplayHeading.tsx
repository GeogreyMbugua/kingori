import type { ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface DisplayHeadingProps {
  /** Required: the document outline is a deliberate decision, independent of size. */
  readonly as: HeadingLevel;
  readonly size?: "display" | "heading-xl";
  readonly id?: string;
  readonly className?: string;
  /** Wrap a word in <em> for the serif-italic editorial accent. */
  readonly children: ReactNode;
}

export function DisplayHeading({
  as: Tag,
  size = "display",
  id,
  className,
  children,
}: DisplayHeadingProps) {
  return (
    <Tag data-type={size} id={id} className={className}>
      {children}
    </Tag>
  );
}
