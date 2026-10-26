"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "addis-eats-cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCart(JSON.parse(saved));
    } catch (error) {
      console.warn("Could not read saved cart", error);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  function addToCart(dish) {
    setCart((current) => {
      const existing = current.find((item) => item.id === dish.id);
      if (existing) return current.map((item) => item.id === dish.id ? {...item, quantity: item.quantity + 1} : item);
      return [...current, {...dish, quantity: 1}];
    });
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      setCart((current) => current.filter((item) => item.id !== id));
      return;
    }
    setCart((current) => current.map((item) => item.id === id ? {...item, quantity} : item));
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  return <CartContext.Provider value={{cart, addToCart, updateQuantity, removeFromCart, clearCart, total, itemCount, ready}}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
