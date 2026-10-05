import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import type { NavigationItem } from "@/types/navigation";
import styles from "./PageShell.module.css";

export const MAIN_CONTENT_ID = "main-content";

interface PageShellProps {
  readonly siteName: string;
  readonly navigation: readonly NavigationItem[];
  readonly children: ReactNode;
}

export function PageShell({ siteName, navigation, children }: PageShellProps) {
  return (
    <div className={styles.shell}>
      <SkipLink targetId={MAIN_CONTENT_ID} />
      <Header siteName={siteName} navigation={navigation} />
      {/* tabIndex lets the skip link move keyboard focus, not just scroll. */}
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className={styles.main}>
        {children}
      </main>
      <Footer siteName={siteName} />
    </div>
  );
}
