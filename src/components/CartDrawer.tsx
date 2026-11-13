"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { findVariant, formatPrice } from "@/lib/catalog";
import { ArtImage } from "./ArtImage";

export function CartDrawer() {
  const { lines, open, setOpen, setQty, remove } = useCart();
  const [status, setStatus] = useState<{ busy: boolean; error?: string }>({ busy: false });
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  const rows = lines
    .map((l) => ({ line: l, found: findVariant(l.variantId) }))
    .filter((r): r is { line: typeof r.line; found: NonNullable<typeof r.found> } => !!r.found);
  const subtotal = rows.reduce((s, r) => s + r.found.variant.price * r.line.qty, 0);

  async function checkout() {
    setStatus({ busy: true });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed.");
      window.location.href = data.url;
    } catch (e) {
      setStatus({ busy: false, error: (e as Error).message });
    }
  }

  return (
    <div className={`drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="drawer__scrim" aria-label="Close cart" tabIndex={-1} onClick={() => setOpen(false)} />
      <div className="drawer__panel" role="dialog" aria-modal="true" aria-label="Cart" tabIndex={-1} ref={panelRef}>
        <div className="drawer__head">
          <span className="mono">your bag ({rows.reduce((n, r) => n + r.line.qty, 0)})</span>
          <button className="link-btn mono" onClick={() => setOpen(false)}>
            close ×
          </button>
        </div>

        {rows.length === 0 ? (
          <div className="drawer__empty">
            <p className="display-m">nothing here yet.</p>
            <Link href="/shop" className="btn btn--blue" onClick={() => setOpen(false)}>
              shop prints
            </Link>
          </div>
        ) : (
          <>
            <ul className="drawer__lines">
              {rows.map(({ line, found: { product, variant } }) => (
                <li key={line.variantId} className="cart-line">
                  <Link href={`/shop/${product.slug}`} className="cart-line__img" onClick={() => setOpen(false)}>
                    <ArtImage img={product.images[0]} sizes="96px" />
                  </Link>
                  <div className="cart-line__info">
                    <Link href={`/shop/${product.slug}`} onClick={() => setOpen(false)}>
                      {product.title}
                    </Link>
                    <span className="mono muted">{variant.label}</span>
                    <div className="qty">
                      <button aria-label="Decrease quantity" onClick={() => setQty(line.variantId, line.qty - 1)}>
                        −
                      </button>
                      <span aria-live="polite">{line.qty}</span>
                      <button aria-label="Increase quantity" onClick={() => setQty(line.variantId, line.qty + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-line__end">
                    <span>{formatPrice(variant.price * line.qty)}</span>
                    <button className="link-btn mono muted" onClick={() => remove(line.variantId)}>
                      remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="drawer__foot">
              <div className="drawer__total">
                <span>subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="mono muted small">shipping & taxes calculated at checkout.</p>
              <button className="btn btn--red btn--full" onClick={checkout} disabled={status.busy}>
                {status.busy ? "redirecting…" : "checkout"}
              </button>
              {status.error && (
                <p className="form-error" role="alert">
                  {status.error}
                </p>
              )}
              <Link href="/info/shipping-returns" className="mono small muted" onClick={() => setOpen(false)}>
                shipping & returns →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
