import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { activeCategories, liveCollections, liveProducts } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => new URL(p, site.url).toString();
  return [
    { url: u("/"), priority: 1 },
    { url: u("/shop"), priority: 0.9 },
    { url: u("/gallery"), priority: 0.8 },
    { url: u("/about"), priority: 0.7 },
    ...(site.sellingEnabled ? [{ url: u("/info/shipping-returns"), priority: 0.3 }] : []),
    ...liveProducts().map((p) => ({ url: u(`/shop/${p.slug}`), priority: 0.8 })),
    ...liveCollections().map((c) => ({ url: u(`/shop/collection/${c.slug}`), priority: 0.6 })),
    ...activeCategories().map((c) => ({ url: u(`/shop/category/${c.slug}`), priority: 0.6 })),
  ];
}
