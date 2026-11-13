import type { Metadata } from "next";
import { liveProducts } from "@/lib/catalog";
import { ShopListing } from "@/components/ShopListing";

export const metadata: Metadata = {
  title: "shop art prints",
  description: "Fine art prints of original paintings by Deniz Itak, available in several sizes.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <ShopListing
      title="shop"
      intro="Fine art reproductions of original paintings by Deniz Itak. Choose your size on each print."
      products={liveProducts()}
      current="all"
    />
  );
}
