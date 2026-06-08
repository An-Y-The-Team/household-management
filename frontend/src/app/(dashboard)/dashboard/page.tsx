"use client";

import { ActivityChart } from "@/app/(dashboard)/dashboard/components/activity-chart/activity-chart";
import { DashboardSkeleton } from "@/app/(dashboard)/dashboard/components/dashboard-skeleton/dashboard-skeleton";
import { RecentActivity } from "@/app/(dashboard)/dashboard/components/recent-activity/recent-activity";
import { SpendingChart } from "@/app/(dashboard)/dashboard/components/spending-chart/spending-chart";
import { StatsCards } from "@/app/(dashboard)/dashboard/components/stats-cards/stats-cards";
import { UpcomingPayments } from "@/app/(dashboard)/dashboard/components/upcoming-payments/upcoming-payments";
import { useDashboard } from "@/app/(dashboard)/dashboard/hooks/use-dashboard/use-dashboard";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading || !data) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* ── Page header ──────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Overview of your households
        </p>
      </div>

      {/* ── KPI Stats ────────────────────────────────────────── */}
      <StatsCards stats={data.stats} />

      {/* ── Charts row ───────────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-7">
        <ActivityChart data={data.activityChart} />
        <SpendingChart data={data.spendingChart} />
      </div>

      {/* ── Activity + Payments row ──────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-7">
        <RecentActivity items={data.recentActivity} />
        <UpcomingPayments payments={data.upcomingPayments} />
      </div>
    </div>
  );
}
