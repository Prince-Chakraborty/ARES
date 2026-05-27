import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARES — Autonomous Resilient Execution Swarm",
  description: "Secure Multi-Agent AI Operating System for Autonomous Task Execution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
