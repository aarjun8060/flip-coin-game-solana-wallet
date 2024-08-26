import { useState } from "react";
import { Button } from "./ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, SystemProgram, Connection } from "@solana/web3.js";

export default function FlipCoinUI({ bidAmount, coinSide, result, setResult }) {
  const [isFlipping, setIsFlipping] = useState(false);
  const { publicKey, sendTransaction } = useWallet();

  const tossCoin = async () => {
    setIsFlipping(true);
    const randomVal = Math.random();
    const faceCoin = randomVal < 0.5 ? "Heads" : "Tails";
    const imageUrl =
      faceCoin === "Heads"
        ? "https://media.geeksforgeeks.org/wp-content/uploads/20231016151817/heads.png"
        : "https://media.geeksforgeeks.org/wp-content/uploads/20231016151806/tails.png";

    setTimeout(() => {
      document.getElementById("coin-image").src = imageUrl;
      setResult(faceCoin);
      setIsFlipping(false);
    }, 1000);

    if (!publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    const connection = new Connection(process.env.DEV_NET_URL);
    
    if(!connection){
        return;
    }

    let transaction;
    if(result === coinSide){
         transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: new PublicKey(process.env.RECEIPT_PUB_KEY), 
              lamports: 2 * bidAmount * 1e9,
            })
          );
    }else{
        transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: new PublicKey(process.env.RECEIPT_PUB_KEY),
              toPubkey: publicKey, 
              lamports: 1 * 1e9,
            })
          );
    }

    try {
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);
      console.log("Transaction sent with signature:", signature);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div className="flex w-full justify-center items-center h-fit p-10 ">
      <div className=" rounded-lg p-8 space-y-8 text-center max-w-md">
        <div
          id="coin"
          className={`w-48 coin rounded-full overflow-hidden shadow-lg mx-auto transition-transform duration-500 ease-in-out ${
            isFlipping ? "animate-spin" : ""
          }`}
        >
          <img
            id="coin-image"
            src="https://media.geeksforgeeks.org/wp-content/uploads/20231016151806/tails.png"
            alt="Coin"
            className="w-full h-full object-cover"
          />
        </div>
        {bidAmount !== 0 && !!coinSide && (
          <Button id="toss-button" onClick={tossCoin} disabled={isFlipping}>
            Toss Coin
          </Button>
        )}
        {result && (
          <p className="result mt-6 text-xl text-gray-800 transition-opacity duration-500 ease-in-out">
            Result: {result}
          </p>
        )}
      </div>
    </div>
  );
}
