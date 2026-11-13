import type { Metadata } from "next";
import Link from "next/link";
import { ClearCart } from "./ClearCart";

export const metadata: Metadata = { title: "thank you", robots: { index: false } };

export default function Success() {
  return (
    <div className="status-page">
      <ClearCart />
      <h1 className="display-xxl">thank you<span className="red">.</span></h1>
      <p className="lede">Your order is confirmed. A receipt is on its way to your inbox, and your print goes into production.</p>
      <Link href="/gallery" className="btn btn--blue">keep looking →</Link>
    </div>
  );
}
