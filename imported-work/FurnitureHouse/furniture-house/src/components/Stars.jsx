import React from "react";
import { Star } from "lucide-react";

export default function Stars({ rating }) {
  const rounded = Math.round(rating);
  return (
    <span className="prod-rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          fill={i <= rounded ? "#6F7A5E" : "none"}
          stroke="#6F7A5E"
        />
      ))}
      <span style={{ color: "#847e70", marginLeft: 4 }}>{rating.toFixed(1)}</span>
    </span>
  );
}