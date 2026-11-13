"use client";

import { useEffect, useRef, useState } from "react";

/**
 * First-visit intro: the dexine wordmark and "art by Deniz Itak" fade in on
 * the paper, the red dot lands on the i, then the overlay fades and the site
 * eases in underneath.
 *
 * Whether it plays is decided BEFORE first paint by the inline script in
 * layout.tsx (it sets <html data-intro>), so returning visitors never see
 * a flash. Add ?intro to any URL to replay it.
 * Skippable with any click or key. Never shown with prefers-reduced-motion.
 */

export const INTRO_KEY = "dexine-intro-v1";

/** Runs in <head> before paint. Kept tiny and dependency-free. */
export const introBootScript = `try{var s=location.search.indexOf('intro')>-1;if((s||!localStorage.getItem('${INTRO_KEY}'))&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.setAttribute('data-intro','')}catch(e){}`;

const PLAY_MS = 2200; // time before the exit starts
const EXIT_MS = 1650; // must cover the exit animations in globals.css (overlay fade + site ease-in)

export function Intro() {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-intro")) {
      setDone(true);
      return;
    }
    try {
      localStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* storage blocked — intro may replay next time, which is harmless */
    }

    // ── exit ──
    let finish: ReturnType<typeof setTimeout>;
    const leave = () => {
      if (started.current) return;
      started.current = true;
      setLeaving(true);
      root.classList.add("intro-out"); // eases the site in underneath the fading overlay
      finish = setTimeout(() => {
        root.removeAttribute("data-intro");
        root.classList.remove("intro-out");
        setDone(true);
      }, EXIT_MS);
    };
    const auto = setTimeout(leave, PLAY_MS);
    window.addEventListener("keydown", leave);
    window.addEventListener("pointerdown", leave);
    return () => {
      clearTimeout(auto);
      clearTimeout(finish);
      window.removeEventListener("keydown", leave);
      window.removeEventListener("pointerdown", leave);
    };
  }, []);

  if (done) return null;

  return (
    <div className={`intro ${leaving ? "is-leaving" : ""}`} aria-hidden="true">
      <div className="intro__mark">
        <span>
          dex<span className="intro__i">ı<span className="intro__dot" /></span>ne
        </span>
        <small className="intro__by">art by Deniz Itak</small>
      </div>
    </div>
  );
}
