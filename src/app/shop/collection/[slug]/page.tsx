import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollection, liveCollections, productsInCollection } from "@/lib/catalog";
import { ShopListing } from "@/components/ShopListing";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => liveCollections().map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCollection((await params).slug);
  if (!c) return {};
  return { title: `${c.name} — collection`, alternates: { canonical: `/shop/collection/${c.slug}` } };
}

export default async function CollectionPage({ params }: Props) {
  const c = getCollection((await params).slug);
  if (!c) notFound();
  return (
    <ShopListing title={c.name} intro={c.description} products={productsInCollection(c.slug)} current={`collection:${c.slug}`} />
  );
}
