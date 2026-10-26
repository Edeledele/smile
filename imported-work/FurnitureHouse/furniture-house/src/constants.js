export const API_URL = "https://dummyjson.com/products/category/furniture";

const USD_TO_ETB_RATE = 10;

export function money(n) {
  const etb = Number(n) * USD_TO_ETB_RATE;
  return (
    etb.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
    " ETB"
  );
}