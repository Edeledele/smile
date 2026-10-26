import React from "react";
import { money } from "../constants.js";

export default function ProductCard({ product, onOpen, onAdd }) {
  const img = (product.images && product.images[0]) || product.thumbnail;

  return (
    <div className="prod-card" onClick={() => onOpen(product)}>
      <div className="prod-thumb">
        <img src={img} alt={product.title} loading="lazy" />
      </div>
      <div className="prod-body">
        <span className="prod-cat">{product.brand || product.category}</span>
        <h3 className="prod-title">{product.title}</h3>
        <p className="prod-desc">
          {product.description.length > 80
            ? product.description.slice(0, 80) + "…"
            : product.description}
        </p>
        <div className="prod-foot">
          <span className="prod-price">{money(product.price)}</span>
        </div>
        <button
          className="view-btn"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}