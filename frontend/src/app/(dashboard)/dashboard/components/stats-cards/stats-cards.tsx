"use client";

import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  ListTodo,
  TrendingUp,
  Users,
} from "lucide-react";

import { DashboardMetric } from "@/app/(dashboard)/dashboard/constants";
import type { DashboardStat } from "@/app/(dashboard)/dashboard/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/cn";

const METRIC_ICONS: Record<DashboardMetric, React.ElementType> = {
  [DashboardMetric.TOTAL_MEMBERS]: Users,
  [DashboardMetric.ACTIVE_TASKS]: ListTodo,
  [DashboardMetric.MONTHLY_SPENDING]: CreditCard,
  [DashboardMetric.UPCOMING_PAYMENTS]: TrendingUp,
};

export function StatsCards({ stats }: { stats: DashboardStat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = METRIC_ICONS[stat.metric];
        const isPositiveChange = stat.change > 0;

        return (
          <Card key={stat.metric}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <Icon className="text-muted-foreground size-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.formattedValue}</div>
              {stat.change !== 0 && (
                <p
                  className={cn(
                    "text-xs flex items-center gap-1 mt-1",
                    isPositiveChange && stat.trend === "up"
                      ? "text-emerald-600"
                      : isPositiveChange && stat.trend === "down"
                        ? "text-red-500"
                        : !isPositiveChange && stat.trend === "up"
                          ? "text-red-500"
                          : "text-emerald-600"
                  )}
                >
                  {isPositiveChange ? (
                    <ArrowUp className="size-3" />
                  ) : (
                    <ArrowDown className="size-3" />
                  )}
                  {Math.abs(stat.change)}% from last month
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
