import Link from "next/link";
import { artworks } from "@/content/artworks";
import { about, home, site } from "@/content/site";
import { featuredProducts, upcomingCategories } from "@/lib/catalog";
import { ArtImage } from "@/components/ArtImage";
import { ProductCard } from "@/components/ProductCard";
import { Marquee } from "@/components/Marquee";
import { Instagram } from "@/components/Instagram";
import { Expandable } from "@/components/Viewer";

export default function Home() {
  const hero = artworks.find((a) => a.slug === home.hero) ?? artworks[0];
  const second = artworks.find((a) => a.slug === home.side) ?? artworks[1] ?? artworks[0];
  const selected = artworks.slice(0, 4);
  const featured = featuredProducts().slice(0, 3);

  return (
    <>
      {/* ── HERO: oversized artwork, offset second piece, giant type ── */}
      <section className="hero">
        <h1 className="hero__title">
          <span className="hero__line">bodies,</span>
          <span className="hero__line hero__line--indent">hands &</span>
          <span className="hero__line">loud colour<span className="red">.</span></span>
        </h1>
        <figure className="hero__main">
          <Expandable artworks={artworks} index={artworks.indexOf(hero)}>
            <ArtImage img={hero.image} priority sizes="(max-width: 900px) 100vw, 58vw" placeholderRatio="4 / 5" />
          </Expandable>
          <figcaption className="caption">
            <span className="mono muted">fig. 01</span>
            <em>{hero.title}</em>
            {hero.year && <>, {hero.year}</>}
          </figcaption>
        </figure>
        <figure className="hero__side">
          <Expandable artworks={artworks} index={artworks.indexOf(second)}>
            <ArtImage img={second.image} sizes="(max-width: 900px) 60vw, 24vw" placeholderRatio="3 / 4" />
          </Expandable>
          <figcaption className="caption">
            <span className="mono muted">fig. 02</span>
            <em>{second.title}</em>
          </figcaption>
        </figure>
        <div className="hero__intro">
          <p className="lede">{site.tagline}</p>
          <div className="hero__ctas">
            <Link href="/shop" className="btn btn--blue">shop prints</Link>
            <Link href="/gallery" className="btn btn--ghost">view the paintings</Link>
          </div>
        </div>
      </section>

      <Marquee items={["art prints", "original paintings", "art by Deniz Itak", "objects — soon"]} />

      {/* ── SELECTED PAINTINGS: asymmetric editorial grid ── */}
      <section className="section">
        <div className="section__head">
          <span className="mono">01 / selected paintings</span>
          <Link href="/gallery" className="arrow-link">the full gallery →</Link>
        </div>
        <div className="selected">
          {selected.map((a, i) => (
            <div key={a.slug} className={`selected__item selected__item--${i}`}>
              <Expandable artworks={artworks} index={artworks.indexOf(a)}>
                <ArtImage img={a.image} sizes="(max-width: 700px) 100vw, 40vw" placeholderRatio={i % 2 ? "1 / 1" : "4 / 5"} />
              </Expandable>
              <p className="caption">
                <em>{a.title}</em>
                {a.year && <>, {a.year}</>}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SHOP PRINTS: the prominent commercial block ── */}
      <section className="shopblock">
        <div className="shopblock__head">
          <span className="mono">02 / the print shop</span>
          <h2 className="shopblock__title">
            shop
            <br />
            prints
          </h2>
          <p className="shopblock__copy">
            Fine art reproductions of the original paintings, printed to order in several sizes.
          </p>
          <Link href="/shop" className="btn btn--paper">enter the shop →</Link>
        </div>
        <div className="shopblock__grid">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* ── THE ARTIST ── */}
      <section className="section artist-teaser">
        <div className="artist-teaser__img">
          <ArtImage img={about.portrait} sizes="(max-width: 700px) 100vw, 40vw" placeholderRatio="3 / 4" />
        </div>
        <div className="artist-teaser__text">
          <span className="mono">03 / the artist</span>
          <h2 className="display-xl">
            hello,
            <br />
            i&rsquo;m Deniz<span className="blue">.</span>
          </h2>
          <p className="lede">{about.intro}</p>
          <Link href="/about" className="arrow-link">read the story →</Link>
        </div>
      </section>

      {/* ── FUTURE OBJECTS ── */}
      {upcomingCategories().length > 0 && (
        <section className="soon">
          <span className="mono">coming to the dexine universe</span>
          <ul className="soon__list">
            {upcomingCategories().map((c) => (
              <li key={c.slug}>{c.name}</li>
            ))}
          </ul>
        </section>
      )}

      <Instagram />
    </>
  );
}
