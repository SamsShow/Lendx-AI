import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="flex flex-col items-center justify-center mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          LendX AI
        </h1>
        <p className="text-xl max-w-2xl">
          A decentralized lending and staking platform powered by AI sentiment
          analysis on the Sui blockchain
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Decentralized Lending
          </h2>
          <p className="mb-4">
            Deposit stablecoins to earn interest or borrow against your crypto
            assets with AI-driven strategies.
          </p>
          <Link href="/lending" className="btn-primary inline-block">
            Explore Lending
          </Link>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-secondary">AI Staking</h2>
          <p className="mb-4">
            Stake your assets and let our AI agents maximize your yield based on
            real-time market sentiment.
          </p>
          <Link href="/staking" className="btn-secondary inline-block">
            Explore Staking
          </Link>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-accent">
            Sentiment Analysis
          </h2>
          <p className="mb-4">
            Our AI agents analyze Twitter sentiment to make informed DeFi
            decisions on your behalf.
          </p>
          <Link
            href="/sentiment"
            className="btn-primary inline-block bg-accent hover:bg-purple-600"
          >
            View Sentiment
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="rounded-full bg-primary/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Deposit Funds</h3>
            <p>
              Deposit stablecoins or crypto assets into the smart contract pools
            </p>
          </div>

          <div className="text-center p-6">
            <div className="rounded-full bg-secondary/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-secondary text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Activate AI Agent</h3>
            <p>
              Fund and activate your personal AI agent to manage your assets
            </p>
          </div>

          <div className="text-center p-6">
            <div className="rounded-full bg-accent/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-accent text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Earn Passively</h3>
            <p>
              Your AI agent makes sentiment-driven decisions to optimize your
              returns
            </p>
          </div>
        </div>
      </section>

      <section className="card mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Powered By</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Sui Blockchain</h3>
            <p>Scalable and secure foundation</p>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Pyth Network</h3>
            <p>Real-time price feeds</p>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Walrus Module</h3>
            <p>On-chain storage</p>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Gemini AI</h3>
            <p>Advanced sentiment analysis</p>
          </div>
        </div>
      </section>
    </div>
  );
}
