import type { ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/classnames";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "quiet";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  /** primary: the one main action per view · secondary: alternatives · quiet: low-emphasis utilities */
  readonly variant?: ButtonVariant;
}

/** For actions. Navigation uses Link (variant "cta" for call-to-action links). */
export function Button({ variant = "primary", type = "button", className, ...rest }: ButtonProps) {
  return (
    <button type={type} className={cx(styles.button, styles[variant], className)} {...rest} />
  );
}
