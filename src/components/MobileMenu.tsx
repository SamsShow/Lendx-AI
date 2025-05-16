import { FC, useState, useEffect, useRef } from "react";
import Link from "next/link";
import WalletConnect from "./WalletConnect";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleWalletConnect = (address: string) => {
    console.log("Connected wallet from mobile menu:", address);
    // You could close the menu after connection if desired
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 z-50 flex justify-end">
      <div
        ref={menuRef}
        className="bg-card w-4/5 max-w-sm h-full shadow-xl flex flex-col"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LendX AI
          </span>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-6">
          <ul className="space-y-6">
            <li>
              <Link
                href="/"
                className="block text-lg font-medium hover:text-primary transition-colors"
                onClick={onClose}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/lending"
                className="block text-lg font-medium hover:text-primary transition-colors"
                onClick={onClose}
              >
                Lending
              </Link>
            </li>
            <li>
              <Link
                href="/borrowing"
                className="block text-lg font-medium hover:text-primary transition-colors"
                onClick={onClose}
              >
                Borrowing
              </Link>
            </li>
            <li>
              <Link
                href="/staking"
                className="block text-lg font-medium hover:text-primary transition-colors"
                onClick={onClose}
              >
                Staking
              </Link>
            </li>
            <li>
              <Link
                href="/sentiment"
                className="block text-lg font-medium hover:text-primary transition-colors"
                onClick={onClose}
              >
                Sentiment
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="block text-lg font-medium hover:text-primary transition-colors"
                onClick={onClose}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block text-lg font-medium hover:text-primary transition-colors"
                onClick={onClose}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-6 border-t border-gray-700">
          <WalletConnect onConnect={handleWalletConnect} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
