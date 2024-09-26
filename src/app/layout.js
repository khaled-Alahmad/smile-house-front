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
  return (
    <html lang="ar">
      <header>
      <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          rel="stylesheet"
        />
         <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
      </header>
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
