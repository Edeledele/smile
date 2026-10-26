"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { user, login, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: "", email: "" });

  const links = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(loginForm.name || "Customer", loginForm.email);
    setShowLoginModal(false);
    setLoginForm({ name: "", email: "" });
  };

  return (
    <>
      <header className="navbar">
        <div className="container nav-inner">
          {/* Brand Logo */}
          <Link className="brand-logo" href="/" aria-label="Addis Eats Homepage">
            <div className="brand-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-title">Addis Eats</span>
              <span className="brand-tagline">Real Food. Real Flavor.</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="nav-links" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${
                  pathname === link.href || (link.href === "/menu" && pathname.startsWith("/menu"))
                    ? "nav-active"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right utility icons: Search, Cart, Profile */}
          <div className="nav-actions">
            {/* Search */}
            <Link
              href="/menu"
              className="icon-button"
              aria-label="Search dishes"
              title="Search dishes"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </Link>

            {/* Cart with badge */}
            <Link className="cart-badge-button" href="/cart" aria-label={`Shopping cart with ${itemCount} items`}>
              <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-count-badge">{itemCount}</span>
            </Link>

            {/* Profile User Icon & Dropdown */}
            <div style={{ position: "relative" }}>
              <button
                className="profile-button"
                aria-label="User profile account"
                onClick={() => setProfileOpen(!profileOpen)}
                type="button"
                title={user ? `Signed in as ${user.name}` : "Log In / Sign In"}
              >
                <svg viewBox="0 0 24 24" width="26" height="26" fill={user ? "#f28a0e" : "currentColor"}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z" />
                </svg>
              </button>

              {profileOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 12px)",
                    background: "#ffffff",
                    border: "1px solid #ece6dc",
                    borderRadius: "14px",
                    boxShadow: "0 14px 35px rgba(0,0,0,0.12)",
                    padding: "18px",
                    width: "240px",
                    zIndex: 200,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {user ? (
                    <>
                      <div style={{ borderBottom: "1px solid #f2ede6", paddingBottom: "10px" }}>
                        <div style={{ fontSize: "11px", fontWeight: "700", color: "#f28a0e", letterSpacing: "1px" }}>
                          LOGGED IN
                        </div>
                        <strong style={{ display: "block", fontSize: "15px", color: "#1a1410" }}>
                          {user.name}
                        </strong>
                        <span style={{ fontSize: "12px", color: "#797169" }}>
                          {user.email}
                        </span>
                      </div>
                      <Link
                        href="/cart"
                        onClick={() => setProfileOpen(false)}
                        style={{ fontSize: "13.5px", color: "#3a3028", padding: "6px 0", display: "flex", alignItems: "center", gap: "8px" }}
                      >
                        <span>📦</span> My Orders & Cart
                      </Link>
                      <Link
                        href="/menu"
                        onClick={() => setProfileOpen(false)}
                        style={{ fontSize: "13.5px", color: "#3a3028", padding: "6px 0", display: "flex", alignItems: "center", gap: "8px" }}
                      >
                        <span>🍽️</span> Browse Menu
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                        }}
                        style={{
                          textAlign: "left",
                          fontSize: "13.5px",
                          color: "#dc2626",
                          paddingTop: "8px",
                          borderTop: "1px solid #f2ede6",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span>🚪</span> Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <div style={{ borderBottom: "1px solid #f2ede6", paddingBottom: "10px" }}>
                        <strong style={{ display: "block", fontSize: "15px", color: "#1a1410" }}>
                          Welcome to Addis Eats
                        </strong>
                        <span style={{ fontSize: "12px", color: "#797169" }}>
                          Log in to save your orders & info
                        </span>
                      </div>
                      <button
                        type="button"
                        className="button-primary"
                        onClick={() => {
                          setProfileOpen(false);
                          setShowLoginModal(true);
                        }}
                        style={{ width: "100%", justifyContent: "center", padding: "10px 16px" }}
                      >
                        Log In / Register
                      </button>
                      <Link
                        href="/menu"
                        onClick={() => setProfileOpen(false)}
                        style={{ fontSize: "13px", color: "#797169", textAlign: "center", paddingTop: "4px" }}
                      >
                        Browse dishes as guest →
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Login Modal */}
      {showLoginModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setShowLoginModal(false)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              padding: "36px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLoginModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                fontSize: "18px",
                color: "#797169",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <span className="eyebrow">WELCOME BACK</span>
            <h2 style={{ fontSize: "24px", color: "#1a1410", margin: "6px 0 16px" }}>
              Log In to Addis Eats
            </h2>

            <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: "600", color: "#3a3028" }}>
                Your Name
                <input
                  required
                  placeholder="e.g. Genet / Abebe"
                  value={loginForm.name}
                  onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                  style={{
                    border: "1px solid #e3ded6",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: "600", color: "#3a3028" }}>
                Email Address
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  style={{
                    border: "1px solid #e3ded6",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </label>

              <button type="submit" className="button-primary full-button" style={{ marginTop: "10px" }}>
                Log In →
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
