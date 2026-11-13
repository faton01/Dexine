import type { Artwork } from "@/content/types";
import { ArtImage } from "./ArtImage";
import { Expandable } from "./Viewer";

const ratio: Record<NonNullable<Artwork["size"]>, string> = { l: "4 / 5", m: "3 / 4", s: "1 / 1" };

/** Asymmetric exhibition grid. Each painting opens in the shared full-screen viewer. */
export function Gallery({ artworks }: { artworks: Artwork[] }) {
  return (
    <ol className="exhibit">
      {artworks.map((a, i) => (
        <li key={a.slug} className={`exhibit__item exhibit__item--${a.size ?? "m"}`}>
          <Expandable artworks={artworks} index={i} className="exhibit__btn">
            <ArtImage img={a.image} sizes="(max-width: 700px) 100vw, 50vw" placeholderRatio={ratio[a.size ?? "m"]} />
          </Expandable>
          <p className="caption">
            <span className="mono muted">{String(i + 1).padStart(2, "0")}</span>
            <em>{a.title}</em>
            {a.year && <span>, {a.year}</span>}
          </p>
        </li>
      ))}
    </ol>
  );
}
