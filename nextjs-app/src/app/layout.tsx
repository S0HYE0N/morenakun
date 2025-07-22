import type { Metadata } from "next";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "漏れなくん",
  description: "人事イベント基盤のタスクおよびIT資産管理システム",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="geist-sans geist-mono">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
