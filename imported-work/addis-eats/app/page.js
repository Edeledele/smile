
"use client";

import { useState } from "react";
import Link from "next/link";
import { dishes, categories } from "@/lib/dishes";
import DishCard from "@/components/DishCard";
import CategoryIcon from "@/components/CategoryIcon";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDishes =
    selectedCategory === "all"
      ? dishes
      : dishes.filter(
          (dish) => dish.categoryId === selectedCategory
        );

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-backdrop">
          <img
            src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1800&q=85"
            alt="Delicious food served on a table"
            className="hero-bg-image"
          />

          <div className="hero-overlay"></div>
        </div>

        <div className="container hero-content-container">
          <div className="hero-text-block">
            <span className="hero-badge">
              AUTHENTIC ETHIOPIAN CUISINE
            </span>

            <h1 className="hero-title">
              Fresh Food,
              <br />
              <span className="hero-highlight">
                Delivered
              </span>{" "}
              to You
            </h1>

            <p className="hero-subtitle">
              Enjoy the rich flavors of Ethiopia with our
              delicious and traditional dishes.
            </p>

            <div className="hero-cta-wrap">
              <Link href="/menu" className="order-now-btn">
                <span>Order Now</span>
                <span className="arrow-icon">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Bar */}
      <section className="category-section">
        <div className="container">
          <div className="category-strip">
            {categories.map((cat) => {
              const isActive =
                selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(cat.id)
                  }
                  className={`category-pill ${
                    isActive ? "active" : ""
                  }`}
                >
                  <div className="category-pill-icon">
                    <CategoryIcon
                      icon={cat.icon}
                      active={isActive}
                    />
                  </div>

                  <span className="category-pill-label">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="popular-section">
        <div className="container">
          <div className="popular-header">
            <div className="popular-headings">
              <h2 className="popular-title">
                Popular Dishes
              </h2>

              <p className="popular-subtitle">
                Our most loved dishes, made with fresh
                ingredients.
              </p>
            </div>

            <Link
              href="/menu"
              className="view-all-link"
            >
              <span>View All</span>
              <span className="arrow-icon">→</span>
            </Link>
          </div>

          <div className="dishes-grid">
            {filteredDishes.slice(0, 4).map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
              />
            ))}
          </div>

          {/* Empty Category Message */}
          {filteredDishes.length === 0 && (
            <div className="empty-category">
              <h3>No dishes found</h3>
              <p>
                There are no dishes in this category yet.
              </p>

              <button
                type="button"
                className="order-now-btn"
                onClick={() =>
                  setSelectedCategory("all")
                }
              >
                View All Dishes
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
