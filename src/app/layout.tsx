import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LendX AI - Decentralized Lending & Staking Platform",
  description:
    "A decentralized lending and staking platform powered by AI sentiment analysis on the Sui blockchain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
