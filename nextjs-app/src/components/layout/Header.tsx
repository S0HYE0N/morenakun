"use client";

import ProfileMenu from "./ProfileMenu";
import Breadcrumb from "./Breadcrumb";
import { signOut, useSession } from "next-auth/react";
import { BreadcrumbProps } from "@/types/layout";

export default function Header({ onToggleSidebar }: BreadcrumbProps) {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm border-b h-[50px] flex flex-r items-center justify-between px-2">
      {/* パンくずリスト */}
      <Breadcrumb onToggleSidebar={onToggleSidebar} />

      {/* プロフィール */}
      <ProfileMenu
        name={session?.user?.name || "ゲスト"}
        department={session?.user?.department || "所属なし"}
        onLogout={() => {
          signOut({ callbackUrl: "/login", redirect: true });
        }}
        onSettings={() => {
          /* 設定ページへ移動 */
        }}
      />
    </header>
  );
}
