"use client";

import { LogoutButton } from "@/components/AuthButton";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      {status === "authenticated" && <div>hello, {session?.user?.name}</div>}
      <LogoutButton />
    </div>
  );
}
