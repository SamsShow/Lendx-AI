"use client";

import { useState, useEffect } from "react";
import {
  getMockLendingPools,
  LendingPool,
  deposit,
  withdraw,
} from "@/lib/contractUtils";

export default function LendingPage() {
  const [pools, setPools] = useState<LendingPool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPool, setSelectedPool] = useState<LendingPool | null>(null);
  const [mode, setMode] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState<string>("");
  const [processingTx, setProcessingTx] = useState<boolean>(false);
  const [txResult, setTxResult] = useState<{
    success: boolean;
    message: string;
    txId?: string;
  } | null>(null);

  // Mock wallet address (in a real app, this would come from wallet connection)
  const walletAddress = "0x7f1dc38c7196d9333582d1266b9d912e30b4e8d4";

  useEffect(() => {
    const fetchPools = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call to your backend
        const mockPools = getMockLendingPools();
        setPools(mockPools);
      } catch (err) {
        console.error("Error fetching lending pools:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPools();
  }, []);

  const handlePoolSelect = (pool: LendingPool) => {
    setSelectedPool(pool);
    setAmount("");
    setTxResult(null);
  };

  const handleModeChange = (newMode: "deposit" | "withdraw") => {
    setMode(newMode);
    setAmount("");
    setTxResult(null);
  };

  const handleSubmit = async () => {
    if (!selectedPool || !amount || parseFloat(amount) <= 0) {
      return;
    }

    setProcessingTx(true);
    setTxResult(null);

    try {
      if (mode === "deposit") {
        const result = await deposit(walletAddress, selectedPool.id, amount);
        setTxResult({
          success: result.success,
          message: result.success
            ? `Successfully deposited ${amount} ${selectedPool.assetSymbol}`
            : result.error || "Transaction failed",
          txId: result.txId,
        });
      } else {
        const result = await withdraw(walletAddress, selectedPool.id, amount);
        setTxResult({
          success: result.success,
          message: result.success
            ? `Successfully withdrew ${amount} ${selectedPool.assetSymbol}`
            : result.error || "Transaction failed",
          txId: result.txId,
        });
      }
    } catch (err) {
      console.error("Transaction error:", err);
      setTxResult({
        success: false,
        message: "An unexpected error occurred",
      });
    } finally {
      setProcessingTx(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Lending</h1>
        <p className="text-gray-400">
          Lend your assets to earn interest with AI-powered risk management.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {loading ? (
            <div className="card flex items-center justify-center min-h-[300px]">
              <div className="animate-pulse text-primary">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <div className="card overflow-x-auto">
              <h2 className="text-xl font-bold mb-4">
                Available Lending Pools
              </h2>
              <table className="w-full">
                <thead className="text-left text-gray-400 text-sm">
                  <tr>
                    <th className="pb-4">Asset</th>
                    <th className="pb-4">Total Deposited</th>
                    <th className="pb-4">APY</th>
                    <th className="pb-4">Utilization Rate</th>
                    <th className="pb-4">Min Deposit</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {pools.map((pool) => (
                    <tr
                      key={pool.id}
                      className={`border-t border-gray-700 ${
                        selectedPool?.id === pool.id ? "bg-background" : ""
                      }`}
                    >
                      <td className="py-4 font-medium">{pool.assetSymbol}</td>
                      <td className="py-4">
                        ${Number(pool.totalDeposited).toLocaleString()}
                      </td>
                      <td className="py-4 text-green-400">{pool.apy}%</td>
                      <td className="py-4">{pool.utilizationRate}%</td>
                      <td className="py-4">
                        {pool.minDeposit} {pool.assetSymbol}
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => handlePoolSelect(pool)}
                          className="text-primary hover:text-blue-400 transition-colors"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="card mt-6">
            <h2 className="text-xl font-bold mb-4">AI-Enhanced Lending</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">How It Works</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Deposit assets into the lending pool</li>
                  <li>Earn interest from borrowers</li>
                  <li>AI agents monitor risk and adjust rates</li>
                  <li>Withdraw your assets plus interest anytime</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">AI Advantage</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Sentiment analysis guides lending rates</li>
                  <li>Automatic risk assessment of borrowers</li>
                  <li>Dynamic collateral requirements</li>
                  <li>Predictive liquidation protection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          {selectedPool ? (
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {selectedPool.assetSymbol} Pool
                </h2>
                <span className="text-green-400">{selectedPool.apy}% APY</span>
              </div>

              <div className="flex border border-gray-700 rounded-lg mb-6">
                <button
                  className={`w-1/2 py-2 text-center rounded-l-lg ${
                    mode === "deposit"
                      ? "bg-primary text-white"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleModeChange("deposit")}
                >
                  Deposit
                </button>
                <button
                  className={`w-1/2 py-2 text-center rounded-r-lg ${
                    mode === "withdraw"
                      ? "bg-primary text-white"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleModeChange("withdraw")}
                >
                  Withdraw
                </button>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium mb-2"
                >
                  {mode === "deposit" ? "Deposit Amount" : "Withdraw Amount"}
                </label>
                <div className="relative">
                  <input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-gray-800 rounded-lg border border-gray-700 p-2 pr-16 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={
                      mode === "deposit"
                        ? `Min ${selectedPool.minDeposit}`
                        : "0.00"
                    }
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-400">
                      {selectedPool.assetSymbol}
                    </span>
                  </div>
                </div>
              </div>

              {amount && mode === "deposit" && parseFloat(amount) > 0 && (
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Daily Interest</span>
                    <span className="text-green-400">
                      {(
                        (parseFloat(amount) * parseFloat(selectedPool.apy)) /
                        36500
                      ).toFixed(4)}{" "}
                      {selectedPool.assetSymbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Yearly Interest</span>
                    <span className="text-green-400">
                      {(
                        (parseFloat(amount) * parseFloat(selectedPool.apy)) /
                        100
                      ).toFixed(4)}{" "}
                      {selectedPool.assetSymbol}
                    </span>
                  </div>
                </div>
              )}

              {txResult && (
                <div
                  className={`mb-6 p-3 rounded-lg border ${
                    txResult.success
                      ? "bg-green-900/50 border-green-500 text-green-300"
                      : "bg-red-900/50 border-red-500 text-red-300"
                  }`}
                >
                  <p className="mb-1">{txResult.message}</p>
                  {txResult.txId && (
                    <p className="text-xs overflow-x-hidden text-ellipsis">
                      Transaction ID: {txResult.txId.substring(0, 10)}...
                      {txResult.txId.substring(txResult.txId.length - 8)}
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!amount || parseFloat(amount) <= 0 || processingTx}
                className={`w-full btn-primary flex justify-center items-center ${
                  !amount || parseFloat(amount) <= 0 || processingTx
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {processingTx ? (
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
                    Processing...
                  </>
                ) : mode === "deposit" ? (
                  "Deposit"
                ) : (
                  "Withdraw"
                )}
              </button>
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-12">
                <h2 className="text-xl font-bold mb-2">Select a Pool</h2>
                <p className="text-gray-400">
                  Choose a lending pool from the table to begin.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
