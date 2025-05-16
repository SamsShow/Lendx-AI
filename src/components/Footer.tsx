import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-card py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LendX AI
            </h3>
            <p className="text-gray-300">
              A decentralized lending and staking platform powered by AI
              sentiment analysis on the Sui blockchain.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/lending"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Lending
                </Link>
              </li>
              <li>
                <Link
                  href="/borrowing"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Borrowing
                </Link>
              </li>
              <li>
                <Link
                  href="/staking"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Staking
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-agents"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  AI Agents
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} LendX AI. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/terms"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
