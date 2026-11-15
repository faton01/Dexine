import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { Newsletter } from "./Newsletter";
import { site } from "@/content/site";
import { activeCategories, upcomingCategories } from "@/lib/catalog";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__top">
        <Newsletter tone="dark" />
        <div className="footer__cols">
          <div>
            <span className="mono muted">shop</span>
            <Link href="/shop">all</Link>
            {activeCategories().map((c) => (
              <Link key={c.slug} href={`/shop/category/${c.slug}`}>
                {c.name}
              </Link>
            ))}
            {upcomingCategories().slice(0, 3).map((c) => (
              <span key={c.slug} className="footer__soon">
                {c.name} <em>soon</em>
              </span>
            ))}
          </div>
          <div>
            <span className="mono muted">studio</span>
            <Link href="/gallery">gallery</Link>
            <Link href="/about">about Deniz</Link>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
              instagram ↗
            </a>
          </div>
          <div>
            <span className="mono muted">help</span>
            {site.sellingEnabled && <Link href="/info/shipping-returns">shipping & returns</Link>}
            <a href={`mailto:${site.contactEmail}`}>contact</a>
          </div>
        </div>
      </div>
      <div className="footer__mark">
        <Wordmark size="xl" href={null} />
      </div>
      <div className="footer__base mono">
        <span>© {year} dexine — art by Deniz Itak</span>
        <span>all artworks © Deniz Itak. reproduction without permission is not allowed.</span>
      </div>
    </footer>
  );
}
