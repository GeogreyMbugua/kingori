"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { matchNavigationPath } from "@/lib/navigation";
import type { NavigationItem } from "@/types/navigation";
import styles from "./MenuOverlay.module.css";

interface MenuOverlayProps {
  readonly items: readonly NavigationItem[];
  readonly siteName: string;
}

/**
 * Full-screen menu for small screens: a modal <dialog> that wipes down from
 * the top, with destinations rising in sequence. The native dialog provides
 * focus containment, Escape to close and an inert page behind it.
 */
export function MenuOverlay({ items, siteName }: MenuOverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        className={styles.open}
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        Menu
      </button>
      <dialog ref={dialogRef} aria-label="Menu" className={styles.dialog}>
        <div className={styles.bar}>
          <span className={styles.name}>{siteName}</span>
          <button
            type="button"
            className={styles.close}
            onClick={() => dialogRef.current?.close()}
          >
            Close
          </button>
        </div>
        <nav aria-label="Menu">
          <ol role="list" className={styles.list}>
            {items.map((item, index) => {
              const match = matchNavigationPath(pathname, item.href);
              return (
                <li key={item.href} className={styles.item} style={{ "--i": index } as CSSProperties}>
                  <NextLink
                    href={item.href}
                    className={styles.link}
                    aria-current={match === "page" ? "page" : match === "section" ? "true" : undefined}
                    onClick={() => dialogRef.current?.close()}
                  >
                    <span data-type="meta" className={styles.number} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </NextLink>
                </li>
              );
            })}
          </ol>
        </nav>
      </dialog>
    </>
  );
}
