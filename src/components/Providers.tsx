"use client";

import "@mysten/dapp-kit/dist/index.css";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [networks] = useState(() => ({
    devnet: { url: getFullnodeUrl("devnet") },
    mainnet: { url: getFullnodeUrl("mainnet") },
    testnet: { url: getFullnodeUrl("testnet") },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <WalletProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
