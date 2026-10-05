import type { NavigationMatch } from "@/types/navigation";

export function matchNavigationPath(pathname: string, href: string): NavigationMatch {
  if (pathname === href) return "page";
  if (href !== "/" && pathname.startsWith(`${href}/`)) return "section";
  return null;
}
