export type PageTitleProps = {
  title?: string;
  description?: string;
};

export type PageLayoutProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode; // アクションボタ;
  stats?: React.ReactNode; // 集計カード領域
  filter?: React.ReactNode; // 検索/フィルター領域
  children: React.ReactNode; // メインコンテンツ(リスト/グラフ/カード等)
};

export type StatCard = {
  icon?: string; // アイコンファイル名
  label: string;
  value: number | string;
  color?: string; // tailwind カラーClass
};

export type StatsCardsProps = {
  stats: StatCard[];
};
