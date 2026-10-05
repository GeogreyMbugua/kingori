import type { ReactNode } from "react";

export type TextVariant = "body-lg" | "body" | "body-sm" | "caption" | "meta";

interface TextProps {
  readonly variant?: TextVariant;
  readonly as?: "p" | "span" | "div";
  readonly id?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Text({ variant = "body", as: Tag = "p", id, className, children }: TextProps) {
  return (
    <Tag data-type={variant} id={id} className={className}>
      {children}
    </Tag>
  );
}
