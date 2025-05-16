interface Window {
  suiWallet?: {
    connect: () => Promise<{ success: boolean }>;
    disconnect: () => Promise<void>;
    getAccounts: () => Promise<string[]>;
    signAndExecuteTransaction: (transaction: any) => Promise<any>;
  };
  suiet?: {
    connect: () => Promise<{ success: boolean }>;
    disconnect: () => Promise<void>;
    getAccounts: () => Promise<string[]>;
    signAndExecuteTransaction: (transaction: any) => Promise<any>;
  };
  martian?: {
    connect: () => Promise<{ success: boolean }>;
    disconnect: () => Promise<void>;
    getAccounts: () => Promise<string[]>;
    signAndExecuteTransaction: (transaction: any) => Promise<any>;
  };
}
