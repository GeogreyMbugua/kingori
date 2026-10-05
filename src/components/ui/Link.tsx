import type { Route } from "next";
import NextLink from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/classnames";
import styles from "./Link.module.css";

export type ExternalHref =
  | `https://${string}`
  | `http://${string}`
  | `mailto:${string}`
  | `tel:${string}`;

export type LinkVariant = "inline" | "cta" | "nav";

interface LinkProps<T extends string>
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "style"> {
  readonly href: Route<T> | ExternalHref;
  /** inline: links within text · cta: standalone call to action · nav: navigation lists */
  readonly variant?: LinkVariant;
  readonly children: ReactNode;
}

const EXTERNAL_HREF = /^(https?:|mailto:|tel:)/;

export function isExternalHref(href: string): href is ExternalHref {
  return EXTERNAL_HREF.test(href);
}

/**
 * External links open in the same tab: users control new tabs. Internal hrefs
 * are checked at compile time via typed routes.
 */
export function Link<T extends string>({
  href,
  variant = "inline",
  className,
  children,
  ...rest
}: LinkProps<T>) {
  const classes = cx(styles[variant], className);
  const content =
    variant === "cta" ? (
      <>
        {children}
        <span aria-hidden="true" className={styles.arrow}>
          →
        </span>
      </>
    ) : (
      children
    );

  if (isExternalHref(href)) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...rest}>
      {content}
    </NextLink>
  );
}
