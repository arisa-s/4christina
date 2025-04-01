import type { Metadata } from "next";
import "./globals.css";
import { EB_Garamond, Nunito_Sans } from "next/font/google";
import "core-js/proposals/promise-with-resolvers";

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
        {children}
      </body>
    </html>
  );
}
