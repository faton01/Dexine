import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "checkout cancelled", robots: { index: false } };

export default function Cancel() {
  return (
    <div className="status-page">
      <h1 className="display-xxl">no worries.</h1>
      <p className="lede">Checkout was cancelled and nothing was charged. Your bag is still here.</p>
      <Link href="/shop" className="btn btn--blue">back to the shop</Link>
    </div>
  );
}
