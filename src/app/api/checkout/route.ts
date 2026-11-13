import { NextResponse } from "next/server";
import Stripe from "stripe";
import { findVariant } from "@/lib/catalog";
import { site } from "@/content/site";

/**
 * Creates a Stripe Checkout Session.
 * Prices are ALWAYS taken from the server-side catalogue — the client
 * only sends variant ids + quantities, so prices can't be tampered with.
 */
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Checkout isn't switched on yet — the shop owner needs to connect Stripe." },
      { status: 503 },
    );
  }

  let body: { lines?: { variantId: string; qty: number }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const lines = (body.lines ?? []).filter((l) => typeof l.variantId === "string" && Number.isInteger(l.qty));
  if (!lines.length) return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });

  const items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const line of lines) {
    const found = findVariant(line.variantId);
    if (!found) return NextResponse.json({ error: "An item in your bag is no longer available." }, { status: 400 });
    if (found.variant.inStock === false)
      return NextResponse.json({ error: `${found.product.title} (${found.variant.label}) is sold out.` }, { status: 400 });
    const qty = Math.min(10, Math.max(1, line.qty));
    const img = found.product.images[0]?.src;
    items.push({
      quantity: qty,
      price_data: {
        currency: site.currency.toLowerCase(),
        unit_amount: found.variant.price,
        product_data: {
          name: `${found.product.title} — ${found.variant.label}`,
          images: img ? [new URL(img, site.url).toString()] : undefined,
          metadata: { product: found.product.slug, variant: found.variant.id },
        },
      },
    });
  }

  const stripe = new Stripe(key);
  const origin = req.headers.get("origin") ?? site.url;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items,
      shipping_address_collection: {
        allowed_countries: [...site.shippingCountries] as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
      },
      shipping_options: site.shippingRates.map((r) => ({
        shipping_rate_data: {
          type: "fixed_amount",
          display_name: r.name,
          fixed_amount: { amount: r.amount, currency: site.currency.toLowerCase() },
          delivery_estimate: {
            minimum: { unit: "business_day", value: r.minDays },
            maximum: { unit: "business_day", value: r.maxDays },
          },
        },
      })),
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("stripe checkout error", e);
    return NextResponse.json({ error: "Couldn't start checkout. Please try again." }, { status: 502 });
  }
}
