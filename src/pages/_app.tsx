import type { AppProps } from "next/app";
import { WalletProvider } from "@/context/WalletContext";
import "@/app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
}
