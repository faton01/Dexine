import type { Metadata } from "next";
import { shippingInfo, site } from "@/content/site";
import { formatPrice } from "@/lib/catalog";

export const metadata: Metadata = { title: "shipping & returns", alternates: { canonical: "/info/shipping-returns" } };

export default function ShippingPage() {
  return (
    <div className="info">
      <h1 className="display-xxl">shipping & returns</h1>
      <div className="info__grid">
        {shippingInfo.sections.map((s, i) => (
          <section key={s.title}>
            <span className="mono muted">0{i + 1}</span>
            <h2 className="display-m">{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
        <section>
          <span className="mono muted">0{shippingInfo.sections.length + 1}</span>
          <h2 className="display-m">rates</h2>
          <ul className="details-list">
            {site.shippingRates.map((r) => (
              <li key={r.name}>
                {r.name} — {formatPrice(r.amount)} ({r.minDays}–{r.maxDays} working days)
              </li>
            ))}
          </ul>
        </section>
      </div>
      <p className="mono muted">questions? <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></p>
    </div>
  );
}
