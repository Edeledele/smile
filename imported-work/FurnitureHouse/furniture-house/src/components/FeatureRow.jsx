import React from "react";

const LABELS = ["Modern Furniture", "Decor Accents", "Inspired Living"];

export default function FeatureRow({ products, onShop }) {
  if (!products.length) return null;

  return (
    <div className="wrap">
      <div className="feature-row">
        {products.slice(0, 3).map((p, i) => {
          const img = (p.images && p.images[0]) || p.thumbnail;
          return (
            <div className="feature-card" key={p.id}>
              <img src={img} alt={p.title} />
              <div>
                <h3>{LABELS[i]}</h3>
                <p>{p.title}</p>
                <button className="link" onClick={() => onShop(p)}>
                  Shop Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}