import React, { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Header({ cartCount, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav">
        <div className="brand">
          <span className="mark">
            <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
              <path
                d="M4 20V10L12 4L20 10V20H14V14H10V20H4Z"
                stroke="#EFE9DC"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          InteriorStudio
        </div>

        <nav className="nav-links">
          <a href="#top">Home</a>
          <a href="#collections">Collections</a>
          <a href="#arrivals">Arrivals</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={onCartClick} aria-label="Open cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
<a href="#collections" className="btn-primary desktop-only">Get Inspired</a>          <button
            className="nav-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="#top" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#collections" onClick={() => setMenuOpen(false)}>
            Collections
          </a>
          <a href="#arrivals" onClick={() => setMenuOpen(false)}>
            Arrivals
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </div>
      )}
    </header>
  );
}