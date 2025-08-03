"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItemProps } from "@/types/layout";

export default function NavItem({ href, label, icon }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  // Base Class
  const base = "flex flex-r align-center gap-2 p-2 mx-1 hover:bg-[#F4F4F5] hover:rounded-md hover:cursor-pointer";
  // Active/Inactive Class
  const active = "text-[#171717] bg-[#F4F4F5]";
  const inactive = "text-[#3f3f46] bg-transparent";

  return (
    <li>
      <Link href={href} className={`${base} ${isActive ? active : inactive}`}>
        {icon({ active: isActive })}
        <span>{label}</span>
      </Link>
    </li>
  );
}
