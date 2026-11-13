import { products } from "@/content/products";
import { categories, collections } from "@/content/categories";
import { site } from "@/content/site";
import type { Product } from "@/content/types";

const activeCategorySlugs = new Set(categories.filter((c) => c.active).map((c) => c.slug));

/** Products that are live: not draft, and in an active category. */
export const liveProducts = (): Product[] =>
  products.filter((p) => !p.draft && activeCategorySlugs.has(p.category));

export const getProduct = (slug: string) => liveProducts().find((p) => p.slug === slug);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

export const activeCategories = () => categories.filter((c) => c.active);
export const upcomingCategories = () => categories.filter((c) => !c.active);
/** Collections that contain at least one live product. */
export const liveCollections = () =>
  collections.filter((c) => liveProducts().some((p) => p.collections.includes(c.slug)));

export const productsInCollection = (slug: string) =>
  liveProducts().filter((p) => p.collections.includes(slug));
export const productsInCategory = (slug: string) =>
  liveProducts().filter((p) => p.category === slug);

export const featuredProducts = () => liveProducts().filter((p) => p.featured);

/** Look up a variant across the live catalogue. Used by cart + checkout. */
export function findVariant(variantId: string) {
  for (const product of liveProducts()) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return undefined;
}

export const minPrice = (p: Product) => Math.min(...p.variants.map((v) => v.price));

export function formatPrice(amount: number) {
  return new Intl.NumberFormat(site.locale, {
    style: "currency",
    currency: site.currency,
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
  }).format(amount / 100);
}
