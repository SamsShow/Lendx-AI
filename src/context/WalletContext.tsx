import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { detectWalletProvider } from "@/lib/walletUtils";

interface WalletContextType {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  provider: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const defaultContext: WalletContextType = {
  connected: false,
  connecting: false,
  address: null,
  provider: null,
  connect: async () => {},
  disconnect: async () => {},
};

const WalletContext = createContext<WalletContextType>(defaultContext);

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);

  useEffect(() => {
    // Check for available wallet provider
    const detectedProvider = detectWalletProvider();
    if (detectedProvider) {
      setProvider(detectedProvider);
    }

    // Check if wallet was previously connected
    const checkWalletConnection = async () => {
      if (typeof window === "undefined") return;

      // This is a simplified version - in a real app, you'd check the actual connection status
      // For this demo, we'll just simulate a connection check
      const savedAddress = localStorage.getItem("walletAddress");
      if (savedAddress) {
        setAddress(savedAddress);
        setConnected(true);
      }
    };

    checkWalletConnection();
  }, []);

  const connect = async () => {
    if (connected || connecting) return;

    setConnecting(true);

    try {
      if (typeof window === "undefined") {
        throw new Error("Window is not defined");
      }

      // Connect based on available wallet
      if (window.suiet) {
        const result = await window.suiet.connect();
        if (result.success) {
          const accounts = await window.suiet.getAccounts();
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
            setConnected(true);
            // Save the connection for next time
            localStorage.setItem("walletAddress", accounts[0]);
          }
        }
      } else if (window.suiWallet) {
        const result = await window.suiWallet.connect();
        if (result.success) {
          const accounts = await window.suiWallet.getAccounts();
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
            setConnected(true);
            // Save the connection for next time
            localStorage.setItem("walletAddress", accounts[0]);
          }
        }
      } else {
        throw new Error(
          "No Sui wallet found. Please install a Sui wallet extension."
        );
      }
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      // You might want to handle errors and show a message to the user
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      if (window.suiet) {
        await window.suiet.disconnect();
      } else if (window.suiWallet) {
        await window.suiWallet.disconnect();
      }

      setAddress(null);
      setConnected(false);
      localStorage.removeItem("walletAddress");
    } catch (err) {
      console.error("Failed to disconnect wallet:", err);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        address,
        provider,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
