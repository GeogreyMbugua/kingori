import Link from "next/link";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { Container } from "@/components/ui/Container";
import type { NavigationItem } from "@/types/navigation";
import styles from "./Header.module.css";

interface HeaderProps {
  readonly siteName: string;
  readonly navigation: readonly NavigationItem[];
}

export function Header({ siteName, navigation }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.home}>
          {siteName}
        </Link>
        <PrimaryNav items={navigation} />
      </Container>
    </header>
  );
}
