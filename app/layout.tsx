import Hero from "@/components/Hero";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins, Nunito, Open_Sans } from "next/font/google";
import dotenv from "dotenv";
import SearchBar from "@/components/SearchBar";
dotenv.config();
const openSans = Open_Sans({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Bill Navigator",
  description: "A source for tracking Congress",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <main className="relative max-width mx-10 p-10 overflow-hidden">
          <Hero />
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
