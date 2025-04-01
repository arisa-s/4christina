import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paratext Admin",
  description: "Christina's poetry archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
