import type { Product, Variant } from "./types";
import { artworks } from "./artworks";

/**
 * ─────────────────────────────────────────────────────────────
 *  PRODUCTS
 *  Each print is built from a painting in artworks.ts (image, title, year).
 *  For each print:
 *    • replace the description with the artist's own words
 *    • set the real sizes and prices
 *    • add close-up / framed / interior photos when available
 *  Products with `draft: true` are hidden from the shop.
 * ─────────────────────────────────────────────────────────────
 */

/** Standard print sizes. Prices are [placeholders] in pence. Landscape paintings get the same sizes turned sideways. */
const printSizes = (prefix: string, prices = [3500, 5500, 8500, 12500], landscape = false): Variant[] =>
  [
    { id: `${prefix}-a4`, label: "A4", widthCm: 21, heightCm: 29.7, price: prices[0] },
    { id: `${prefix}-a3`, label: "A3", widthCm: 29.7, heightCm: 42, price: prices[1] },
    { id: `${prefix}-a2`, label: "A2", widthCm: 42, heightCm: 59.4, price: prices[2] },
    { id: `${prefix}-50x70`, label: "50 × 70", widthCm: 50, heightCm: 70, price: prices[3] },
  ].map((v) => (landscape ? { ...v, widthCm: v.heightCm, heightCm: v.widthCm } : v));

/** Paper & printing spec shared by all prints. [Confirm with print partner.] */
const printSpecs = [
  { label: "paper", value: "[e.g. 308 gsm Hahnemühle Photo Rag, 100% cotton]" },
  { label: "printing", value: "[e.g. Giclée, 12-colour archival pigment inks]" },
  { label: "finish", value: "[e.g. Matte, museum grade]" },
  { label: "border", value: "[e.g. 2 cm white border for framing]" },
];

const printDetails = [
  "Printed to order.",
  "Frame not included.",
  "Colours checked against the original painting.",
];

/**
 * Builds a print from a painting in artworks.ts, so the shop always uses
 * the same image, title and year as the gallery.
 * Empty image slots (detail / framed / interior) are not shown on the site:
 * add `src`, `width` and `height` to publish one.
 */
const printOf = (paintingSlug: string, extra: Partial<Product> = {}): Product => {
  const a = artworks.find((x) => x.slug === paintingSlug);
  if (!a) throw new Error(`Unknown painting: ${paintingSlug}`);
  const n = paintingSlug.replace("painting-", "");
  return {
    slug: `artwork-${n}`,
    title: a.title,
    category: "prints",
    collections: ["first-edition"],
    description: "[Short description of this painting — to be written by Deniz Itak.]",
    year: a.year,
    images: [
      a.image,
      { alt: `${a.title} — close-up detail`, kind: "detail" },
      { alt: `${a.title} — framed print mockup`, kind: "framed" },
      { alt: `${a.title} — in an interior`, kind: "interior" },
    ],
    variants: printSizes(`aw${n}`, undefined, (a.image.width ?? 0) > (a.image.height ?? 0)),
    specs: printSpecs,
    details: printDetails,
    ...extra,
  };
};

export const products: Product[] = [
  printOf("painting-01", { featured: true }),
  // Draft: the only file for this painting is a small phone screenshot
  // (785 × 896 px) — too low-resolution to print. Publish once a proper
  // photo or scan is supplied.
  printOf("painting-02", { draft: true, collections: ["first-edition", "bodies-and-hands"] }),
  printOf("painting-03", { featured: true, collections: ["first-edition", "bodies-and-hands"] }),
  // Draft: the only photo shows the canvas on a shelf beside a plant and a candle
  // (1440 × 1800 px), so a print would include the room. Publish once a flat,
  // high-resolution photo or scan of the painting alone is supplied.
  printOf("painting-04", { draft: true, collections: ["first-edition", "bodies-and-hands"] }),
  printOf("painting-05", { collections: ["first-edition", "bodies-and-hands"] }),
  printOf("painting-06", { collections: ["first-edition", "bodies-and-hands"] }),
  printOf("painting-07", { collections: ["first-edition", "bodies-and-hands"] }),
];
