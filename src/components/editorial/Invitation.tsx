import type { Route } from "next";
import { Link } from "@/components/ui/Link";
import styles from "./Invitation.module.css";

interface InvitationProps<T extends string> {
  readonly href: Route<T>;
  readonly id: string;
  readonly children: string;
}

/** A closing line where the words themselves are the link: the page's single next step. */
export function Invitation<T extends string>({ href, id, children }: InvitationProps<T>) {
  return (
    <h2 id={id} data-type="display" className={styles.invitation}>
      <Link href={href} className={styles.link}>
        {children}
      </Link>
    </h2>
  );
}
