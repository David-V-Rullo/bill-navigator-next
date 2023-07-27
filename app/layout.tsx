import Hero from "@/components/Hero";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins, Nunito, Open_Sans } from "next/font/google";
const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ weight: ["400", "700"], subsets: ["latin"] });
const openSans = Open_Sans({ weight: ["400", "700"], subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        </main>
      </body>
    </html>
  );
}
