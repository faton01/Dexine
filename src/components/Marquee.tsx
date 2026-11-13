/** A slow running ribbon. Pauses on hover; static for reduced-motion users. */
export function Marquee({ items, tone = "blue" }: { items: string[]; tone?: "blue" | "red" | "black" }) {
  const run = [...items, ...items, ...items, ...items];
  return (
    <div className={`marquee marquee--${tone}`} aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((k) => (
          <span key={k} className="marquee__group">
            {run.map((t, i) => (
              <span key={i} className="marquee__item">
                {t}
                <span className="marquee__sep">●</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
