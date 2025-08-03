import { capitalize } from "@/utils/commons";
import { usePathname } from "next/navigation";
import { BreadcrumbProps } from "@/types/layout";

export default function Breadcrumb({ onToggleSidebar }: BreadcrumbProps) {
  const pathname = usePathname();
  const crumbs = pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center gap-2">
      {/* Navigation 表示/非表示 */}
      <button onClick={onToggleSidebar} aria-label="toggle-sidebar" className="hover:bg-[#F4F4F5] p-2 rounded-md">
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.6667 2.5H3.33333C2.59695 2.5 2 3.09695 2 3.83333V13.1667C2 13.903 2.59695 14.5 3.33333 14.5H12.6667C13.403 14.5 14 13.903 14 13.1667V3.83333C14 3.09695 13.403 2.5 12.6667 2.5Z"
            stroke="#3F3F46"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M6 2.5V14.5" stroke="#3F3F46" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="h-4 border-l-2 border-[#E4E4E7]"></div>
      {/* Breadcrumb */}
      <div aria-label="breadcrumb" className="flex items-center gap-2">
        {crumbs.map((crumb, idx) => (
          <span key={idx} className="text-[#09090B] flex items-center gap-2">
            {/* サブPathの場合、「/」を追加 */}
            {idx > 0 && (
              <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 640 640">
                <path
                  fill="#71717A"
                  d="M439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C266.6 515.2 246.3 515.2 233.8 502.7C221.3 490.2 221.3 469.9 233.8 457.4L371.2 320L233.9 182.6C221.4 170.1 221.4 149.8 233.9 137.3C246.4 124.8 266.7 124.8 279.2 137.3L439.2 297.3z"
                />
              </svg>
            )}
            {/* パスの最初の文字を大文字に変換（例.dashboard → Dashboard） */}
            {capitalize(crumb)}
          </span>
        ))}
      </div>
    </div>
  );
}
