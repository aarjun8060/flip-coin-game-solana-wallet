"use client";
 
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FlipCoinUI from "@/components/flip-coin-ui";
import { InputForm } from "@/components/input-form";
import GetAirDropsBtn from "@/components/getAirDropsBtn";
import { useState } from "react";

export default function Home() {
  const [bidAmount,setBidAmount] = useState(0);
  const [coinSide,setCoinSide] = useState("");
  const [result,setResult] = useState("")

  
  return (
    <div className="h-full w-full min-h-[100vh] bg-gradient-to-r from-yellow-300 via-red-400 to-red-500">
      <nav>

      </nav>
      <div className="flex flex-col justify-center items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to the Coin Flipper Game! 
        </h1>

        <h3 className="scroll-m-20 border-b py-2 mb-2  text-3xl font-semibold tracking-tight first:mt-0">
          Connect your Wallet : 
        </h3>
        <div className="flex space-x-3">
          <WalletMultiButton style={{}}/>
          <GetAirDropsBtn/>
        </div>

        <div className="w-11/12 flex justify-between items-center">
          {/* <StartGameDataInputField /> */}
            <InputForm
              bidAmount={bidAmount}
              setBidAmount={setBidAmount}
              coinSide={coinSide}
              setCoinSide={setCoinSide}
            />
          {/* --Flip COin Interface--- */}
            <FlipCoinUI
              bidAmount={bidAmount}
              coinSide={coinSide}
              result={result}
              setResult={setResult}
            />
        </div>

      </div>
    </div>
  );
}
