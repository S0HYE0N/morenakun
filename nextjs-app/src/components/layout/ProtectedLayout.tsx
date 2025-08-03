"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <section className="flex h-screen">
      <Sidebar open={showSidebar} />
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setShowSidebar((v) => !v)} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </section>
  );
}
