"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";
import { useCart } from "./CartProvider";
import { site } from "@/content/site";

const nav = [
  { href: "/shop", label: "shop" },
  { href: "/gallery", label: "gallery" },
  { href: "/about", label: "about" },
];

export function Header() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer: lock scroll, Esc to close, move focus in and back out.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Focus the close button once the panel has slid in. preventScroll stops the
    // browser from scrolling the (still off-screen) drawer sideways to reveal it.
    const focusTimer = setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 650);
    const btn = menuBtnRef.current;
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      btn?.focus({ preventScroll: true });
    };
  }, [menu]);

  return (
    <>
      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header__inner">
          <Wordmark withAttribution />
          <nav className="header__nav" aria-label="Main">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`nav-link ${pathname.startsWith(n.href) ? "is-active" : ""}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header__actions">
            <button className="bag-btn" onClick={() => setOpen(true)} aria-label={`Open bag, ${count} items`}>
              bag <span className="bag-btn__count">{count}</span>
            </button>
            <button
              ref={menuBtnRef}
              className="menu-btn"
              aria-expanded={menu}
              aria-controls="mobile-menu"
              onClick={() => setMenu(true)}
            >
              menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: red, blue and black sheets stack in from the right,
          then the links slide in from alternating sides. Reverses on close. */}
      <div
        id="mobile-menu"
        className={`mmenu ${menu ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!menu}
      >
        <span className="mmenu__sheet mmenu__sheet--red" aria-hidden="true" />
        <span className="mmenu__sheet mmenu__sheet--blue" aria-hidden="true" />
        <div className="mmenu__panel">
        <div className="mmenu__top">
          <div onClick={() => setMenu(false)}>
            <Wordmark withAttribution />
          </div>
          <button ref={closeRef} className="mmenu__close" onClick={() => setMenu(false)}>
            close <span aria-hidden="true">×</span>
          </button>
        </div>

        <nav className="mmenu__nav" aria-label="Mobile">
          {nav.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              className={`mmenu__link ${i % 2 ? "mmenu__link--right" : "mmenu__link--left"} ${pathname.startsWith(n.href) ? "is-active" : ""}`}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => setMenu(false)}
            >
              <span className="mmenu__num">0{i + 1}</span>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="mmenu__foot">
          <button
            className="mmenu__bag"
            onClick={() => {
              setMenu(false);
              setOpen(true);
            }}
          >
            bag ({count})
          </button>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
            instagram ↗
          </a>
          <Link href="/info/shipping-returns" onClick={() => setMenu(false)}>
            shipping & returns
          </Link>
        </div>
        </div>
      </div>
    </>
  );
}
