/**
 * Site-wide settings. Anything in [square brackets] is a placeholder
 * waiting for real information from the artist — replace, don't invent.
 */
export const site = {
  name: "dexine",
  attribution: "art by Deniz Itak",
  artist: "Deniz Itak",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Factual one-liner taken from the brand brief. */
  tagline: "dexine is the independent art label of artist Deniz Itak.",

  /** ISO currency used for every price in the catalogue. */
  currency: "GBP",
  locale: "en-GB",

  instagram: {
    handle: "[instagram-handle]",
    url: "https://instagram.com/", // ← replace with the real profile URL
  },
  contactEmail: "[hello@your-domain.com]",

  /**
   * false = enquiry mode: the product page shows "email us about this print"
   * (pre-filled with the print and size) instead of "add to bag", and the bag
   * is hidden. Flip to true to turn the cart + Stripe checkout back on.
   */
  sellingEnabled: false as boolean,
  /** Where print enquiries are sent. */
  enquiryEmail: "itakdeniz@gmail.com",

  /** Countries Stripe will accept a shipping address from. */
  shippingCountries: ["GB", "IE", "FR", "DE", "NL", "BE", "ES", "IT", "PT", "AT", "DK", "SE", "TR", "US", "CA"] as const,

  /**
   * Shipping options offered at checkout (smallest currency unit).
   * [Placeholder rates — confirm with your fulfilment partner.]
   */
  shippingRates: [
    { name: "Standard — tracked, tube or flat-pack", amount: 600, minDays: 3, maxDays: 7 },
    { name: "International — tracked", amount: 1800, minDays: 7, maxDays: 14 },
  ],
} as const;

/** Which paintings lead the homepage (slugs from artworks.ts). */
export const home = {
  hero: "painting-03",
  side: "painting-01",
};

/** Placeholder content for the About page. Every field is editable. */
export const about = {
  intro: "[Short opening line in the artist's own words.]",
  bio: [
    "[Biography paragraph one — to be supplied by Deniz Itak.]",
    "[Biography paragraph two — practice, influences, where the work is made.]",
  ],
  quote: "[A sentence from the artist about the work.]",
  based: "[City]",
  facts: [
    { label: "based in", value: "[City]" },
    { label: "works in", value: "[Medium — e.g. acrylic / oil on canvas]" },
    { label: "studio", value: "[Studio location]" },
  ],
  /** Portrait used on the About page and the homepage artist teaser. */
  portrait: {
    src: "/about/deniz-studio.jpg",
    width: 2986,
    height: 3711,
    alt: "Deniz Itak sitting on the studio floor, surrounded by paintings, photographed through a fisheye lens.",
    kind: "portrait" as const,
  },
  /** The artist with an original painting. */
  withPaintings: {
    src: "/about/deniz-with-painting.jpg",
    width: 1979,
    height: 3518,
    alt: "Deniz Itak standing next to the painting of figures on a ladder, leaning against a white wall.",
    kind: "studio" as const,
  },
  /** Extra studio photographs. Empty slots are not shown; add `src`, `width`, `height` to publish one. */
  studio: [
    { alt: "Studio photograph 01", kind: "studio" as const },
    { alt: "Studio photograph 02", kind: "studio" as const },
  ] as { src?: string; width?: number; height?: number; alt: string; kind: "studio" }[],
};

/** Shipping & returns copy. [Placeholders — confirm policy before launch.] */
export const shippingInfo = {
  sections: [
    {
      title: "printing",
      body: "Every print is produced to order. [Confirm production time with your print partner — e.g. 3–5 working days.]",
    },
    {
      title: "shipping",
      body: "Prints are shipped rolled in a rigid tube or flat in a reinforced mailer, with tracking. Rates are shown at checkout.",
    },
    {
      title: "returns",
      body: "[State your returns policy here — e.g. 14 days from delivery for unframed prints in original condition. UK/EU consumer law applies.]",
    },
    {
      title: "damaged in transit",
      body: "[Explain how customers should report damage — e.g. email a photo within 48 hours and a replacement is sent.]",
    },
  ],
};
