import React from "react";

export default function SkeletonGrid({ count = 8 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skel-card" key={i} />
      ))}
    </div>
  );
}