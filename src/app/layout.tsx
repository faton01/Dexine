import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ViewerProvider } from "@/components/Viewer";
import { Intro, introBootScript } from "@/components/Intro";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "dexine — art by Deniz Itak", template: "%s — dexine" },
  description: `${site.tagline} Original paintings and fine art prints.`,
  openGraph: { siteName: "dexine", type: "website", locale: site.locale.replace("-", "_") },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#111111" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the intro boot script may add data-intro before React hydrates.
    <html lang="en" className={`${archivo.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
      </head>
      <body>
        <Intro />
        <CartProvider>
          <a href="#main" className="skip">
            skip to content
          </a>
          <ViewerProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            {site.sellingEnabled && <CartDrawer />}
          </ViewerProvider>
        </CartProvider>
      </body>
    </html>
  );
}
