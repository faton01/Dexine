import Image from "next/image";
import { site } from "@/content/site";

interface IgMedia {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
}

/**
 * Live feed via the Instagram API (with Instagram Login), when
 * INSTAGRAM_ACCESS_TOKEN is set. Cached for an hour. Without a token
 * (or if the API fails) nothing is faked — we show a profile link only.
 */
async function getFeed(): Promise<IgMedia[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];
  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&limit=6&access_token=${token}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: IgMedia[] };
    return json.data ?? [];
  } catch {
    return [];
  }
}

export async function Instagram() {
  const feed = await getFeed();
  return (
    <section className="ig section">
      <div className="ig__head">
        <span className="mono">on instagram</span>
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="ig__handle display-l">
          @{site.instagram.handle}
          <span className="ig__arrow">↗</span>
        </a>
      </div>
      {feed.length > 0 && (
        <ul className="ig__grid">
          {feed.map((m) => (
            <li key={m.id}>
              <a href={m.permalink} target="_blank" rel="noopener noreferrer">
                <Image
                  src={m.media_type === "VIDEO" ? (m.thumbnail_url ?? m.media_url) : m.media_url}
                  alt={m.caption?.slice(0, 120) ?? "Instagram post by dexine"}
                  width={600}
                  height={600}
                  sizes="(max-width: 700px) 50vw, 16vw"
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
