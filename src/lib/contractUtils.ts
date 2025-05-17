// This is a placeholder for smart contract interactions
// In a real implementation, this would interact with the Sui blockchain

import { SuiClient } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { getSuiProvider } from "./walletUtils";

// Mock wallet functions
export interface Asset {
  symbol: string;
  name: string;
  balance: string; // String representation of balance
  value: string; // USD value
  address: string; // Contract address
}

// Mock lending pool data
export interface LendingPool {
  id: string;
  asset: string;
  assetSymbol: string;
  totalDeposited: string;
  apy: string;
  utilizationRate: string;
  minDeposit: string;
}

// Mock borrowing pool data
export interface BorrowingPool {
  id: string;
  asset: string;
  assetSymbol: string;
  totalBorrowed: string;
  interestRate: string;
  collateralRatio: string;
  available: string;
}

// Mock staking pool data
export interface StakingPool {
  id: string;
  asset: string;
  assetSymbol: string;
  totalStaked: string;
  apy: string;
  lockPeriod: number; // In days
  rewards: string;
}

// Mock user position data
export interface UserPosition {
  type: "lending" | "borrowing" | "staking";
  poolId: string;
  asset: string;
  assetSymbol: string;
  amount: string;
  valueUSD: string;
  timestamp: number;
  apy?: string; // For lending and staking
  interestRate?: string; // For borrowing
  collateralRatio?: string; // For borrowing
  rewards?: string; // For staking
}

// Mock AI agent data
export interface AIAgent {
  id: string;
  status: "active" | "inactive" | "paused";
  capital: string;
  strategy: "conservative" | "balanced" | "aggressive";
  lastAction: {
    type: "lend" | "borrow" | "stake" | "withdraw" | "repay";
    asset: string;
    amount: string;
    timestamp: number;
    reason: string;
  } | null;
  performance: {
    totalProfit: string;
    roi: string;
    timeActive: number; // In seconds
  };
}

// Mock data generators
export const getMockAssets = (): Asset[] => {
  return [
    {
      symbol: "SUI",
      name: "Sui Network",
      balance: "1452.75",
      value: "2905.50",
      address: "0x2::sui::SUI",
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      balance: "5000.00",
      value: "5000.00",
      address: "0x3c2cf35a0b7558b508760cd9f66a3c9475c7e589::usdc::USDC",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: "1.25",
      value: "3750.00",
      address:
        "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::eth::ETH",
    },
  ];
};

export const getMockLendingPools = (): LendingPool[] => {
  return [
    {
      id: "lp-sui-01",
      asset: "0x2::sui::SUI",
      assetSymbol: "SUI",
      totalDeposited: "1500000",
      apy: "4.5",
      utilizationRate: "65",
      minDeposit: "10",
    },
    {
      id: "lp-usdc-01",
      asset: "0x3c2cf35a0b7558b508760cd9f66a3c9475c7e589::usdc::USDC",
      assetSymbol: "USDC",
      totalDeposited: "5000000",
      apy: "6.2",
      utilizationRate: "78",
      minDeposit: "100",
    },
    {
      id: "lp-eth-01",
      asset:
        "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::eth::ETH",
      assetSymbol: "ETH",
      totalDeposited: "800",
      apy: "3.8",
      utilizationRate: "55",
      minDeposit: "0.01",
    },
  ];
};

export const getMockBorrowingPools = (): BorrowingPool[] => {
  return [
    {
      id: "bp-sui-01",
      asset: "0x2::sui::SUI",
      assetSymbol: "SUI",
      totalBorrowed: "750000",
      interestRate: "7.8",
      collateralRatio: "150",
      available: "250000",
    },
    {
      id: "bp-usdc-01",
      asset: "0x3c2cf35a0b7558b508760cd9f66a3c9475c7e589::usdc::USDC",
      assetSymbol: "USDC",
      totalBorrowed: "3500000",
      interestRate: "5.5",
      collateralRatio: "125",
      available: "2000000",
    },
    {
      id: "bp-eth-01",
      asset:
        "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::eth::ETH",
      assetSymbol: "ETH",
      totalBorrowed: "400",
      interestRate: "6.5",
      collateralRatio: "175",
      available: "150",
    },
  ];
};

export const getMockStakingPools = (): StakingPool[] => {
  return [
    {
      id: "sp-sui-01",
      asset: "0x2::sui::SUI",
      assetSymbol: "SUI",
      totalStaked: "2500000",
      apy: "8.5",
      lockPeriod: 30,
      rewards: "SUI",
    },
    {
      id: "sp-sui-02",
      asset: "0x2::sui::SUI",
      assetSymbol: "SUI",
      totalStaked: "4000000",
      apy: "12.0",
      lockPeriod: 90,
      rewards: "SUI",
    },
    {
      id: "sp-eth-01",
      asset:
        "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::eth::ETH",
      assetSymbol: "ETH",
      totalStaked: "600",
      apy: "6.0",
      lockPeriod: 60,
      rewards: "ETH",
    },
  ];
};

