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
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
