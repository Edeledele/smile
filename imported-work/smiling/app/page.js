import Store from "./Store";
const CATEGORIES = { Portraits: "happy portrait", Nature: "sunny landscape", Travel: "travel street" };

// Works with no key (Picsum). Add PEXELS_API_KEY in .env.local to get real, searchable photos.
function fallback() {
  const heights = [600, 520, 680, 560, 640, 500];
  return Object.keys(CATEGORIES).flatMap((category, c) =>
    Array.from({ length: 8 }, (_, i) => {
      const id = c * 100 + i + 1, h = heights[(c + i) % 6];
      return {
        id, category, alt: "Photograph", by: "Smiling Studio", w: 400, h, color: "#cfe8f7",
        thumb: `https://picsum.photos/seed/smiling${id}/400/${h}`, price: 200 + (id % 9) * 100
      };
    }));
}

async function load(query) {
  const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=10&orientation=portrait`,
    { headers: { Authorization: process.env.PEXELS_API_KEY }, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Pexels ${res.status}`);
  return (await res.json()).photos;
}

async function fromPexels() {
  const entries = await Promise.all(Object.entries(CATEGORIES).map(async ([name, q]) => [name, await load(q)]));
  const seen = new Set();
  return entries.flatMap(([category, list]) => list.map(p => ({ ...p, category })))
    .filter(p => !seen.has(p.id) && seen.add(p.id))
    .map(p => ({
      id: p.id, category: p.category, alt: p.alt || "Photograph", by: p.photographer, w: p.width, h: p.height,
      color: p.avg_color, thumb: p.src.large, price: 200 + (p.id % 9) * 100
    }));
}

export default async function Page() {
  let photos;
  try { photos = process.env.PEXELS_API_KEY ? await fromPexels() : fallback(); }
  catch { photos = fallback(); }
  return <Store photos={photos} />;
}
