import type { ReactNode } from "react";
import { cx } from "@/lib/classnames";
import styles from "./GiantTitle.module.css";

type GiantTitleProps = {
  readonly id?: string;
  readonly className?: string;
  readonly children: ReactNode;
} & (
  | { readonly as: "h1" | "h2"; readonly decorative?: never }
  | {
      readonly as?: "p";
      /** Hides purely typographic graphics (e.g. a backdrop word) from assistive tech. */
      readonly decorative?: boolean;
    }
);

export function GiantTitle({ as: Tag = "p", decorative, id, className, children }: GiantTitleProps) {
  return (
    <Tag
      data-type="giant"
      id={id}
      className={cx(styles.giant, className)}
      aria-hidden={decorative ? true : undefined}
    >
      {children}
    </Tag>
  );
}
