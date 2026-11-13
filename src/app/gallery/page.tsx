import type { Metadata } from "next";
import { artworks } from "@/content/artworks";
import { Gallery } from "@/components/Gallery";

export const metadata: Metadata = {
  title: "gallery — original paintings",
  description: "Original paintings by Deniz Itak.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <div className="gallery-page">
      <header className="gallery-page__head">
        <span className="mono">the paintings</span>
        <h1 className="display-xxl">
          gallery<span className="blue">.</span>
        </h1>
        <p className="mono muted">{artworks.length} works — click any painting to view it full screen</p>
      </header>
      <Gallery artworks={artworks} />
    </div>
  );
}
