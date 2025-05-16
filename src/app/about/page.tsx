import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">About LendX AI</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          A decentralized lending and staking platform that combines the power
          of artificial intelligence with decentralized finance.
        </p>
      </div>

      <div className="card mb-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Our Vision</h2>
        <p className="mb-4">
          LendX AI is a pioneering step toward intelligent, autonomous finance.
          By integrating sentiment-aware AI agents with robust DeFi
          infrastructure on Sui, we empower users with smart automation while
          maintaining strict financial control and transparency.
        </p>
        <p>
          With zkLogin, Pyth data, and Walrus storage, LendX AI builds a
          resilient, secure foundation for the next generation of AI-native
          decentralized finance.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">
              Core Lending/Staking Layer
            </h3>
            <p className="mb-4 text-gray-300">
              Managed by smart contracts on the Sui blockchain, offering
              essential decentralized services.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Lending with variable interest rates</li>
              <li>Borrowing with flexible collateral options</li>
              <li>Staking with optimized rewards</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-accent">
              Autonomous AI Agent Layer
            </h3>
            <p className="mb-4 text-gray-300">
              After depositing a fixed amount of capital, users activate an
              autonomous AI agent.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Scrapes sentiment data from Twitter using Eliza OS</li>
              <li>Computes sentiment scores using Gemini models</li>
              <li>
                Makes autonomous DeFi decisions based on real-time sentiment
              </li>
              <li>
                Operates entirely within the funded amount, ensuring bounded
                risk
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Technology Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3">Sui Blockchain</h3>
            <p className="text-gray-400">
              Chosen for its scalability, low latency, and zkLogin support,
              providing a secure foundation for our DeFi operations.
            </p>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3">Pyth Network</h3>
            <p className="text-gray-400">
              Provides reliable and fast market data, enabling accurate
              collateral valuation and liquidation triggers.
            </p>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3">Walrus Module</h3>
            <p className="text-gray-400">
              Securely stores agent activities, transactions, and performance
              logs, ensuring transparency and auditability.
            </p>
          </div>
        </div>
      </div>

      <div className="card max-w-5xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6">Security & Risk Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-3">Fund Isolation</h3>
            <p className="text-gray-400">
              AI agents are limited to the user-funded capital, preventing
              over-exposure and ensuring bounded risk.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Collateral Monitoring</h3>
            <p className="text-gray-400">
              Real-time pricing ensures dynamic liquidation decisions,
              protecting both borrowers and lenders.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">AI Transparency</h3>
            <p className="text-gray-400">
              On-chain logs of AI decisions and transaction justifications
              provide full transparency and auditability.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Cryptographic Integrity</h3>
            <p className="text-gray-400">
              Use of Sui's zkLogin and on-chain randomness ensures secure,
              verifiable operations.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Ready to get started?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/lending" className="btn-primary">
            Explore Lending
          </Link>
          <Link href="/staking" className="btn-secondary">
            Explore Staking
          </Link>
          <Link
            href="/dashboard"
            className="btn-primary bg-accent hover:bg-purple-600"
          >
            Activate AI Agent
          </Link>
        </div>
      </div>
    </div>
  );
}
