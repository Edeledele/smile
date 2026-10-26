import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { money } from "../constants.js";

export default function ProductModal({ product, onClose, onAdd }) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    setImgIndex(0);
  }, [product]);

  if (!product) return null;

  const images =
    product.images && product.images.length ? product.images : [product.thumbnail];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-media">
          <img src={images[imgIndex]} alt={product.title} />
          {images.length > 1 && (
            <>
              <button
                className="modal-nav-btn prev"
                onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)}
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="modal-nav-btn next"
                onClick={() => setImgIndex((i) => (i + 1) % images.length)}
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        <div className="modal-body">
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
          <span className="prod-cat">{product.brand || product.category}</span>
          <h2 className="modal-title">{product.title}</h2>
          <p className="modal-desc">{product.description}</p>
          <div className="modal-price-row">
            <span className="modal-price">{money(product.price)}</span>
            {product.discountPercentage > 0 && (
              <span className="modal-discount">
                {Math.round(product.discountPercentage)}% off
              </span>
            )}
          </div>
          <p
            className="modal-stock"
            style={{ color: product.stock > 0 ? "#6F7A5E" : "#A8613A" }}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
          <button
            className="modal-add-btn"
            onClick={() => {
              onAdd(product);
              onClose();
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}