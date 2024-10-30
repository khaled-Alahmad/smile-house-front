import { Inter } from "next/font/google";
import "./globals.css";
import "./assets/scss/style.scss";
import "./assets/scss/bootstrap.scss";
import "./assets/css/materialdesignicons.min.css";
import Script from "next/script";
import Head from "next/head";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

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
  return (
    <html lang="ar">
      <head>
        <title>سمايل هاوس - مركز تجميل في إدلب</title>
        <meta
          name="description"
          content="مركز سمايل هاوس في إدلب يقدم أفضل خدمات تجميل الأسنان والعناية بالبشرة وغيرها من الخدمات التجميلية."
        />

        <meta property="og:title" content="سمايل هاوس - مركز تجميل في إدلب" />
        <meta
          property="og:description"
          content="احصل على أجود خدمات التجميل في سمايل هاوس بإدلب، من تجميل الأسنان إلى العناية بالبشرة."
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
          content="مركز سمايل هاوس في إدلب يقدم أفضل خدمات تجميل الأسنان والعناية بالبشرة."
        />
        <meta
          name="twitter:image"
          content="https://smile-house.vercel.app/images/logo.png"
        />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "سمايل هاوس",
            "url": "https://smile-house.vercel.app",
            "logo": "https://smile-house.vercel.app/images/logo.png",
            "sameAs": [
              "https://www.facebook.com/p/%D9%85%D8%AC%D9%85%D8%B9-%D8%B3%D9%85%D8%A7%D9%8A%D9%84-%D9%87%D8%A7%D9%88%D8%B3-%D8%A7%D9%84%D8%B7%D8%A8%D9%8A-%D9%80-Smile-House-100092169591579/",
              "https://www.instagram.com/smile_house11/?hl=ar"
            ]
          }
        `}
        </script>

        <meta
          name="google-site-verification"
          content="Miu_QGaGP4B9u6IllJxprdJbtujQfQUFvpyxxnJZy0Q"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <meta name="robots" content="index, follow" />

        <meta name="robots" content="index, follow" />
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

        {children}
        <Footer />
      </body>
    </html>
  );
}
