import { PageTitleProps } from "@/types/page";

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-col">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm text-[#71717A]">{description}</p>
      </div>
    </div>
  );
}
