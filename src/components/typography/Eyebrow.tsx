import type { ReactNode } from "react";

interface EyebrowProps {
  readonly as?: "p" | "span";
  readonly className?: string;
  readonly children: ReactNode;
}

/** Short uppercase label placed before a heading. Keep it to a few words. */
export function Eyebrow({ as: Tag = "p", className, children }: EyebrowProps) {
  return (
    <Tag data-type="eyebrow" className={className}>
      {children}
    </Tag>
  );
}
