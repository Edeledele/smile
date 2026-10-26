"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import { useState } from "react";

export default function DishCard({ dish }) {
  const { addToCart } = useCart();
  const [btnText, setBtnText] = useState("Add to Cart");

  const handleAdd = () => {
    addToCart(dish);
    setBtnText("Added ✓");
    setTimeout(() => {
      setBtnText("Add to Cart");
    }, 1200);
  };

  return (
    <article className="dish-card">
      <Link
        href={`/menu/${dish.id}`}
        className="dish-card-image-wrap"
        aria-label={`View ${dish.name} details`}
      >
        <img
          className="dish-card-image"
          src={dish.imageUrl}
          alt={dish.name}
          loading="lazy"
        />
      </Link>

      <div className="dish-card-body">
        <Link href={`/menu/${dish.id}`} className="dish-card-title">
          {dish.name}
        </Link>
        <p className="dish-card-desc">{dish.description}</p>

        <div className="dish-card-price-row">
          <span className="dish-card-price">{dish.priceFormatted || `${dish.price} ETB`}</span>
        </div>

        <div className="dish-card-bottom-row">
          <div className="dish-card-rating">
            <span className="star-icon">★</span>
            <span className="rating-val">{dish.rating || "4.8"}</span>
            <span className="rating-count">({dish.reviewsCount || 85})</span>
          </div>

          <button
            type="button"
            className="add-to-cart-btn"
            onClick={handleAdd}
            aria-label={`Add ${dish.name} to cart`}
          >
            {btnText}
          </button>
        </div>
      </div>
    </article>
  );
}
