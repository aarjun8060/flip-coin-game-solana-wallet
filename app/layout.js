import { Inter } from "next/font/google";
import "./globals.css";
import AppWalletProvider from "@/providers/app-wallet-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flip Coin | Solana Wallet",
  description: "flipping a coin with solana wallet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AppWalletProvider>
        {children}
      </AppWalletProvider>
      </body>
    </html>
  );
}
