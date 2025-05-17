// This file contains utility functions for Sui wallet integration
import { SuiClient } from "@mysten/sui.js/client";

// Define network endpoints
export const SUI_NETWORKS = {
  MAINNET: "https://fullnode.mainnet.sui.io:443",
  TESTNET: "https://fullnode.testnet.sui.io:443",
  DEVNET: "https://fullnode.devnet.sui.io:443",
  LOCAL: "http://localhost:9000",
};

// Default network - change as needed during development
export const DEFAULT_NETWORK =
  process.env.NEXT_PUBLIC_SUI_NETWORK || SUI_NETWORKS.TESTNET;

// Create a provider for RPC calls
export const getSuiProvider = (
  network: string = DEFAULT_NETWORK
): SuiClient => {
  return new SuiClient({ url: network });
};

// Get account details
export const getAccountDetails = async (
  address: string,
  provider: SuiClient
) => {
  try {
    const accountInfo = await provider.getObject({
      id: address,
      options: { showContent: true },
    });
    return accountInfo;
  } catch (error) {
    console.error("Error fetching account details:", error);
    throw error;
  }
};

// Format Sui balance
export const formatSuiBalance = (balance: number | string): string => {
  const balanceNum =
    typeof balance === "string" ? parseFloat(balance) : balance;
  const formattedBalance = (balanceNum / 1_000_000_000).toFixed(4);
  return formattedBalance;
};

// Detect wallet type
export const detectWalletProvider = (): string | null => {
  if (typeof window !== "undefined") {
    console.log("Checking for wallet providers...");
    console.log("window.suiWallet:", !!window.suiWallet);
    console.log("window.suiet:", !!window.suiet);
    console.log("window.martian:", !!window.martian);
    
    if (window.suiWallet) return "Sui Wallet";
    if (window.suiet) return "Suiet";
    if (window.martian) return "Martian";
    // Add more wallet detections as needed
  }
  return null;
};

// Get chain ID based on network
export const getChainId = (network: string): string => {
  switch (network) {
    case SUI_NETWORKS.MAINNET:
      return "0x0"; // Replace with actual mainnet chain ID
    case SUI_NETWORKS.TESTNET:
      return "0x1"; // Replace with actual testnet chain ID
    case SUI_NETWORKS.DEVNET:
      return "0x2"; // Replace with actual devnet chain ID
    default:
      return "0x0"; // Default to mainnet
  }
};
