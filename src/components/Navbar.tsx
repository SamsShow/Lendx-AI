"use client";

import Link from "next/link";
import { FC, useState } from "react";
import WalletConnect from "./WalletConnect";
import MobileMenu from "./MobileMenu";

const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleWalletConnect = (address: string) => {
    console.log("Connected wallet:", address);
    // You can add additional logic here if needed
  };

  return (
    <>
      <nav className="bg-card shadow-md py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            LendX AI
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link
              href="/lending"
              className="hover:text-primary transition-colors"
            >
              Lending
            </Link>
            <Link
              href="/borrowing"
              className="hover:text-primary transition-colors"
            >
              Borrowing
            </Link>
            <Link
              href="/staking"
              className="hover:text-primary transition-colors"
            >
              Staking
            </Link>
            <Link
              href="/sentiment"
              className="hover:text-primary transition-colors"
            >
              Sentiment
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <WalletConnect onConnect={handleWalletConnect} />
            </div>

            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
