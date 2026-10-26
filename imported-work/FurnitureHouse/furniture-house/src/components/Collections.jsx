import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "./ProductCard.jsx";
import SkeletonGrid from "./SkeletonGrid.jsx";

export default function Collections({ products, status, errorMsg, onOpen, onAdd }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesBrand = activeFilter === "All" || p.brand === activeFilter;
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
      return matchesBrand && matchesQuery;
    });
  }, [products, activeFilter, query]);

  return (
    <section className="collections" id="collections">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>Featured Collections</h2>
            <p>Live pieces pulled straight from our catalog — updated in real time.</p>
          </div>
          <div className="search-box">
            <Search size={16} color="#847e70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search furniture..."
            />
          </div>
        </div>

        {status === "ready" && (
          <div className="filter-row">
            {brands.map((b) => (
              <button
                key={b}
                className={"filter-pill" + (activeFilter === b ? " active" : "")}
                onClick={() => setActiveFilter(b)}
              >
                {b}
              </button>
            ))}
          </div>
        )}

        {status === "loading" && <SkeletonGrid count={8} />}

        {status === "error" && (
          <p className="state-msg">Couldn't load products right now. {errorMsg}</p>
        )}

        {status === "ready" && filtered.length === 0 && (
          <p className="state-msg">No pieces match your search.</p>
        )}

        {status === "ready" && filtered.length > 0 && (
          <div className="grid-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={onOpen} onAdd={onAdd} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}