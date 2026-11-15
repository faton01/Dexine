import Link from "next/link";
import type { Product } from "@/content/types";
import { formatPrice, minPrice } from "@/lib/catalog";
import { site } from "@/content/site";
import { ArtImage } from "./ArtImage";

export function ProductCard({ product, index }: { product: Product; index?: number }) {
  const hover = product.images.find((i) => i.kind === "framed" || i.kind === "interior");
  return (
    <Link href={`/shop/${product.slug}`} className="pcard">
      <div className="pcard__media">
        <ArtImage img={product.images[0]} sizes="(max-width: 700px) 100vw, 33vw" />
        {hover?.src && (
          <div className="pcard__hover">
            <ArtImage img={hover} sizes="(max-width: 700px) 100vw, 33vw" />
          </div>
        )}
      </div>
      <div className="pcard__meta">
        {index !== undefined && <span className="mono muted">{String(index + 1).padStart(2, "0")}</span>}
        <span className="pcard__title">{product.title}</span>
        {site.sellingEnabled && <span className="pcard__price mono">from {formatPrice(minPrice(product))}</span>}
      </div>
    </Link>
  );
}
