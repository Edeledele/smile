"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, total, ready } = useCart();

  if (!ready) {
    return (
      <section className="section page-section">
        <div className="container">
          <p>Loading your cart...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section page-section">
      <div className="container">
        <div className="page-intro">
          <span className="eyebrow">YOUR TASTE OF ADDIS</span>
          <h1>Your <em>Cart</em></h1>
          <p>Review your selected dishes and proceed to quick delivery checkout.</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state">
            <span>🛒</span>
            <h2>Your cart is currently empty</h2>
            <p>Pick something appetizing from our authentic Ethiopian menu.</p>
            <Link href="/menu" className="button-primary">
              Explore Menu →
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-art">
                    <img className="cart-photo" src={item.imageUrl} alt={item.name} />
                  </div>
                  <div className="cart-item-info">
                    <Link href={`/menu/${item.id}`} className="cart-item-name">
                      {item.name}
                    </Link>
                    <span>{Number(item.price)} ETB each</span>
                    <button
                      className="remove-link"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="quantity-control">
                    <button
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      ＋
                    </button>
                  </div>
                  <strong style={{ fontSize: "15px", whiteSpace: "nowrap" }}>
                    {item.price * item.quantity} ETB
                  </strong>
                </div>
              ))}
              <div style={{ marginTop: "20px" }}>
                <Link href="/menu" className="view-all-link">
                  ← Continue shopping
                </Link>
              </div>
            </div>

            <aside className="summary-card">
              <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Order summary</h2>
              <div className="summary-row">
                <span style={{ color: "#797169" }}>Subtotal</span>
                <span>{total} ETB</span>
              </div>
              <div className="summary-row">
                <span style={{ color: "#797169" }}>Delivery Fee</span>
                <span style={{ color: "#16a34a", fontWeight: "600" }}>FREE</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <strong style={{ color: "#1a1410" }}>{total} ETB</strong>
              </div>
              <Link href="/checkout" className="button-primary full-button">
                Proceed to Checkout →
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
