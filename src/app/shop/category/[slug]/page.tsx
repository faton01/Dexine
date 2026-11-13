import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { activeCategories, getCategory, productsInCategory } from "@/lib/catalog";
import { ShopListing } from "@/components/ShopListing";

type Props = { params: Promise<{ slug: string }> };

// Only active categories get pages. Activate one in content/categories.ts.
export const dynamicParams = false;
export const generateStaticParams = () => activeCategories().map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCategory((await params).slug);
  if (!c) return {};
  return { title: c.name, description: c.blurb, alternates: { canonical: `/shop/category/${c.slug}` } };
}

export default async function CategoryPage({ params }: Props) {
  const c = getCategory((await params).slug);
  if (!c || !c.active) notFound();
  return <ShopListing title={c.name} intro={c.blurb} products={productsInCategory(c.slug)} current={`category:${c.slug}`} />;
}
