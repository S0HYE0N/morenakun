"use client";

import Image from "next/image";
import NavItem from "./NavItem";
import { NAV_ITEMS } from "@/constants/NavItem";

export default function Sidebar({ open }: { open: boolean }) {
  const base = "w-64 bg-white border-r border-gray-200 shadow-lg bg-[#FAFAFA]";
  const show = "block";
  const hide = "hidden";

  return (
    <aside className={`${base} ${open ? show : hide}`}>
      <div className="flex justify-center p-2">
        <Image src="/logo_2.png" width={130} height={42} alt="Logo" />
      </div>
      <nav className="w-xs h-[calc(100vh - 50px)]">
        <ul>
          {NAV_ITEMS.map((item, index) => (
            <NavItem key={"menu-item" + index} {...item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
