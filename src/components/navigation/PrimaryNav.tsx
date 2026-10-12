import { NavLink } from "@/components/navigation/NavLink";
import type { NavigationItem } from "@/types/navigation";
import styles from "./PrimaryNav.module.css";

interface PrimaryNavProps {
  readonly items: readonly NavigationItem[];
  readonly className?: string;
}

export function PrimaryNav({ items, className }: PrimaryNavProps) {
  return (
    <nav aria-label="Primary" className={className}>
      {/* role="list" preserves list semantics in Safari when list-style is removed. */}
      <ul role="list" className={styles.list}>
        {items.map((item) => (
          <li key={item.href}>
            <NavLink href={item.href}>{item.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
