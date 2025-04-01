import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

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
    <>
      <SiteHeader />
      <div className="max-w-7xl mx-auto grid grid-rows-[20px_1fr_20px] min-h-screen p-6 pb-20 gap-16">
        <main className="flex flex-col row-start-2 items-center sm:items-start">
          {children}
        </main>
      </div>
    </>
  );
}
