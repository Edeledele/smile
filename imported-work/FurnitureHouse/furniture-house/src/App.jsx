import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import FeatureRow from "./components/FeatureRow.jsx";
import Collections from "./components/Collections.jsx";
import Arrivals from "./components/Arrivals.jsx";
import Footer from "./components/Footer.jsx";
import ProductModal from "./components/ProductModal.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Contact from "./components/Contact.jsx";
import { useFurniture } from "./hooks/useFurniture.js";
import { money } from "./constants.js";

export default function App() {
  const { products, status, errorMsg } = useFurniture();
  const [activeProduct, setActiveProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  }

  function incQty(id) {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  }

  function decQty(id) {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0)
    );
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function handleCheckout() {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    alert(`Thank you for your order! Total: ${money(total)}`);
    setCart([]);
    setCartOpen(false);
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div id="top">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <main>
        <Hero heroProduct={products[0]} />
        {status === "ready" && (
          <FeatureRow products={products} onShop={setActiveProduct} />
        )}

        <Collections
          products={products}
          status={status}
          errorMsg={errorMsg}
          onOpen={setActiveProduct}
          onAdd={addToCart}
        />

        <Arrivals
          products={products}
          status={status}
          onOpen={setActiveProduct}
          onAdd={addToCart}
        />
        <Contact />
      </main>

      <Footer />

      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAdd={addToCart}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onInc={incQty}
        onDec={decQty}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}