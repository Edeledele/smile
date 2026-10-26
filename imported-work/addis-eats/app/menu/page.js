"use client";

import { useMemo, useState } from "react";
import { dishes, categories } from "@/lib/dishes";
import DishCard from "@/components/DishCard";
import CategoryIcon from "@/components/CategoryIcon";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory =
        selectedCategory === "all" || dish.categoryId === selectedCategory;
      const matchesSearch =
        dish.name.toLowerCase().includes(search.toLowerCase()) ||
        dish.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  return (
    <section className="section page-section">
      <div className="container">
        <div className="page-intro">
          <span className="eyebrow">AUTHENTIC ETHIOPIAN DISHES</span>
          <h1>Explore Our <em>Menu</em></h1>
          <p>Traditional favorites, hearty stews, fresh vegetarian platters, and thirst-quenching drinks.</p>
        </div>

        {/* Category Pills Strip */}
        <div className="category-section" style={{ padding: "0 0 28px", background: "transparent" }}>
          <div className="category-strip">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`category-pill ${isActive ? "active" : ""}`}
                >
                  <div className="category-pill-icon">
                    <CategoryIcon icon={cat.icon} active={isActive} />
                  </div>
                  <span className="category-pill-label">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Toolbar & Search */}
        <div className="menu-toolbar">
          <p style={{ color: "#797169", fontSize: "14px" }}>
            Showing <strong>{filtered.length}</strong> delicious options
          </p>
          <label className="search-box">
            <span>⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes (e.g. Doro, Tibs, Shiro)..."
              aria-label="Search dishes"
            />
          </label>
        </div>

        {/* Dishes Grid */}
        {filtered.length ? (
          <div className="dishes-grid">
            {filtered.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>🍲</span>
            <h2>No dishes found</h2>
            <p>Try searching for another dish or pick a different category.</p>
            <button
              className="button-primary"
              onClick={() => {
                setSelectedCategory("all");
                setSearch("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
