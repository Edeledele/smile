import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
const display = Bricolage_Grotesque(
  { subsets: ["latin"], variable: "--display" }
);
const body = DM_Sans({ subsets: ["latin"], variable: "--body" });

export const metadata = {
  title: "Smiling – photo prints that make you happy",
  description: "Buy joyful photography prints."
};

import Providers from "./Providers";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout( {
  children
}) {
  return <html lang="en">
    <body
      className={`${display.variable} ${body.variable}`}
    >
      <Providers>
        <Header />
        {children}
        <Footer />
      </Providers>
    </body>
  </html>;
}
