"use client";

import { useState, useEffect } from "react";
import SentimentCard from "@/components/SentimentCard";
import { fetchSentiment, AssetSentiment } from "@/lib/sentimentUtils";

export default function SentimentPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [sentiments, setSentiments] = useState<AssetSentiment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // List of assets to fetch sentiment for
        const assets = ["BTC", "ETH", "SUI", "SOL", "USDC", "USDT"];

        // Fetch sentiment for each asset
        const sentimentPromises = assets.map((symbol) =>
          fetchSentiment(symbol)
        );
        const results = await Promise.all(sentimentPromises);

        // Filter out null results and set state
        setSentiments(results.filter(Boolean) as AssetSentiment[]);
      } catch (err) {
        console.error("Error fetching sentiment data:", err);
        setError("Failed to fetch sentiment data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sentiment Analysis</h1>
        <p className="text-gray-400">
          Real-time market sentiment based on social media analysis using Eliza
          OS and Gemini AI.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center min-h-[300px]">
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
      )}

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sentiments.map((sentiment) => (
            <SentimentCard key={sentiment.symbol} sentiment={sentiment} />
          ))}
        </div>
      )}

      <div className="mt-12 p-6 card">
        <h2 className="text-2xl font-bold mb-4">About Sentiment Analysis</h2>
        <p className="mb-4">
          LendX AI uses advanced natural language processing to analyze social
          media posts and determine market sentiment for various assets.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-xl font-bold mb-2">How It Works</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Social media data is scraped from Twitter using Eliza OS</li>
              <li>Text is processed and analyzed using Gemini AI models</li>
              <li>
                Sentiment scores are computed based on positive/negative signals
              </li>
              <li>
                AI recommendations are generated based on sentiment patterns
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Reading the Scores</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                Scores range from -1.0 (extremely negative) to +1.0 (extremely
                positive)
              </li>
              <li>
                Higher confidence means more consistent sentiment across sources
              </li>
              <li>Volume indicates how many posts were analyzed</li>
              <li>
                Key phrases show common themes found in the analyzed content
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
