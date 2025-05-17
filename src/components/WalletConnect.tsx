"use client";

import { ConnectButton } from "@mysten/dapp-kit";
import { useEffect } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";

interface WalletConnectProps {
  onConnect?: (address: string) => void;
}

export default function WalletConnect({ onConnect }: WalletConnectProps = {}) {
  const currentAccount = useCurrentAccount();

  useEffect(() => {
    if (onConnect && currentAccount?.address) {
      onConnect(currentAccount.address);
    }
  }, [currentAccount, onConnect]);

  return <ConnectButton />;
}
