import React from "react";
import { X, Plus, Minus } from "lucide-react";
import { money } from "../constants.js";

export default function CartDrawer({ open, onClose, items, onInc, onDec, onRemove, onCheckout }) {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      <div
        className={"drawer-overlay" + (open ? "" : " closed")}
        onClick={onClose}
      />
      <div className={"drawer" + (open ? "" : " closed")}>
        <div className="drawer-header">
          <h3 style={{ fontSize: "1.15rem" }}>Your Cart</h3>
          <button onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-items">
          {items.length === 0 && (
            <p className="state-msg" style={{ padding: 0 }}>
              Your cart is empty. Add something you love.
            </p>
          )}

          {items.map((item) => {
            const img = (item.images && item.images[0]) || item.thumbnail;
            return (
              <div className="cart-item" key={item.id}>
                <img src={img} alt={item.title} />
                <div className="cart-item-info">
                  <span style={{ fontSize: "0.9rem", color: "#3E3226" }}>{item.title}</span>
                  <span style={{ fontSize: "0.8rem", color: "#847e70" }}>
                    {money(item.price)}
                  </span>
                  <div className="qty-row">
                    <button className="qty-btn" onClick={() => onDec(item.id)}>
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: "0.85rem", width: 16, textAlign: "center" }}>
                      {item.qty}
                    </span>
                    <button className="qty-btn" onClick={() => onInc(item.id)}>
                      <Plus size={12} />
                    </button>
                    <button className="remove-btn" onClick={() => onRemove(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="drawer-footer">
          <div className="drawer-total-row">
            <span style={{ color: "#5b564c" }}>Subtotal</span>
            <span style={{ fontWeight: 600 }}>{money(total)}</span>
          </div>
          <button
            className="checkout-btn"
            disabled={items.length === 0}
            onClick={onCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}