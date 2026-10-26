"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartContext";

export default function CheckoutPage() {
  const { cart, total, clearCart, ready } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [error, setError] = useState("");

  function submitOrder(e) {
    e.preventDefault();
    if (!cart.length) {
      setError("Your cart is empty. Add a dish before checkout.");
      return;
    }
    setError("");
    setOrderPlaced(true);
    clearCart();
  }

  if (!ready) {
    return (
      <section className="section page-section">
        <div className="container">Loading...</div>
      </section>
    );
  }

  if (orderPlaced) {
    return (
      <section className="section page-section">
        <div className="container">
          <div className="empty-state" style={{ maxWidth: "560px", margin: "40px auto" }}>
            <span style={{ fontSize: "56px" }}>🎉</span>
            <span className="eyebrow" style={{ marginTop: "12px" }}>ORDER CONFIRMED</span>
            <h1 style={{ fontSize: "28px", margin: "12px 0" }}>
              Ameseginalehu, {form.name.split(" ")[0]}!
            </h1>
            <p style={{ color: "#6f6760", fontSize: "14px", lineHeight: "1.7" }}>
              Your order for authentic Ethiopian cuisine has been placed. Our kitchen is preparing your dishes fresh and hot.
            </p>
            <Link href="/menu" className="button-primary">
              Order More Dishes →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section page-section">
      <div className="container">
        <div className="page-intro">
          <span className="eyebrow">FINAL STEP</span>
          <h1>Checkout</h1>
          <p>Provide your delivery details to receive your hot, fresh Addis meal.</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state">
            <span>🍽️</span>
            <h2>Nothing to check out yet</h2>
            <p>Your cart is empty. Let’s find you something delicious first.</p>
            <Link href="/menu" className="button-primary">
              Browse Menu →
            </Link>
          </div>
        ) : (
          <div className="checkout-layout">
            <form className="checkout-form" onSubmit={submitOrder}>
              <h2 style={{ fontSize: "20px" }}>Delivery details</h2>
              <label>
                Full name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                />
              </label>
              <label>
                Phone number
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+251 9XX XXX XXX"
                />
              </label>
              <label>
                Delivery address
                <textarea
                  required
                  rows="3"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Area, street, building or landmark"
                />
              </label>
              <label>
                Order notes (optional)
                <textarea
                  rows="2"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Extra injera, spice preference, gate code..."
                />
              </label>
              {error && <p style={{ color: "#dc2626", fontSize: "13px" }}>{error}</p>}
              <button className="button-primary full-button" type="submit">
                Place Order ({total} ETB) →
              </button>
            </form>

            <aside className="summary-card">
              <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Your order</h2>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid #f2ede6",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img
                      src={item.imageUrl}
                      alt=""
                      style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }}
                    />
                    {item.name} × {item.quantity}
                  </span>
                  <strong>{item.price * item.quantity} ETB</strong>
                </div>
              ))}
              <div className="summary-total">
                <span>Total</span>
                <strong>{total} ETB</strong>
              </div>
              <div style={{ marginTop: "12px" }}>
                <Link href="/cart" className="view-all-link">
                  ← Edit cart
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