export const getMockUserPositions = (): UserPosition[] => {
  return [
    {
      type: "lending",
      poolId: "lp-usdc-01",
      asset: "0x3c2cf35a0b7558b508760cd9f66a3c9475c7e589::usdc::USDC",
      assetSymbol: "USDC",
      amount: "2500.00",
      valueUSD: "2500.00",
      timestamp: Date.now() - 15 * 24 * 3600 * 1000, // 15 days ago
      apy: "6.2",
    },
    {
      type: "staking",
      poolId: "sp-sui-01",
      asset: "0x2::sui::SUI",
      assetSymbol: "SUI",
      amount: "500.00",
      valueUSD: "1000.00",
      timestamp: Date.now() - 10 * 24 * 3600 * 1000, // 10 days ago
      apy: "8.5",
      rewards: "3.5",
    },
    {
      type: "borrowing",
      poolId: "bp-usdc-01",
      asset: "0x3c2cf35a0b7558b508760cd9f66a3c9475c7e589::usdc::USDC",
      assetSymbol: "USDC",
      amount: "1000.00",
      valueUSD: "1000.00",
      timestamp: Date.now() - 5 * 24 * 3600 * 1000, // 5 days ago
      interestRate: "5.5",
      collateralRatio: "150",
    },
  ];
};

export const getMockAIAgent = (): AIAgent => {
  return {
    id: "agent-001",
    status: "active",
    capital: "1000.00",
    strategy: "balanced",
    lastAction: {
      type: "lend",
      asset: "USDC",
      amount: "500.00",
      timestamp: Date.now() - 2 * 3600 * 1000, // 2 hours ago
      reason:
        "Detected positive sentiment for stablecoins due to market uncertainty",
    },
    performance: {
      totalProfit: "25.75",
      roi: "2.58",
      timeActive: 14 * 24 * 3600, // 14 days in seconds
    },
  };
};

// Mock contract interaction functions
export const deposit = async (
  walletAddress: string,
  poolId: string,
  amount: string
): Promise<{ success: boolean; txId?: string; error?: string }> => {
  // Simulate blockchain delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock successful transaction 95% of the time
  if (Math.random() > 0.05) {
    return {
      success: true,
      txId: `0x${Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("")}`,
    };
  } else {
    return {
      success: false,
      error: "Transaction failed due to network congestion. Please try again.",
    };
  }
};

export const withdraw = async (
  walletAddress: string,
  poolId: string,
  amount: string
): Promise<{ success: boolean; txId?: string; error?: string }> => {
  // Simulate blockchain delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock successful transaction 95% of the time
  if (Math.random() > 0.05) {
    return {
      success: true,
      txId: `0x${Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("")}`,
    };
  } else {
    return {
      success: false,
      error: "Transaction failed due to network congestion. Please try again.",
    };
  }
};

export const borrow = async (
  walletAddress: string,
  poolId: string,
  amount: string,
  collateralAsset: string,
  collateralAmount: string
): Promise<{ success: boolean; txId?: string; error?: string }> => {
  // Simulate blockchain delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock successful transaction 90% of the time
  if (Math.random() > 0.1) {
    return {
      success: true,
      txId: `0x${Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("")}`,
    };
  } else {
    return {
      success: false,
      error:
        "Transaction failed due to insufficient collateral or pool liquidity.",
    };
  }
};

export const repay = async (
  walletAddress: string,
  poolId: string,
  amount: string
): Promise<{ success: boolean; txId?: string; error?: string }> => {
  // Simulate blockchain delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock successful transaction 95% of the time
  if (Math.random() > 0.05) {
    return {
      success: true,
      txId: `0x${Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("")}`,
    };
  } else {
    return {
      success: false,
      error: "Transaction failed. Please check your balance and try again.",
    };
  }
};

export const stake = async (
  walletAddress: string,
  poolId: string,
  amount: string
): Promise<{ success: boolean; txId?: string; error?: string }> => {
  // Simulate blockchain delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock successful transaction 95% of the time
  if (Math.random() > 0.05) {
    return {
      success: true,
      txId: `0x${Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("")}`,
    };
  } else {
    return {
      success: false,
      error: "Transaction failed. Please check your balance and try again.",
    };
  }
};

export const unstake = async (
  walletAddress: string,
  poolId: string,
  amount: string
): Promise<{ success: boolean; txId?: string; error?: string }> => {
  // Simulate blockchain delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock successful transaction 95% of the time
  if (Math.random() > 0.05) {
    return {
      success: true,
      txId: `0x${Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("")}`,
    };
  } else {
    return {
      success: false,
      error: "Transaction failed due to lock period restrictions.",
    };
  }
};

export const activateAIAgent = async (
  walletAddress: string,
  capital: string,
  strategy: "conservative" | "balanced" | "aggressive"
): Promise<{ success: boolean; agentId?: string; error?: string }> => {
  // Simulate blockchain delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Mock successful transaction 90% of the time
  if (Math.random() > 0.1) {
    return {
      success: true,
      agentId: `agent-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
    };
  } else {
    return {
      success: false,
      error:
        "Failed to activate AI agent. Please check your balance and try again.",
    };
  }
};
