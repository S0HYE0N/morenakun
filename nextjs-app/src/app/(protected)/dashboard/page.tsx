import { WORDS } from "@/assets/strings/words";
import PageLayout from "@/components/page/PageLayout";
import StatsCards from "@/components/page/StatsCards";

const stats = [
  { icon: "icon_person.svg", label: WORDS.totalNumberOfEmployees, value: 5 },
  { icon: "icon_calendar.svg", label: WORDS.recentEvents, value: 0 },
  { icon: "icon_check.svg", label: WORDS.ongoingTasks, value: 2 },
  { icon: "icon_dangerMark.svg", label: WORDS.delayedTasks, value: 9, color: "#EF4444" },
];

export default function DashboardPage() {
  return (
    <PageLayout title={WORDS.dashboard} description={WORDS.dashboardDescription} stats={<StatsCards stats={stats} />}>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <section className="bg-white border rounded-lg p-4 shadow-sm">{WORDS.recentEvents}</section>
        <section className="bg-white border rounded-lg p-4 shadow-sm">{WORDS.emergencyTasks}</section>
        <section className="bg-white border rounded-lg p-4 shadow-sm">{WORDS.contractExpirationAlerts}</section>
      </div>
    </PageLayout>
  );
}
