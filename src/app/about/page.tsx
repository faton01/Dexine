import type { Metadata } from "next";
import Link from "next/link";
import { about, site } from "@/content/site";
import { artworks } from "@/content/artworks";
import { ArtImage } from "@/components/ArtImage";

export const metadata: Metadata = {
  title: "about Deniz Itak",
  description: `About Deniz Itak, the artist behind dexine.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const details = artworks.slice(0, 3);
  const studio = about.studio.filter((img) => img.src);
  return (
    <div className="about">
      <section className="about__open">
        <span className="mono">the artist</span>
        <h1 className="about__name">
          Deniz
          <br />
          <span className="about__name-2">Itak</span>
        </h1>
        <figure className="about__portrait">
          <ArtImage img={about.portrait} priority sizes="(max-width: 900px) 100vw, 45vw" placeholderRatio="3 / 4" />
        </figure>
        <p className="about__intro lede">{about.intro}</p>
      </section>

      <section className="about__body">
        <dl className="about__facts">
          {about.facts.map((f) => (
            <div key={f.label}>
              <dt className="mono muted">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="about__bio">
          {about.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="about__pair">
        <figure className="about__pair-img">
          <ArtImage img={about.withPaintings} sizes="(max-width: 800px) 100vw, 42vw" placeholderRatio="9 / 16" />
          <figcaption className="caption">
            <span className="mono muted">in the studio</span>
            {site.artist}
          </figcaption>
        </figure>
        <blockquote className="about__quote">
          <p>&ldquo;{about.quote}&rdquo;</p>
          <footer className="mono">— {site.artist}</footer>
        </blockquote>
      </section>

      {studio.length > 0 && (
        <section className="about__studio">
          {studio.map((img, i) => (
            <figure key={i} className={`about__studio-${i % 2}`}>
              <ArtImage img={img} sizes="(max-width: 700px) 100vw, 50vw" />
            </figure>
          ))}
        </section>
      )}

      <section className="section">
        <div className="section__head">
          <span className="mono">the work</span>
          <Link href="/gallery" className="arrow-link">gallery →</Link>
        </div>
        <div className="about__details">
          {details.map((a) => (
            <figure key={a.slug}>
              <ArtImage img={a.image} sizes="(max-width: 700px) 100vw, 33vw" placeholderRatio="1 / 1" />
              <figcaption className="caption"><em>{a.title}</em></figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
