//@ts-ignore
import { NextResponse } from "next/server";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/6aa4819359484a76b202c290f0d9aaea");
const exchangeWallet = new ethers.Wallet(process.env.EXCHANGE_PRIVATE_KEY!, provider);

const tokenABI = [
  "function transfer(address to, uint256 amount) public returns (bool)"
];
const TOKEN_ADDRESS = "0x55023cb7c105a502ee9f0229f80224cdfcf3a889";
const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenABI, exchangeWallet);

// Simulated DB
let balances: Record<string, number> = {};

export async function POST(req: Request) {
  const { user, walletAddress, amount } = await req.json();

  if ((balances[user] || 0) < amount) {
    return NextResponse.json({ success: false, error: "Insufficient balance" }, { status: 400 });
  }

  try {
    const value = ethers.parseUnits(amount.toString(), 18);
    const tx = await tokenContract.transfer(walletAddress, value);
    await tx.wait();

    balances[user] -= amount;

    return NextResponse.json({ success: true, txHash: tx.hash });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
