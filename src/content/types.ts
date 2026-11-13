/**
 * Catalogue types. Every product, collection and category on the site
 * is described by these shapes — edit the data files, not the pages.
 */

export type ImageKind = "artwork" | "detail" | "framed" | "interior" | "studio" | "portrait";

export interface Img {
  /** Path under /public, e.g. "/artworks/blue-hands.jpg". Leave undefined until the real file exists. */
  src?: string;
  /** Intrinsic pixel size of the file. Used to keep the original proportions exactly. */
  width?: number;
  height?: number;
  /** Describe the image for screen readers and search engines. */
  alt: string;
  kind: ImageKind;
}

export interface Variant {
  /** Stable id, never reuse — it is stored in customers' carts. */
  id: string;
  /** What the customer sees, e.g. "A3" or "M". */
  label: string;
  /** Physical size in cm, for prints. Drives the size-comparison drawing. */
  widthCm?: number;
  heightCm?: number;
  /** Price in the smallest currency unit (pence / cents). 4500 = 45.00 */
  price: number;
  /** Set false to show the size as sold out. */
  inStock?: boolean;
}

export interface Product {
  slug: string;
  title: string;
  /** Category slug — see categories.ts */
  category: string;
  /** Collection slugs — see collections.ts */
  collections: string[];
  /** Short description. Written by the artist; do not invent. */
  description: string;
  /** Year of the original painting, if known. */
  year?: string;
  images: Img[];
  variants: Variant[];
  /** Paper and printing specifications, shown as label → value rows. */
  specs: { label: string; value: string }[];
  /** Additional product details, one line each. */
  details: string[];
  featured?: boolean;
  /** Hide from the shop without deleting. */
  draft?: boolean;
  /** Optional SEO override. */
  seoDescription?: string;
}

export interface Category {
  slug: string;
  /** Lowercase display name */
  name: string;
  /** false = shown as "soon" and its products are not published. Flip to true to launch. */
  active: boolean;
  blurb?: string;
}

export interface Collection {
  slug: string;
  name: string;
  description?: string;
  /** Optional hero image for the collection page. */
  image?: Img;
}

export interface Artwork {
  slug: string;
  title: string;
  year?: string;
  medium?: string;
  /** e.g. "100 × 80 cm" */
  dimensions?: string;
  image: Img;
  /** Optional: links the original to its print in the shop. */
  printSlug?: string;
  /** Layout hint for the asymmetric gallery grid. */
  size?: "s" | "m" | "l";
}
