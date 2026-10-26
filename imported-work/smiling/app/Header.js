"use client";
import Link from "next/link";
import { useCart } from "./CartContext";
import { useState } from "react";

export default function Header() {
  const { cart, setCart, open, setOpen } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const total = cart.reduce((s, p) => s + p.price, 0);

  return (
    <>
      <header className="nav">
        <Link className="logo" href="/">smiling<span>:)</span></Link>
        <nav>
          <Link href="/#shop">Shope</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <button className="cartbtn" onClick={() => setOpen(true)}>Cart ({cart.length})</button>
      </header>

      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="dh"><h3>Your cart</h3><button onClick={() => setOpen(false)}>Close</button></div>
        {cart.length === 0 ? <p>Your cart is empty. Add a print you love.</p> : cart.map(p => (
          <div className="row" key={p.id}>
            <img src={p.thumb} alt="" width={60} height={60} style={{ borderRadius: '12px', objectFit: 'cover' }} />
            <span>Print by {p.by}</span><b>Br {p.price}</b>
            <button onClick={() => setCart(c => c.filter(x => x.id !== p.id))}>Remove</button>
          </div>
        ))}
        <div className="total"><span>Total</span><b>Br {total}</b></div>
        <button className="btn" disabled={!cart.length} onClick={() => setShowCheckout(true)}>Checkout</button>
      </aside>

      {showCheckout && (
        <div className="zoom-modal" onClick={() => setShowCheckout(false)}>
          <div className="checkout-form" onClick={(e) => e.stopPropagation()}>
            <h2>Create Account to Order</h2>
            <p>Please enter your details to complete your order of Br {total}.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Order placed! (Demo)"); setShowCheckout(false); setCart([]); setOpen(false); }}>
              <label>Name<input type="text" required /></label>
              <label>Email<input type="email" required /></label>
              <label>Phone Number<input type="tel" required /></label>
              <div className="form-actions">
                <button type="button" className="close-btn" onClick={() => setShowCheckout(false)}>Cancel</button>
                <button type="submit" className="btn">Place Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
