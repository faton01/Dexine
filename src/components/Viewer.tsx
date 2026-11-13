"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Artwork } from "@/content/types";
import { ArtImage } from "./ArtImage";

/**
 * Full-screen artwork viewer, shared by every page.
 * Wrap any artwork in <Expandable artworks={list} index={i}> to make it
 * open here. Keyboard: ← → to step through the list, Esc to close.
 */

const ratio: Record<NonNullable<Artwork["size"]>, string> = { l: "4 / 5", m: "3 / 4", s: "1 / 1" };

type Open = (list: Artwork[], index: number) => void;
const Ctx = createContext<Open | null>(null);

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ list: Artwork[]; index: number } | null>(null);
  const open = useCallback<Open>((list, index) => setState({ list, index }), []);
  const close = useCallback(() => setState(null), []);
  const step = useCallback(
    (d: number) => setState((s) => (s ? { ...s, index: (s.index + d + s.list.length) % s.list.length } : s)),
    [],
  );

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [state, close, step]);

  const current = state ? state.list[state.index] : null;
  const many = (state?.list.length ?? 0) > 1;

  return (
    <Ctx.Provider value={open}>
      {children}
      {current && (
        <div className="viewer" role="dialog" aria-modal="true" aria-label={current.title}>
          <button className="viewer__close mono" onClick={close} autoFocus>
            close ×
          </button>
          <div className="viewer__stage" onClick={close}>
            <div onClick={(e) => e.stopPropagation()} className="viewer__img">
              <ArtImage img={current.image} sizes="100vw" placeholderRatio={ratio[current.size ?? "m"]} />
            </div>
          </div>
          <div className="viewer__bar">
            {many ? (
              <button className="mono" onClick={() => step(-1)} aria-label="Previous artwork">
                ← prev
              </button>
            ) : (
              <span />
            )}
            <p className="viewer__caption">
              <em>{current.title}</em>
              <span className="mono">
                {[current.year, current.medium, current.dimensions].filter(Boolean).join(" — ")}
              </span>
              {current.printSlug && (
                <Link href={`/shop/${current.printSlug}`} className="mono viewer__print" onClick={close}>
                  available as a print →
                </Link>
              )}
            </p>
            {many ? (
              <button className="mono" onClick={() => step(1)} aria-label="Next artwork">
                next →
              </button>
            ) : (
              <span />
            )}
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

/** Makes its children open the given artwork full screen when clicked. */
export function Expandable({
  artworks,
  index,
  className = "",
  children,
}: {
  artworks: Artwork[];
  index: number;
  className?: string;
  children: React.ReactNode;
}) {
  const open = useContext(Ctx);
  if (!open) throw new Error("Expandable must be used inside ViewerProvider");
  return (
    <button
      type="button"
      className={`expandable ${className}`}
      onClick={() => open(artworks, index)}
      aria-label={`View ${artworks[index].title} full screen`}
    >
      {children}
    </button>
  );
}
