import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getCollection, getProduct, liveProducts, minPrice } from "@/lib/catalog";
import { site, shippingInfo } from "@/content/site";
import { ArtImage } from "@/components/ArtImage";
import { AddToCart } from "@/components/AddToCart";
import { ProductCard } from "@/components/ProductCard";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => liveProducts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const description = p.seoDescription ?? `${p.title} — fine art print of an original painting by Deniz Itak.`;
  const img = p.images.find((i) => i.src);
  return {
    title: `${p.title} — art print`,
    description,
    alternates: { canonical: `/shop/${p.slug}` },
    openGraph: {
      title: `${p.title} — dexine`,
      description,
      images: img?.src ? [{ url: img.src, width: img.width, height: img.height, alt: img.alt }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const collections = product.collections.map(getCollection).filter(Boolean);
  const [main, ...rest] = product.images;
  // Only supplied photos are shown; empty detail/mockup slots stay hidden.
  const more = rest.filter((img) => img.src);
  const related = liveProducts()
    .filter((p) => p.slug !== product.slug && p.collections.some((c) => product.collections.includes(c)))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.filter((i) => i.src).map((i) => new URL(i.src!, site.url).toString()),
    brand: { "@type": "Brand", name: "dexine" },
    creator: { "@type": "Person", name: site.artist },
    // Prices are only published while the shop is selling.
    offers: !site.sellingEnabled ? undefined : {
      "@type": "AggregateOffer",
      priceCurrency: site.currency,
      lowPrice: (minPrice(product) / 100).toFixed(2),
      highPrice: (Math.max(...product.variants.map((v) => v.price)) / 100).toFixed(2),
      offerCount: product.variants.length,
      availability: product.variants.some((v) => v.inStock !== false)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <article className="product">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="crumbs mono" aria-label="Breadcrumb">
        <Link href="/shop">shop</Link> / {category && <Link href={`/shop/category/${category.slug}`}>{category.name}</Link>} /{" "}
        <span aria-current="page">{product.title}</span>
      </nav>

      <div className="product__layout">
        <div className="product__media">
          <figure className="product__main">
            <ArtImage img={main} priority sizes="(max-width: 900px) 100vw, 60vw" />
          </figure>
          {more.length > 0 && <div className="product__more">
            {more.map((img, i) => (
              <figure key={i} className={`product__more-item product__more-item--${img.kind}`}>
                <ArtImage img={img} sizes="(max-width: 900px) 100vw, 30vw" placeholderRatio={img.kind === "interior" ? "4 / 3" : "4 / 5"} />
              </figure>
            ))}
          </div>}
        </div>

        <aside className="product__panel">
          <div className="product__titles">
            <span className="mono muted">{collections.map((c) => c!.name).join(" · ")}</span>
            <h1 className="display-xl">{product.title}</h1>
            {product.year && <span className="mono">original painting, {product.year}</span>}
          </div>
          <p className="product__desc">{product.description}</p>

          <AddToCart product={product} />

          <div className="accordions">
            <details open>
              <summary>paper & printing</summary>
              <dl className="specs">
                {product.specs.map((s) => (
                  <div key={s.label}>
                    <dt className="mono">{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </details>
            <details>
              <summary>product details</summary>
              <ul className="details-list">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </details>
            {site.sellingEnabled && <details>
              <summary>shipping & returns</summary>
              {shippingInfo.sections.slice(0, 3).map((s) => (
                <p key={s.title}>
                  <strong className="mono">{s.title}</strong> — {s.body}
                </p>
              ))}
              <Link href="/info/shipping-returns" className="arrow-link">full policy →</Link>
            </details>}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="section__head">
            <span className="mono">from the same collection</span>
          </div>
          <div className="pgrid">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
