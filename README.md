# LendX AI

A decentralized lending and staking platform that combines the power of artificial intelligence with decentralized finance. Built on the Sui blockchain and powered by the Walrus module and Pyth Network, LendX AI ensures a secure, intelligent, and high-performance financial ecosystem.

## Features

- **Core Lending/Staking Layer**: Managed by smart contracts on the Sui blockchain

  - Lending
  - Borrowing
  - Staking

- **Autonomous AI Agent Layer**: After depositing a fixed amount of capital, users activate an autonomous AI agent
  - Scrapes sentiment data from Twitter using Eliza OS
  - Computes sentiment scores using Gemini models
  - Makes autonomous DeFi decisions based on real-time sentiment
  - Operates entirely within the funded amount, ensuring bounded risk

## Technology Stack

- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Blockchain**: Sui Foundation
- **Authentication**: zkLogin
- **Data Feeds**: Pyth Network
- **On-Chain Storage**: Walrus
- **AI Components**: Eliza OS + Gemini

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Sui wallet extension

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/lendx-ai.git
   ```

2. Install dependencies

   ```
   cd lendx-ai
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file with the following:

   ```
   NEXT_PUBLIC_SUI_NETWORK=https://fullnode.testnet.sui.io:443
   ```

4. Run the development server

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - Next.js pages and routes
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and blockchain interfaces
- `/src/utils` - Helper functions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
