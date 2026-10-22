import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RideIE: skip the metro, skip the Uber, ride to IE",
  description:
    "RideIE helps IE students get a scooter, paperwork included, so they reach class faster and on their own terms.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-stone-50 text-stone-900">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200 px-4 py-6 text-center text-xs text-stone-500">
          RideIE is an independent student project, not affiliated with IE University.
        </footer>
      </body>
    </html>
  );
}
