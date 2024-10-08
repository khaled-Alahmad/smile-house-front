"use client";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import "./assets/scss/style.scss";
import "./assets/scss/bootstrap.scss";
import "./assets/css/materialdesignicons.min.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata = {
  title: "سمايل هاوس",
  description: "كل ما يخص عالم التجميل",
};

export default function RootLayout({ children }) {
  useEffect(() => {
    import("aos").then((AOS) => AOS.init());
  }, []);

  return (
    <html lang="ar">
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.1/aos.css"
        rel="stylesheet"
      />

      <body className={`${inter.variable} font-sans`}>
        {children}
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/js/swiper.min.js"
          integrity="sha256-4sETKhh3aSyi6NRiA+qunPaTawqSMDQca/xLWu27Hg4="
          crossorigin="anonymous"
        ></script>{" "}
      </body>
    </html>
  );
}
