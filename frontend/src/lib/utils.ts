import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
    };
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEthereumProvider = () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    return window.ethereum;
  }
  return null;
};

export const isMetaMaskInstalled = () => {
  const ethereum = getEthereumProvider();
  return ethereum && ethereum.isMetaMask;
};
