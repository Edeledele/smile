"use client";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useCart } from "./CartContext";

export default function Store({ photos }) {
  const tabs = ["All", ...new Set(photos.map(p => p.category))];
  const [tab, setTab] = useState("All");
  const { cart, setCart } = useCart();
  const [zoomed, setZoomed] = useState(null);
  const shown = useMemo(() => tab === "All" ? photos : photos.filter(p => p.category === tab), [tab, photos]);
  const add = p => setCart(c => c.find(x => x.id === p.id) ? c : [...c, p]);
  const hero = photos.slice(0, 3);

  // Next / Previous navigation (moves through the currently shown photos)
  const zoomIndex = zoomed ? shown.findIndex(p => p.id === zoomed.id) : -1;
  const next = () => setZoomed(shown[(zoomIndex + 1) % shown.length]);
  const prev = () => setZoomed(shown[(zoomIndex - 1 + shown.length) % shown.length]);

  // Keyboard support: arrows to navigate, Escape to close
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setZoomed(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (<>
    <main id="top">
      <section className="hero">
        <div className="copy">
          <h1>Photos that make you smile</h1>
          <p>Hand-picked prints of people, places and good moments. Pick one, hang it up, feel better every time you walk past.</p>
          <a className="btn" href="#shop">Shop prints</a>
        </div>
        <div className="collage">
          {hero.map((p, i) => (
            <Image key={p.id} className={`c${i}`} src={p.thumb} alt={p.alt} width={400} height={Math.round(400 * p.h / p.w)} priority sizes="25vw" />
          ))}
        </div>
      </section>

      <section id="shop" className="shop">
        <div className="tabs" role="tablist">
          {tabs.map(t => <button key={t} role="tab" aria-selected={t === tab} onClick={() => setTab(t)}>{t}</button>)}
        </div>
        <div className="grid">
          {shown.map(p => (
            <figure key={p.id} style={{ background: p.color }}>
              <Image src={p.thumb} alt={p.alt} width={400} height={Math.round(400 * p.h / p.w)} sizes="(max-width:700px) 50vw, 20vw" onClick={() => setZoomed(p)} style={{ cursor: "zoom-in" }} />
              <figcaption>
                <span>by {p.by}<b>Br {p.price}</b></span>
                <button onClick={() => add(p)} aria-label={`Add print by ${p.by} to cart`}>{cart.find(x => x.id === p.id) ? "Added" : "Add"}</button>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>

    {zoomed && (
      <div className="zoom-modal" onClick={() => setZoomed(null)}>
        <button className="close-zoom" onClick={(e) => { e.stopPropagation(); setZoomed(null); }}>Close</button>

        <button className="nav-zoom prev" aria-label="Previous photo"
          onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>

        <div className="zoom-img-wrapper">
          <Image key={zoomed.id} src={zoomed.thumb} alt={zoomed.alt} width={1200}
            height={Math.round(1200 * zoomed.h / zoomed.w)} className="zoomed-img" sizes="90vw" />
        </div>

        <button className="nav-zoom next" aria-label="Next photo"
          onClick={(e) => { e.stopPropagation(); next(); }}>›</button>
      </div>
    )}
  </>);
}