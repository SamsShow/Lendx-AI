"use client";

import { useState, useEffect } from "react";
import {
  getMockBorrowingPools,
  BorrowingPool,
  getMockAssets,
  Asset,
  borrow,
  repay,
} from "@/lib/contractUtils";

export default function BorrowingPage() {
  const [pools, setPools] = useState<BorrowingPool[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPool, setSelectedPool] = useState<BorrowingPool | null>(null);
  const [mode, setMode] = useState<"borrow" | "repay">("borrow");
  const [amount, setAmount] = useState<string>("");
  const [collateralAsset, setCollateralAsset] = useState<string>("");
  const [collateralAmount, setCollateralAmount] = useState<string>("");
  const [processingTx, setProcessingTx] = useState<boolean>(false);
  const [txResult, setTxResult] = useState<{
    success: boolean;
    message: string;
    txId?: string;
  } | null>(null);

  // Mock wallet address (in a real app, this would come from wallet connection)
  const walletAddress = "0x7f1dc38c7196d9333582d1266b9d912e30b4e8d4";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, these would be API calls to your backend
        const mockPools = getMockBorrowingPools();
        const mockAssets = getMockAssets();

        setPools(mockPools);
        setAssets(mockAssets);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePoolSelect = (pool: BorrowingPool) => {
    setSelectedPool(pool);
    setAmount("");
    setCollateralAsset(assets[0]?.address || "");
    setCollateralAmount("");
    setTxResult(null);
  };

  const handleModeChange = (newMode: "borrow" | "repay") => {
    setMode(newMode);
    setAmount("");
    setCollateralAmount("");
    setTxResult(null);
  };

  const calculateRequiredCollateral = (): string => {
    if (!selectedPool || !amount || parseFloat(amount) <= 0) {
      return "0";
    }

    const collateralRatio = parseFloat(selectedPool.collateralRatio) / 100;
    const selectedAsset = assets.find((a) => a.address === collateralAsset);

    if (!selectedAsset) {
      return "0";
    }

    // Simple calculation for demo purposes
    // In a real app, this would use price feeds for accurate conversion
    const assetPrice =
      parseFloat(selectedAsset.value) / parseFloat(selectedAsset.balance);
    const borrowValue = parseFloat(amount);
    const requiredCollateralValue = borrowValue * collateralRatio;
    const requiredCollateralAmount = requiredCollateralValue / assetPrice;

    return requiredCollateralAmount.toFixed(4);
  };

  const handleSubmit = async () => {
    if (!selectedPool || !amount || parseFloat(amount) <= 0) {
      return;
    }

    setProcessingTx(true);
    setTxResult(null);

    try {
      if (mode === "borrow") {
        if (
          !collateralAsset ||
          !collateralAmount ||
          parseFloat(collateralAmount) <= 0
        ) {
          throw new Error("Please provide collateral information");
        }

        const result = await borrow(
          walletAddress,
          selectedPool.id,
          amount,
          collateralAsset,
          collateralAmount
        );

        setTxResult({
          success: result.success,
          message: result.success
            ? `Successfully borrowed ${amount} ${selectedPool.assetSymbol}`
            : result.error || "Transaction failed",
          txId: result.txId,
        });
      } else {
        const result = await repay(walletAddress, selectedPool.id, amount);
        setTxResult({
          success: result.success,
          message: result.success
            ? `Successfully repaid ${amount} ${selectedPool.assetSymbol}`
            : result.error || "Transaction failed",
          txId: result.txId,
        });
      }
    } catch (err) {
      console.error("Transaction error:", err);
      setTxResult({
        success: false,
        message:
          err instanceof Error ? err.message : "An unexpected error occurred",
      });
    } finally {
      setProcessingTx(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Borrowing</h1>
        <p className="text-gray-400">
          Borrow assets using your crypto as collateral with AI-powered risk
          management.
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
                Available Borrowing Pools
              </h2>
              <table className="w-full">
                <thead className="text-left text-gray-400 text-sm">
                  <tr>
                    <th className="pb-4">Asset</th>
                    <th className="pb-4">Available</th>
                    <th className="pb-4">Interest Rate</th>
                    <th className="pb-4">Collateral Ratio</th>
                    <th className="pb-4">Total Borrowed</th>
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
                        ${Number(pool.available).toLocaleString()}
                      </td>
                      <td className="py-4 text-red-400">
                        {pool.interestRate}%
                      </td>
                      <td className="py-4">{pool.collateralRatio}%</td>
                      <td className="py-4">
                        ${Number(pool.totalBorrowed).toLocaleString()}
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
            <h2 className="text-xl font-bold mb-4">AI-Enhanced Borrowing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">How It Works</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Deposit collateral to secure your loan</li>
                  <li>Borrow available assets up to your collateral limit</li>
                  <li>Make repayments at any time</li>
                  <li>AI monitors collateral value to prevent liquidation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">AI Advantage</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Sentiment-based liquidation risk prediction</li>
                  <li>
                    Dynamic collateral requirements based on market volatility
                  </li>
                  <li>Automated liquidation protection alerts</li>
                  <li>Optimized interest rate based on borrowing patterns</li>
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
                <span className="text-red-400">
                  {selectedPool.interestRate}% APR
                </span>
              </div>

              <div className="flex border border-gray-700 rounded-lg mb-6">
                <button
                  className={`w-1/2 py-2 text-center rounded-l-lg ${
                    mode === "borrow"
                      ? "bg-primary text-white"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleModeChange("borrow")}
                >
                  Borrow
                </button>
                <button
                  className={`w-1/2 py-2 text-center rounded-r-lg ${
                    mode === "repay" ? "bg-primary text-white" : "text-gray-400"
                  }`}
                  onClick={() => handleModeChange("repay")}
                >
                  Repay
                </button>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium mb-2"
                >
                  {mode === "borrow" ? "Borrow Amount" : "Repay Amount"}
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
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-400">
                      {selectedPool.assetSymbol}
                    </span>
                  </div>
                </div>
              </div>

              {mode === "borrow" && (
                <div className="mb-6">
                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">Collateral Ratio</span>
                      <span className="font-medium">
                        {selectedPool.collateralRatio}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        Liquidation Threshold
                      </span>
                      <span className="font-medium">
                        {parseFloat(selectedPool.collateralRatio) * 0.8}%
                      </span>
                    </div>
                  </div>

                  <label
                    htmlFor="collateralAsset"
                    className="block text-sm font-medium mb-2"
                  >
                    Collateral Asset
                  </label>
                  <select
                    id="collateralAsset"
                    value={collateralAsset}
                    onChange={(e) => setCollateralAsset(e.target.value)}
                    className="w-full bg-gray-800 rounded-lg border border-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                  >
                    {assets.map((asset) => (
                      <option key={asset.address} value={asset.address}>
                        {asset.symbol} - Balance: {asset.balance}
                      </option>
                    ))}
                  </select>

                  <label
                    htmlFor="collateralAmount"
                    className="block text-sm font-medium mb-2"
                  >
                    Collateral Amount
                  </label>
                  <div className="relative">
                    <input
                      id="collateralAmount"
                      type="number"
                      min="0"
                      step="0.01"
                      value={collateralAmount}
                      onChange={(e) => setCollateralAmount(e.target.value)}
                      className="w-full bg-gray-800 rounded-lg border border-gray-700 p-2 pr-16 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder={
                        amount ? `Min ${calculateRequiredCollateral()}` : "0.00"
                      }
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-400">
                        {assets.find((a) => a.address === collateralAsset)
                          ?.symbol || ""}
                      </span>
                    </div>
                  </div>

                  {amount && parseFloat(amount) > 0 && (
                    <p className="text-sm text-gray-400 mt-2">
                      Minimum required collateral:{" "}
                      {calculateRequiredCollateral()}{" "}
                      {assets.find((a) => a.address === collateralAsset)
                        ?.symbol || ""}
                    </p>
                  )}
                </div>
              )}

              {amount && parseFloat(amount) > 0 && (
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Interest (Daily)</span>
                    <span className="text-red-400">
                      {(
                        (parseFloat(amount) *
                          parseFloat(selectedPool.interestRate)) /
                        36500
                      ).toFixed(4)}{" "}
                      {selectedPool.assetSymbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Interest (Monthly)</span>
                    <span className="text-red-400">
                      {(
                        (parseFloat(amount) *
                          parseFloat(selectedPool.interestRate)) /
                        1200
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
                disabled={
                  !amount ||
                  parseFloat(amount) <= 0 ||
                  (mode === "borrow" &&
                    (!collateralAmount ||
                      parseFloat(collateralAmount) <
                        parseFloat(calculateRequiredCollateral()))) ||
                  processingTx
                }
                className={`w-full btn-primary flex justify-center items-center ${
                  !amount ||
                  parseFloat(amount) <= 0 ||
                  (mode === "borrow" &&
                    (!collateralAmount ||
                      parseFloat(collateralAmount) <
                        parseFloat(calculateRequiredCollateral()))) ||
                  processingTx
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
                ) : mode === "borrow" ? (
                  "Borrow"
                ) : (
                  "Repay"
                )}
              </button>

              <div className="mt-4 bg-blue-900/30 border border-blue-700 rounded-lg p-3 text-blue-300 text-sm">
                <p>
                  AI-powered liquidation protection will monitor your collateral
                  value and alert you if it approaches the liquidation
                  threshold.
                </p>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-12">
                <h2 className="text-xl font-bold mb-2">Select a Pool</h2>
                <p className="text-gray-400">
                  Choose a borrowing pool from the table to begin.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
