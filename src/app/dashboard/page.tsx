"use client";

import { useState, useEffect } from "react";
import AIAgentConfig from "@/components/AIAgentConfig";
import {
  getMockAIAgent,
  AIAgent,
  getMockUserPositions,
  UserPosition,
} from "@/lib/contractUtils";
import { format } from "date-fns";

export default function DashboardPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [agent, setAgent] = useState<AIAgent | null>(null);
  const [positions, setPositions] = useState<UserPosition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate connecting wallet
  useEffect(() => {
    // In a real app, this would check if wallet is connected
    setWalletAddress("0x7f1dc38c7196d9333582d1266b9d912e30b4e8d4");

    // Fetch agent and positions
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, these would be API calls to your backend
        const mockAgent = getMockAIAgent();
        const mockPositions = getMockUserPositions();

        setAgent(mockAgent);
        setPositions(mockPositions);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAgentActivation = (agentId: string) => {
    // In a real app, you would refresh agent data from the blockchain
    const mockAgent = getMockAIAgent();
    mockAgent.id = agentId;
    setAgent(mockAgent);
  };

  const formatDuration = (seconds: number): string => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);

    if (days > 0) {
      return `${days}d ${hours}h`;
    }

    return `${hours}h`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Agent Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {agent ? (
            <div className="card">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Agent: {agent.id}</h2>
                  <div className="flex items-center mt-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        agent.status === "active"
                          ? "bg-green-500"
                          : agent.status === "paused"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    <span className="capitalize">{agent.status}</span>
                  </div>
                </div>
                <div className="bg-card border border-gray-700 rounded-lg px-4 py-2 text-right">
                  <div className="text-xs text-gray-400">Strategy</div>
                  <div className="text-lg font-semibold capitalize">
                    {agent.strategy}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-card border border-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Capital</div>
                  <div className="text-2xl font-bold">
                    ${agent.capital} USDC
                  </div>
                </div>
                <div className="bg-card border border-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Profit</div>
                  <div className="text-2xl font-bold text-green-400">
                    +${agent.performance.totalProfit}
                  </div>
                  <div className="text-sm text-green-400">
                    ROI: +{agent.performance.roi}%
                  </div>
                </div>
                <div className="bg-card border border-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Time Active</div>
                  <div className="text-2xl font-bold">
                    {formatDuration(agent.performance.timeActive)}
                  </div>
                </div>
              </div>

              {agent.lastAction && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Last Action</h3>
                  <div className="bg-card border border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div className="capitalize font-medium">
                        {agent.lastAction.type}
                      </div>
                      <div className="text-sm text-gray-400">
                        {format(
                          new Date(agent.lastAction.timestamp),
                          "MMM d, yyyy HH:mm"
                        )}
                      </div>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-400 mr-2">Asset:</span>
                      <span>{agent.lastAction.asset}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-400 mr-2">Amount:</span>
                      <span>${agent.lastAction.amount}</span>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <span className="text-gray-400 mr-2">Reasoning:</span>
                      <span className="text-sm">{agent.lastAction.reason}</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Current Positions</h3>
                  <span className="text-gray-400 text-sm">
                    {positions.length} positions
                  </span>
                </div>

                {positions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="text-left text-gray-400 text-sm">
                        <tr>
                          <th className="pb-2">Type</th>
                          <th className="pb-2">Asset</th>
                          <th className="pb-2">Amount</th>
                          <th className="pb-2">Value</th>
                          <th className="pb-2">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {positions.map((position, index) => (
                          <tr key={index} className="border-t border-gray-700">
                            <td className="py-3 capitalize">{position.type}</td>
                            <td className="py-3">{position.assetSymbol}</td>
                            <td className="py-3">{position.amount}</td>
                            <td className="py-3">${position.valueUSD}</td>
                            <td className="py-3">
                              {position.type === "lending" && position.apy && (
                                <span className="text-green-400">
                                  {position.apy}% APY
                                </span>
                              )}
                              {position.type === "staking" && position.apy && (
                                <span className="text-blue-400">
                                  {position.apy}% APY
                                </span>
                              )}
                              {position.type === "borrowing" &&
                                position.interestRate && (
                                  <span className="text-red-400">
                                    {position.interestRate}% APR
                                  </span>
                                )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    No positions yet. The AI agent will create positions soon.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card flex items-center justify-center min-h-[400px]">
              {loading ? (
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
              ) : (
                <div className="text-center">
                  <p className="text-xl mb-4">No AI Agent Activated</p>
                  <p className="text-gray-400 mb-6">
                    Activate your first AI agent to start automated DeFi
                    operations.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          {agent ? (
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Agent Controls</h2>
              <div className="space-y-4">
                <button className="w-full btn-primary">Add Capital</button>
                <button
                  className={`w-full ${
                    agent.status === "active" ? "bg-yellow-600" : "bg-green-600"
                  } text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-colors`}
                >
                  {agent.status === "active" ? "Pause Agent" : "Resume Agent"}
                </button>
                <button className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-colors">
                  Deactivate & Withdraw
                </button>
              </div>
            </div>
          ) : (
            <AIAgentConfig
              walletAddress={walletAddress}
              onActivated={handleAgentActivation}
            />
          )}
        </div>
      </div>
    </div>
  );
}
