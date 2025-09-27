// @ts-ignore
import { NextResponse } from "next/server";

// Simulated DB (replace with real DB service)
let balances: Record<string, number> = {};

export async function POST(req: Request) {
  const { user, amount, txHash } = await req.json();

  // ✅ TODO: verify txHash on-chain using ethers if needed

  balances[user] = (balances[user] || 0) + amount;

  return NextResponse.json({ success: true, balance: balances[user] });
}
