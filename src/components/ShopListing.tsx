import Link from "next/link";
import type { Product } from "@/content/types";
import { activeCategories, liveCollections, upcomingCategories } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

/** Shared layout for /shop, /shop/collection/*, /shop/category/*. */
export function ShopListing({
  title,
  intro,
  products,
  current,
}: {
  title: string;
  intro?: string;
  products: Product[];
  current: string; // "all" | "collection:slug" | "category:slug"
}) {
  const cats = activeCategories();
  const cols = liveCollections();
  const filters = [
    { key: "all", href: "/shop", label: "all" },
    ...(cats.length > 1 ? cats.map((c) => ({ key: `category:${c.slug}`, href: `/shop/category/${c.slug}`, label: c.name })) : []),
    ...cols.map((c) => ({ key: `collection:${c.slug}`, href: `/shop/collection/${c.slug}`, label: c.name })),
  ];
  return (
    <div className="shop">
      <header className="shop__head">
        <h1 className="display-xxl">{title}</h1>
        {intro && <p className="lede shop__intro">{intro}</p>}
        <span className="mono muted shop__count">
          {products.length} {products.length === 1 ? "work" : "works"}
        </span>
      </header>
      <nav className="filters" aria-label="Collections">
        {filters.map((f) => (
          <Link key={f.key} href={f.href} className={`chip ${f.key === current ? "is-active" : ""}`} aria-current={f.key === current ? "page" : undefined}>
            {f.label}
          </Link>
        ))}
        {upcomingCategories().map((c) => (
          <span key={c.slug} className="chip chip--soon" title="coming soon">
            {c.name} <sup>soon</sup>
          </span>
        ))}
      </nav>
      {products.length ? (
        <div className="pgrid">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      ) : (
        <p className="lede">nothing here yet — check back soon.</p>
      )}
    </div>
  );
}
