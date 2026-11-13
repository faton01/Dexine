import Image from "next/image";
import type { Img } from "@/content/types";

const kindLabel: Record<Img["kind"], string> = {
  artwork: "artwork image",
  detail: "close-up detail",
  framed: "framed mockup",
  interior: "interior mockup",
  studio: "studio photograph",
  portrait: "portrait",
};

/**
 * Renders an artwork at its ORIGINAL proportions — never cropped
 * (object-fit: contain, intrinsic width/height). When no file has been
 * supplied yet, renders a labelled empty slot instead of a fake image.
 */
export function ArtImage({
  img,
  sizes = "100vw",
  priority = false,
  placeholderRatio = "4 / 5",
  className = "",
}: {
  img: Img;
  sizes?: string;
  priority?: boolean;
  /** Aspect ratio for the empty slot only. Real images use their own. */
  placeholderRatio?: string;
  className?: string;
}) {
  if (img.src && img.width && img.height) {
    return (
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        sizes={sizes}
        priority={priority}
        quality={90}
        className={`art-img ${className}`}
      />
    );
  }
  return (
    <div
      className={`art-slot ${className}`}
      style={{ aspectRatio: placeholderRatio }}
      role="img"
      aria-label={`${img.alt} (image not yet supplied)`}
    >
      <span className="art-slot__label">
        [ {kindLabel[img.kind]} ]
        <small>{img.alt}</small>
      </span>
    </div>
  );
}
