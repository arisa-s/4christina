import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Vollkorn } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const monteserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const vollkorn = Vollkorn({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vollkorn",
});

export const metadata: Metadata = {
  title: "Christina Sõõrumaa Sandra",
  description: "Her poetry archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monteserrat.variable} ${vollkorn.variable} bg-primary-bg`}
      >
        <SiteHeader />
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            {children}
          </main>
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
