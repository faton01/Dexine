import type { Category, Collection } from "./types";

/**
 * Product categories. To launch a new line (e.g. tote bags):
 *   1. set `active: true` below
 *   2. add products with `category: "tote-bags"` in products.ts
 */
export const categories: Category[] = [
  { slug: "prints", name: "art prints", active: true, blurb: "Reproductions of original paintings." },
  { slug: "tote-bags", name: "tote bags", active: false },
  { slug: "shirts", name: "shirts & t-shirts", active: false },
  { slug: "keychains", name: "keychains", active: false },
  { slug: "accessories", name: "accessories", active: false },
  { slug: "objects", name: "objects", active: false },
];

/** Collections group products across categories. Add as many as needed. */
export const collections: Collection[] = [
  { slug: "first-edition", name: "first edition", description: "[Collection description — to be written.]" },
  { slug: "bodies-and-hands", name: "bodies & hands", description: "[Collection description — to be written.]" },
];
