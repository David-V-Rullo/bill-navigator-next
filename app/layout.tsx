import Hero from "@/components/Hero";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import dotenv from "dotenv";
import Providers from "./providers";
import ThemeButton from "@/components/ThemeButton";
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
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={openSans.className}>
        <Providers>
          <main className="bg-white dark:bg-slate-950 max-width p-10 relative overflow-hidden">
            <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 opacity-1">
              {/* <ThemeButton /> */}
              <Hero />
            </div>
            <div className="pt-80 ">{children}</div>
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  );
}
