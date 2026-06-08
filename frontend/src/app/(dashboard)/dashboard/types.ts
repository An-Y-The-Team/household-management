import type { ActivityType, DashboardMetric } from "./constants";

export interface DashboardStat {
  metric: DashboardMetric;
  label: string;
  value: number;
  /** Formatted display value (e.g. "$1,234" or "12"). */
  formattedValue: string;
  /** Percentage change vs. previous period — positive = up, negative = down. */
  change: number;
  /** Whether an increase in this metric is positive ("up") or negative ("down"). */
  trend: "up" | "down";
}

export interface ChartDataPoint {
  date: string;
  tasksCompleted: number;
  tasksCreated: number;
}

export interface SpendingByCategory {
  category: string;
  amount: number;
  fill: string;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  description: string;
  user: string;
  timestamp: string;
}

export interface UpcomingPayment {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
}

export interface DashboardData {
  stats: DashboardStat[];
  activityChart: ChartDataPoint[];
  spendingChart: SpendingByCategory[];
  recentActivity: ActivityItem[];
  upcomingPayments: UpcomingPayment[];
}
