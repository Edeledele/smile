import React from "react";

export default function Hero({ heroProduct }) {
  const img = heroProduct
    ? (heroProduct.images && heroProduct.images[0]) || heroProduct.thumbnail
    : "";

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>Design Your Dream Living Space</h1>
            <p>
              Furniture and decor sourced from makers who care about material,
              form, and how a room feels to live in.
            </p>
            <a href="#collections" className="btn-primary">
              Explore Collections
            </a>
          </div>
          <div className="hero-media">
            {img && <img src={img} alt={heroProduct.title} />}
          </div>
        </div>
      </div>
    </section>
  );
}