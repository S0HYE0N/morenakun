import Image from "next/image";
import { StatsCardsProps } from "@/types/page";

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex-col items-center bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-sm font-medium">{stat.label}</span>
            {stat.icon && <Image src={`/icons/${stat.icon}`} width={16} height={16} alt={stat.label} />}
          </div>
          <p className="text-lg font-bold" style={stat.color ? { color: stat.color } : undefined}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
