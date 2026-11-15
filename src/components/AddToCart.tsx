"use client";

import { useState } from "react";
import type { Product } from "@/content/types";
import { formatPrice } from "@/lib/catalog";
import { site } from "@/content/site";
import { useCart } from "./CartProvider";

/** Subject + body of the enquiry email, with the chosen print and size already written in. */
function enquiry(product: Product, variant: Product["variants"][number]) {
  const dims = variant.widthCm ? ` (${variant.widthCm} × ${variant.heightCm} cm)` : "";
  const subject = `${product.title} — ${variant.label}`;
  // Blank lines at the top leave room for the customer's own message.
  const body = [
    "Hi Deniz,",
    "",
    "",
    "",
    "———",
    `Print: ${product.title}`,
    `Size: ${variant.label}${dims}`,
    new URL(`/shop/${product.slug}`, site.url).toString(),
  ].join("\n");
  const q = (s: string) => encodeURIComponent(s);
  return {
    /** Opens the visitor's default email app. */
    mailto: `mailto:${site.enquiryEmail}?subject=${q(subject)}&body=${q(body)}`,
    /** Opens a Gmail compose window (the Gmail app on phones where it's installed, otherwise gmail.com). */
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${q(site.enquiryEmail)}&su=${q(subject)}&body=${q(body)}`,
  };
}

/** Size picker + add to cart. Includes a to-scale size comparison for prints. */
export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const firstAvailable = product.variants.find((v) => v.inStock !== false) ?? product.variants[0];
  const [selected, setSelected] = useState(firstAvailable.id);
  const variant = product.variants.find((v) => v.id === selected)!;
  const soldOut = variant.inStock === false;
  const sized = product.variants.filter((v) => v.widthCm && v.heightCm);
  const maxH = Math.max(...sized.map((v) => v.heightCm!), 1);
  const sumW = sized.reduce((s, v) => s + v.widthCm!, 0) || 1;
  // One cm→px factor for every sheet: as large as the 110px row height allows,
  // but never wider than the column (landscape sizes would otherwise overflow it).
  const GAP = 10;
  const SCALE_H = 110;
  const unit = `min(${SCALE_H / maxH}px, (100% - ${GAP * (sized.length - 1)}px) / ${sumW})`;

  return (
    <div className="atc">
      <fieldset className="sizes">
        <legend className="mono">select size</legend>
        {product.variants.map((v) => (
          <label key={v.id} className={`size ${v.id === selected ? "is-selected" : ""} ${v.inStock === false ? "is-out" : ""}`}>
            <input
              type="radio"
              name="size"
              value={v.id}
              checked={v.id === selected}
              onChange={() => setSelected(v.id)}
            />
            <span className="size__label">{v.label}</span>
            {v.widthCm && (
              <span className="size__dim mono">
                {v.widthCm} × {v.heightCm} cm
              </span>
            )}
            {site.sellingEnabled && (
              <span className="size__price">{v.inStock === false ? "sold out" : formatPrice(v.price)}</span>
            )}
          </label>
        ))}
      </fieldset>

      {sized.length > 1 && (
        <div className="scale" aria-hidden="true">
          <div className="scale__row">
            {sized.map((v) => (
              <div
                key={v.id}
                className={`scale__sheet ${v.id === selected ? "is-selected" : ""}`}
                style={{ width: `calc(${unit} * ${v.widthCm})`, aspectRatio: `${v.widthCm} / ${v.heightCm}` }}
              >
                <span>{v.label}</span>
              </div>
            ))}
          </div>
          <span className="mono muted small">sizes shown to scale</span>
        </div>
      )}

      {site.sellingEnabled ? (
        <button className="btn btn--blue btn--full btn--lg" disabled={soldOut} onClick={() => add(variant.id)}>
          {soldOut ? "sold out" : <>add to bag — {formatPrice(variant.price)}</>}
        </button>
      ) : (
        <div className="atc__enquire">
          <a className="btn btn--blue btn--full btn--lg" href={enquiry(product, variant).mailto}>
            send us an email — {variant.label}
          </a>
          <a className="mono small" href={enquiry(product, variant).gmail} target="_blank" rel="noopener noreferrer">
            or open in gmail ↗
          </a>
          <p className="mono muted small">
            opens your email with the print and size filled in — add your message and send. no email app? write to{" "}
            <a href={`mailto:${site.enquiryEmail}`}>{site.enquiryEmail}</a>
          </p>
        </div>
      )}
    </div>
  );
}
