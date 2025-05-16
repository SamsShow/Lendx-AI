"use client";

import { FC, useState } from "react";
import { activateAIAgent } from "@/lib/contractUtils";

interface AIAgentConfigProps {
  walletAddress: string | null;
  onActivated?: (agentId: string) => void;
}

const AIAgentConfig: FC<AIAgentConfigProps> = ({
  walletAddress,
  onActivated,
}) => {
  const [capital, setCapital] = useState<string>("100");
  const [strategy, setStrategy] = useState<
    "conservative" | "balanced" | "aggressive"
  >("balanced");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleActivate = async () => {
    if (!walletAddress) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await activateAIAgent(walletAddress, capital, strategy);

      if (result.success && result.agentId) {
        setSuccessMessage(
          `AI Agent activated successfully with ID: ${result.agentId}`
        );
        onActivated?.(result.agentId);
      } else {
        setError(result.error || "Failed to activate AI agent");
      }
    } catch (err) {
      console.error("Error activating AI agent:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Configure AI Agent</h2>
      <p className="text-gray-400 mb-6">
        Set up your autonomous AI agent to make DeFi decisions based on
        real-time sentiment analysis.
      </p>

      <div className="space-y-6">
        <div>
          <label htmlFor="capital" className="block text-sm font-medium mb-2">
            Capital to Fund (USDC)
          </label>
          <input
            id="capital"
            type="number"
            min="10"
            step="10"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            className="w-full bg-gray-800 rounded-lg border border-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimum 10 USDC. This is the maximum amount your agent will use.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Strategy</label>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary"
                name="strategy"
                value="conservative"
                checked={strategy === "conservative"}
                onChange={() => setStrategy("conservative")}
              />
              <span className="ml-2">
                Conservative (Lower risk, lower potential returns)
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary"
                name="strategy"
                value="balanced"
                checked={strategy === "balanced"}
                onChange={() => setStrategy("balanced")}
              />
              <span className="ml-2">Balanced (Moderate risk and returns)</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary"
                name="strategy"
                value="aggressive"
                checked={strategy === "aggressive"}
                onChange={() => setStrategy("aggressive")}
              />
              <span className="ml-2">
                Aggressive (Higher risk, higher potential returns)
              </span>
            </label>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold mb-2">Agent Permissions</h3>
          <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
            <li>Execute lending, borrowing, and staking operations</li>
            <li>Rebalance positions based on sentiment shifts</li>
            <li>Operate strictly within funded capital limits</li>
            <li>Cannot withdraw funds to external wallets</li>
          </ul>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-300 p-3 rounded-lg">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-900/50 border border-green-500 text-green-300 p-3 rounded-lg">
            {successMessage}
          </div>
        )}

        <button
          onClick={handleActivate}
          disabled={loading || !walletAddress}
          className={`w-full btn-primary flex justify-center items-center ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          } ${!walletAddress ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? (
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
              Activating...
            </>
          ) : (
            "Activate AI Agent"
          )}
        </button>
      </div>
    </div>
  );
};

export default AIAgentConfig;
