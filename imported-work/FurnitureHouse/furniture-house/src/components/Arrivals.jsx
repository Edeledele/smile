import React, { useMemo } from "react";
import ProductCard from "./ProductCard.jsx";
import SkeletonGrid from "./SkeletonGrid.jsx";

export default function Arrivals({ products, status, onOpen, onAdd }) {
  const arrivals = useMemo(() => {
    return [...products].sort((a, b) => b.id - a.id).slice(0, 4);
  }, [products]);

  return (
    <section className="arrivals" id="arrivals">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>Latest Arrivals</h2>
            <p>Fresh additions worth making room for.</p>
          </div>
        </div>

        {status === "loading" && <SkeletonGrid count={4} />}

        {status === "ready" && (
          <div className="grid-4">
            {arrivals.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={onOpen} onAdd={onAdd} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}