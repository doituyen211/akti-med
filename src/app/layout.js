/**
 * Root layout — bọc toàn bộ app.
 * Chứa: fonts, global CSS, Topnav, Notification toast.
 */

import Topnav from "../components/layout/TopNav";
import Notification from "../components/shared/Notification";
import { Space_Mono } from "next/font/google";

import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata = {
  title: "AktiMed — Ghi âm → SOAP Note tức thì",
  description:
    "Nền tảng AI hỗ trợ y tế đầu tiên tại Việt Nam. Chuyển giọng nói thành SOAP Note chuẩn y khoa trong vài giây.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${spaceMono.variable} h-full antialiased`}>
      <head>
        {/* Tabler Icons CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        />
      </head>
      <body>
        {/* Topnav cố định — hiển thị trên mọi trang */}
        <Topnav />

        {/* Page content */}
        <main>{children}</main>

        {/* Global toast notifications */}
        <Notification />
      </body>
    </html>
  );
}
