import Link from "next/link";

/**
 * The dexine wordmark. Lowercase, wide grotesque. The playful detail:
 * the tittle on the "i" is a red square that tilts on hover.
 * Uses a dotless ı (U+0131) so the red dot replaces the real one.
 */
export function Wordmark({
  size = "md",
  withAttribution = false,
  href = "/",
}: {
  size?: "md" | "xl";
  withAttribution?: boolean;
  href?: string | null;
}) {
  const mark = (
    <span className={`wordmark wordmark--${size}`} aria-label="dexine">
      <span aria-hidden="true">
        dex<span className="wordmark__i">ı<span className="wordmark__dot" /></span>ne
      </span>
      {withAttribution && <span className="wordmark__by">art by Deniz Itak</span>}
    </span>
  );
  return href ? (
    <Link href={href} className="wordmark-link" aria-label="dexine — home">
      {mark}
    </Link>
  ) : (
    mark
  );
}
