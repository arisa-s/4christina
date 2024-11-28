import type { Metadata } from "next";
import "./globals.css";
import { EB_Garamond, Nunito_Sans } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-sans",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eb-garamond",
});

export const metadata: Metadata = {
  title: "Paratext",
  description: "Christina's poetry archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${
          (nunitoSans.variable, ebGaramond.variable)
        } bg-primary-bg`}
      >
        <SiteHeader />
        <div className="max-w-7xl mx-auto grid grid-rows-[20px_1fr_20px] min-h-screen p-6 pb-20 gap-16">
          <main className="flex flex-col row-start-2 items-center sm:items-start">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
