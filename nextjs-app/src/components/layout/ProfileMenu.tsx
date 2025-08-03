import { useEffect, useRef, useState } from "react";
import { WORDS } from "@/assets/strings/words";
import { ProfileMenuProps } from "@/types/layout";

export default function ProfileMenu({ name, department, onLogout, onSettings }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // クリック外でメニューを閉じるためのイベントリスナー
  // メニューが開いているときのみリスナーを追加
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center gap-3 hover:bg-gray-50 px-2 py-1 rounded transition"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {/* プロフィールアイコン */}
        <div className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center">
          <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.25a7.25 7.25 0 0115 0v.25a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.25z"
            />
          </svg>
        </div>
        {/* 氏名/部署 */}
        <div className="flex flex-col items-start min-w-[80px]">
          <span className="font-semibold text-[15px] leading-tight">{name}</span>
          <span className="text-xs text-gray-500">{department}</span>
        </div>
        <svg
          className={`ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          width={18}
          height={18}
          fill="none"
          viewBox="0 0 20 20"
        >
          <path d="M6 8l4 4 4-4" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {/* ドロップダウンメニュー */}
      {open && (
        <div className="absolute z-20 right-0 mt-2 w-36 rounded-md bg-white shadow-lg border py-1">
          <button
            onClick={onSettings}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {WORDS.settings}
          </button>
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {WORDS.logout}
          </button>
        </div>
      )}
    </div>
  );
}
