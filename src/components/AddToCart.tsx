"use client";

import { useState } from "react";
import type { Product } from "@/content/types";
import { formatPrice } from "@/lib/catalog";
import { useCart } from "./CartProvider";

/** Size picker + add to cart. Includes a to-scale size comparison for prints. */
export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const firstAvailable = product.variants.find((v) => v.inStock !== false) ?? product.variants[0];
  const [selected, setSelected] = useState(firstAvailable.id);
  const variant = product.variants.find((v) => v.id === selected)!;
  const soldOut = variant.inStock === false;
  const sized = product.variants.filter((v) => v.widthCm && v.heightCm);
  const maxH = Math.max(...sized.map((v) => v.heightCm!), 1);

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
            <span className="size__price">{v.inStock === false ? "sold out" : formatPrice(v.price)}</span>
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
                style={{ height: `${(v.heightCm! / maxH) * 100}%`, aspectRatio: `${v.widthCm} / ${v.heightCm}` }}
              >
                <span>{v.label}</span>
              </div>
            ))}
          </div>
          <span className="mono muted small">sizes shown to scale</span>
        </div>
      )}

      <button className="btn btn--blue btn--full btn--lg" disabled={soldOut} onClick={() => add(variant.id)}>
        {soldOut ? "sold out" : <>add to bag — {formatPrice(variant.price)}</>}
      </button>
    </div>
  );
}
