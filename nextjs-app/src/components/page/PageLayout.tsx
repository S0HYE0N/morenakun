import PageTitle from "./PageTitle";
import { PageLayoutProps } from "@/types/page";

export default function PageLayout({ title, description, actions, stats, filter, children }: PageLayoutProps) {
  return (
    <section className="space-y-4">
      {/* ヘッダー(タイトル/ページ説明/アクションボタン) */}
      <div className="flex items-start justify-between gap-4">
        <PageTitle title={title} description={description} />
        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      {/* 集計 */}
      {stats && <div>{stats}</div>}

      {/* 検索/フィルター */}
      {filter && <div>{filter}</div>}

      {/* 表/メインコンテンツ */}
      <div>{children}</div>
    </section>
  );
}
