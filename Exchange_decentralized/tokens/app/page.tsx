import ConnectWallet from "./components/ConnectWallet";
import DepositButton from "./components/DepositButton";
import WithdrawButton from "./components/WithdrawButton";

export default function Home() {
  const userId = "user1";
  const walletAddress = "0xUSER_WALLET"; // MetaMask wallet

  return (
    <div>
      <ConnectWallet />
      <DepositButton userId={userId} />
      <WithdrawButton userId={userId} walletAddress={walletAddress} />
    </div>
  );
}
