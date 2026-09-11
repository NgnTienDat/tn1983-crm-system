import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { QueryProvider } from "@/providers/QueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "TN1983 Coffee | Cà phê Buôn Ma Thuột",
  description:
    "TN1983 Coffee chuyên cung cấp cà phê hạt và cà phê bột cho quán cà phê, đại lý và khách hàng cá nhân. Sản xuất và đóng gói tại Buôn Ma Thuột.",
  keywords: [
    "TN1983 Coffee",
    "cà phê Buôn Ma Thuột",
    "cà phê hạt",
    "cà phê bột",
    "cà phê rang",
    "cà phê cho quán cà phê",
    "cà phê đại lý",
  ],
  authors: [{ name: "TN1983 Coffee" }],
  metadataBase: new URL("https://caphetrongnham.vn"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TN1983 Coffee | Cà phê Buôn Ma Thuột",
    description:
      "TN1983 Coffee chuyên cung cấp cà phê hạt và cà phê bột cho quán cà phê, đại lý và khách hàng cá nhân. Sản xuất và đóng gói tại Buôn Ma Thuột.",
    url: "https://caphetrongnham.vn",
    siteName: "Cà Phê Trọng Nhâm TN1983",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TN1983 Coffee | Cà phê Buôn Ma Thuột",
    description:
      "TN1983 Coffee chuyên cung cấp cà phê hạt và cà phê bột cho quán cà phê, đại lý và khách hàng cá nhân. Sản xuất và đóng gói tại Buôn Ma Thuột.",
  },
};

export function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-bg text-brand-text-secondary text-body-m font-normal antialiased selection:bg-brand-primary selection:text-brand-bg flex min-h-screen flex-col">
        <QueryProvider>
          <Header />
          <main className="w-full pt-16 bg-brand-bg flex-1">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}

export default RootLayout;