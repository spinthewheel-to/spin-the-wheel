import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spin The Wheel - Free Random Picker Wheel & Decision Maker",
  description:
    "An interactive, customizable random picker wheel for decisions, classroom raffles, giveaways, and party games.",
  keywords: [
    "spin the wheel",
    "random picker",
    "decision maker",
    "wheel of names",
    "raffle generator",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
