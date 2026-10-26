"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { dishes } from "@/lib/dishes";
import { useCart } from "@/components/CartContext";
import { useState } from "react";

export default function DishDetailPage() {
  const params = useParams();
  const dish = dishes.find((item) => item.id === params.id);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!dish) {
    return (
      <div className="container empty-state" style={{ margin: "60px auto" }}>
        <h1>Dish not found</h1>
        <Link href="/menu" className="button-primary">
          Back to menu
        </Link>
      </div>
    );
  }

  return (
    <section className="section page-section">
      <div className="container">
        <Link href="/menu" className="back-link">
          ← Back to menu
        </Link>
        <div className="detail-layout">
          <div>
            <img className="detail-photo" src={dish.imageUrl} alt={dish.name} />
          </div>
          <div className="detail-copy">
            <span className="eyebrow">{dish.category.toUpperCase()} · ETHIOPIAN SPECIALTY</span>
            <h1>{dish.name}</h1>
            <div className="dish-card-rating" style={{ fontSize: "15px", marginBottom: "16px" }}>
              <span className="star-icon">★</span>
              <span className="rating-val">{dish.rating}</span>
              <span className="rating-count">({dish.reviewsCount} reviews)</span>
            </div>
            <p style={{ color: "#5a524a", fontSize: "15px", lineHeight: "1.7" }}>
              {dish.fullDescription || dish.description}
            </p>
            <div className="detail-price">{dish.priceFormatted || `${dish.price} ETB`}</div>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <button
                className="button-primary"
                onClick={() => {
                  addToCart(dish);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1500);
                }}
              >
                {added ? "Added to cart ✓" : "Add to cart"}
              </button>
              <Link href="/cart" className="view-all-link">
                View cart →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
