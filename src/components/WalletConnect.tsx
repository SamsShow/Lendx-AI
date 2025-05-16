import { FC } from "react";
import { useWallet } from "@/context/WalletContext";

interface WalletConnectProps {
  onConnect?: (address: string) => void;
}

const WalletConnect: FC<WalletConnectProps> = ({ onConnect }) => {
  const { connected, connecting, address, provider, connect, disconnect } =
    useWallet();

  const handleConnect = async () => {
    await connect();
    if (address) {
      onConnect?.(address);
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  return (
    <div>
      {connected && address ? (
        <div className="flex items-center space-x-2">
          <span className="px-4 py-2 rounded-lg bg-card text-sm">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button
            onClick={handleDisconnect}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={connecting || !provider}
          className={`btn-primary flex items-center ${
            connecting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {connecting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Connecting...
            </>
          ) : (
            "Connect Wallet"
          )}
        </button>
      )}

      {!provider && !connecting && (
        <p className="text-amber-400 text-sm mt-2">
          No Sui wallet detected. Please install a Sui wallet extension.
        </p>
      )}
    </div>
  );
};

export default WalletConnect;
