"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export default function ConnectWallet() {
  const [account, setAccount] = useState<string | null>(null);

  async function connect() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask!");
    }
  }

  return (
    <button
      onClick={connect}
      className="p-2 bg-blue-500 text-white rounded"
    >
      {account ? `Connected: ${account}` : "Connect MetaMask"}
    </button>
  );
}
