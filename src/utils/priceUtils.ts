/**
 * Utility functions for price formatting and conversions
 */

/**
 * Format a number or string as USD currency
 * @param value - The value to format
 * @param maximumFractionDigits - Maximum fraction digits (default: 2)
 * @returns Formatted USD string
 */
export const formatUSD = (
  value: number | string,
  maximumFractionDigits = 2
): string => {
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(numValue);
};

/**
 * Format a crypto amount with appropriate decimals
 * @param value - The value to format
 * @param maximumFractionDigits - Maximum fraction digits (default: 6)
 * @returns Formatted string
 */
export const formatCrypto = (
  value: number | string,
  maximumFractionDigits = 6
): string => {
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(numValue);
};

/**
 * Format a percentage value
 * @param value - The value to format (e.g., 0.05 for 5%)
 * @param maximumFractionDigits - Maximum fraction digits (default: 2)
 * @returns Formatted percentage string
 */
export const formatPercent = (
  value: number | string,
  maximumFractionDigits = 2
): string => {
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits,
  }).format(numValue / 100);
};

/**
 * Convert between different assets using a price feed
 * @param amount - Amount to convert
 * @param fromAsset - Symbol of the asset to convert from
 * @param toAsset - Symbol of the asset to convert to
 * @param priceMap - Map of asset prices in USD
 * @returns Converted amount or null if conversion not possible
 */
export const convertAssets = (
  amount: number | string,
  fromAsset: string,
  toAsset: string,
  priceMap: Record<string, number>
): number | null => {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (!priceMap[fromAsset] || !priceMap[toAsset]) {
    return null;
  }

  const fromAssetPriceUSD = priceMap[fromAsset];
  const toAssetPriceUSD = priceMap[toAsset];

  const valueUSD = numAmount * fromAssetPriceUSD;
  const convertedAmount = valueUSD / toAssetPriceUSD;

  return convertedAmount;
};

/**
 * Get a mock price map for testing purposes
 * @returns Record of asset symbols to USD prices
 */
export const getMockPriceMap = (): Record<string, number> => {
  return {
    SUI: 2.0, // $2.00 per SUI
    ETH: 3000.0, // $3,000.00 per ETH
    BTC: 50000.0, // $50,000.00 per BTC
    USDC: 1.0, // $1.00 per USDC
    USDT: 1.0, // $1.00 per USDT
    SOL: 100.0, // $100.00 per SOL
  };
};
