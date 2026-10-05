import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { createRootMetadata } from "@/lib/metadata";
import { fontVariables } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = createRootMetadata();

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.locale} className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
