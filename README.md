# dexine — art by Deniz Itak

Artist portfolio and art print shop. Built with Next.js (App Router) and TypeScript. Payment runs through Stripe Checkout.

```bash
npm install
cp .env.example .env.local   # fill in keys (see below)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Status: real vs placeholder

**Real (supplied by the artist):**

- Three paintings in `public/artworks/`.
- Two photos of Deniz in `public/about/`: a studio portrait, and Deniz standing with the ladder painting.

**Still placeholder.** Nothing has been invented to fill these gaps:

- **Painting titles, years, media and dimensions.** They currently show as "painting 01", "[year]" and so on.
- **Anything in `[square brackets]`:** descriptions, the bio, the quote, paper specs, prices, shipping rates, the returns policy and the Instagram handle. Search for `[` in `src/content/` to find every one.
- **Mockup photos:** close-up, framed and interior images. Empty slots are hidden until a photo is added.
- **The print of painting 02** is a draft and hidden from the shop. The only file is a small phone screenshot (785 × 896 px), which is too low-resolution to print.

## Managing content

All content lives in `src/content/`. Pages read from these files, so you never need to edit a page.

| File | What it controls |
| --- | --- |
| `products.ts` | Shop products: images, title, description, sizes and prices, specs |
| `artworks.ts` | Original paintings shown in the gallery |
| `categories.ts` | Product categories (prints, tote bags, …) and collections |
| `site.ts` | Brand settings, currency, shipping rates and countries, About page text, shipping & returns text |

### Add a print

1. Export the painting at high resolution, at least 3000px on the long edge. Do not crop it. Save it as `public/artworks/<name>.jpg`.
2. In `products.ts`, add or edit an entry and set the image details, for example `{ src: "/artworks/<name>.jpg", width: 3000, height: 3750, alt: "...", kind: "artwork" }`.
   - `width` and `height` must be the file's real pixel size. The site uses them to show the painting at its original proportions. Images are never cropped.
3. Add more images to the same entry: `kind: "detail"` (close-up), `"framed"` (framed mockup) or `"interior"` (room mockup).
   - On shop cards, the framed or interior image appears when a customer hovers over the print.
4. Set the sizes and prices under `variants`.
   - Prices are in pence: `4500` means £45.
   - Each variant `id` must stay unique and must not change after launch, because customers' carts store it.
   - Mark a size as sold out with `inStock: false`.
5. To hide a product without deleting it, add `draft: true`.

### Collections

Add an entry to `collections` in `categories.ts`. Then list its slug in each product's `collections` array. The collection page and its shop filter are created automatically.

### Launch a new merchandise line (tote bags, shirts, keychains…)

1. In `categories.ts`, set `active: true` on the category.
2. Add products with `category: "<slug>"`.
   - Variants don't need dimensions. For example, shirts can use `{ id: "tee-m", label: "M", price: 3000 }`.

While a category is inactive, it shows as "soon" in the shop, the footer and the homepage, and none of its products are published.

## Integrations

Each integration is switched on by an environment variable. When a key is missing, the feature says plainly that it isn't available yet. It never pretends to work.

| Variable | Purpose |
| --- | --- |
| `STRIPE_SECRET_KEY` | Checkout. The server builds the Stripe session from the catalogue, so customers can't change prices. Shipping countries and rates come from `site.ts`. Promotion codes are enabled. Orders and receipts are handled in the Stripe dashboard. |
| `BUTTONDOWN_API_KEY` | Newsletter signup. To use Mailchimp or Klaviyo instead, replace the `fetch` call in `src/app/api/newsletter/route.ts`. |
| `INSTAGRAM_ACCESS_TOKEN` | Optional live feed on the homepage, refreshed every hour. Without it, the homepage links to the profile instead. |
| `NEXT_PUBLIC_SITE_URL` | The live domain. Used for canonical URLs, the sitemap, Open Graph tags and Stripe redirects. |

**Before taking real orders:**

- Test with Stripe test keys first.
- Add a Stripe webhook (`checkout.session.completed`) if order emails need to reach a print or fulfilment partner automatically.
- Turn on Stripe Tax if you need to charge VAT.

## SEO

- Every page has its own title, description and canonical URL.
- Product pages include Product structured data (JSON-LD) and Open Graph images.
- `/sitemap.xml` and `/robots.txt` are generated from the catalogue.

## Design system

The visual tokens are defined at the top of `src/app/globals.css`:

- **Colours:** black `#111111`, warm white `#F5F3ED`, electric blue `#244BFF`, red `#E52D38`.
- **Typefaces:** Archivo (variable width, extra-wide for the display type and wordmark) and IBM Plex Mono (captions and UI).
- **Wordmark:** `src/components/Wordmark.tsx`. The dot on the "i" is a red square that turns blue and tilts on hover.
