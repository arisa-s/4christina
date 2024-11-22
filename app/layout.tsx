import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Vollkorn } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";

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
  title: "Christina Soorumaa Sandra",
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
        {children}
      </body>
    </html>
  );
}
