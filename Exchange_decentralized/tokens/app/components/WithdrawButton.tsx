"use client";
export default function WithdrawButton({ userId, walletAddress }: { userId: string; walletAddress: string }) {
  async function withdraw(amount: number) {
    const res = await fetch("/api/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userId, walletAddress, amount })
    });
    const data = await res.json();
    alert(data.message);
  }

  return <button onClick={() => withdraw(50)}>Withdraw 50 Tokens</button>;
}
