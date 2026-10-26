import { useState, useEffect } from "react";
import { API_URL } from "../constants.js";

export function useFurniture() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed: " + res.status);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setProducts(data.products || []);
        setStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        setErrorMsg(err.message || "Something went wrong");
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, status, errorMsg };
}