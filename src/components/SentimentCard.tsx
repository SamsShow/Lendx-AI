import { FC } from "react";
import { AssetSentiment } from "@/lib/sentimentUtils";

interface SentimentCardProps {
  sentiment: AssetSentiment;
}

const SentimentCard: FC<SentimentCardProps> = ({ sentiment }) => {
  // Helper function to determine CSS classes based on sentiment score
  const getSentimentColorClass = (score: number) => {
    if (score >= 0.5) return "text-green-400";
    if (score >= 0.1) return "text-green-300";
    if (score > -0.1) return "text-gray-300";
    if (score > -0.5) return "text-red-300";
    return "text-red-400";
  };

  // Helper function to get sentiment text
  const getSentimentText = (score: number) => {
    if (score >= 0.5) return "Very Positive";
    if (score >= 0.1) return "Positive";
    if (score > -0.1) return "Neutral";
    if (score > -0.5) return "Negative";
    return "Very Negative";
  };

  // Helper function to get recommendation badge class
  const getRecommendationClass = (recommendation: string) => {
    switch (recommendation) {
      case "buy":
        return "bg-green-500";
      case "sell":
        return "bg-red-500";
      case "stake":
        return "bg-blue-500";
      case "lend":
        return "bg-purple-500";
      case "borrow":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold">{sentiment.symbol}</h3>
          <p className="text-gray-400">{sentiment.name}</p>
        </div>
        <div className="flex flex-col items-end">
          <div
            className={`text-xl font-bold ${getSentimentColorClass(
              sentiment.currentSentiment.score
            )}`}
          >
            {sentiment.currentSentiment.score.toFixed(2)}
          </div>
          <p
            className={`text-sm ${getSentimentColorClass(
              sentiment.currentSentiment.score
            )}`}
          >
            {getSentimentText(sentiment.currentSentiment.score)}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="h-2 bg-gray-700 rounded overflow-hidden">
          <div
            className={`h-full ${
              sentiment.currentSentiment.score >= 0
                ? "bg-green-500"
                : "bg-red-500"
            }`}
            style={{
              width: `${Math.abs(sentiment.currentSentiment.score) * 100}%`,
              marginLeft:
                sentiment.currentSentiment.score >= 0
                  ? "50%"
                  : `${(1 - Math.abs(sentiment.currentSentiment.score)) * 50}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>-1.0</span>
          <span>0</span>
          <span>+1.0</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-400">Confidence</span>
        <span className="font-medium">
          {(sentiment.confidenceScore * 100).toFixed(0)}%
        </span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-400">Volume</span>
        <span className="font-medium">
          {sentiment.currentSentiment.volume.toLocaleString()} posts
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {sentiment.currentSentiment.keyPhrases.map((phrase, index) => (
          <span
            key={index}
            className="bg-card border border-gray-700 rounded-full px-3 py-1 text-xs"
          >
            {phrase}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-gray-400">AI Recommendation</div>
        <div
          className={`capitalize px-3 py-1 rounded-lg text-white text-sm ${getRecommendationClass(
            sentiment.recommendation
          )}`}
        >
          {sentiment.recommendation}
        </div>
      </div>
    </div>
  );
};

export default SentimentCard;
