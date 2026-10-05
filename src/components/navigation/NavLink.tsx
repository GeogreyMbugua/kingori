"use client";

import type { Route } from "next";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Link } from "@/components/ui/Link";
import { matchNavigationPath } from "@/lib/navigation";

interface NavLinkProps {
  readonly href: Route;
  readonly children: ReactNode;
}

/** Client component only because the active state depends on the current pathname. */
export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const match = matchNavigationPath(pathname, href);

  return (
    <Link
      href={href}
      variant="nav"
      aria-current={match === "page" ? "page" : match === "section" ? "true" : undefined}
    >
      {children}
    </Link>
  );
}
