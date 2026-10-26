import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { AuthProvider } from "@/components/AuthContext";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Addis Eats | Authentic Ethiopian Cuisine Delivered",
  description: "Real Food. Real Flavor. Enjoy the rich flavors of Ethiopia delivered fresh to you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <footer className="footer">
              <div className="container footer-inner">
                <div>
                  <div className="footer-brand">
                    <div className="brand-icon" style={{ width: "32px", height: "32px" }}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
                      </svg>
                    </div>
                    <span className="brand-title">Addis Eats</span>
                  </div>
                  <p>Real Food. Real Flavor. Authentic Ethiopian Cuisine.</p>
                </div>
                <p>© {new Date().getFullYear()} Addis Eats. All rights reserved.</p>
              </div>
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
