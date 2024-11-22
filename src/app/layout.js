"use client";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import dynamic from "next/dynamic"; // استيراد dynamic لتحميل المكونات بشكل كسول
import "./globals.css";
import "./assets/scss/style.scss";
import "./assets/scss/bootstrap.scss";
import "./assets/css/materialdesignicons.min.css";

import Script from "next/script";

import ScrollManager from "./components/ScrollManager";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

// تحميل Footer بشكل كسول
const LazyFooter = dynamic(() => import("./components/footer"), {
  ssr: false, // تعطيل التحميل في الخادم
});

export default function RootLayout({ children }) {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 2000,
  //     easing: "ease-out-sine",
  //     once: true,
  //   });
  // }, []);

  return (
    <html lang="ar">
      <head>
        <title>سمايل هاوس - مركز تجميل في إدلب</title>
        <meta
          name="description"
          content="مركز سمايل هاوس في إدلب هو وجهتك المثالية لعالم الجمال والعناية الشخصية..."
        />
        <meta property="og:title" content="سمايل هاوس - مركز تجميل في إدلب" />
        <meta
          property="og:description"
          content="احصل على أجود خدمات التجميل في سمايل هاوس بإدلب..."
        />
        <meta
          property="og:image"
          content="https://smile-house.vercel.app/images/logo.png"
        />
        <meta property="og:url" content="https://smile-house.vercel.app" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="سمايل هاوس - مركز تجميل في إدلب" />
        <meta
          name="twitter:description"
          content="مركز سمايل هاوس في إدلب يقدم أفضل خدمات تجميل الأسنان والعناية بالبشرة..."
        />
        <meta
          name="twitter:image"
          content="https://smile-house.vercel.app/images/logo.png"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
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
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.1/aos.js"
          strategy="afterInteractive"
        />
      </head>

      <body className={`${inter.variable} font-sans`}>
        <Navbar
          manuClass="navigation-menu nav-light nav-left"
          containerClass="container"
        />
        {/* <ScrollManager /> */}
        {children}

        <LazyFooter />
      </body>
    </html>
  );
}
