"use client";

import { ethers } from "ethers";

const TOKEN_ADDRESS = "YOUR_TOKEN_CONTRACT_ADDRESS";  
const EXCHANGE_WALLET = "YOUR_EXCHANGE_WALLET_ADDRESS";  

const tokenABI = [
  "function transfer(address to, uint256 amount) public returns (bool)"
];

export default function DepositButton({ userId }: { userId: string }) {
  async function deposit(amount: number) {
    if (!window.ethereum) return alert("MetaMask not installed");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenABI, signer);

    const value = ethers.parseUnits(amount.toString(), 18);

    const tx = await tokenContract.transfer(EXCHANGE_WALLET, value);
    await tx.wait();

    // Call backend to credit balance in DB
    await fetch("/api/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userId, amount, txHash: tx.hash }),
    });

    alert("Deposit successful!");
  }

  return (
    <button
      onClick={() => deposit(100)} 
      className="p-2 bg-green-500 text-white rounded"
    >
      Deposit 100 Tokens
    </button>
  );
}
