/** Dashboard-specific enums and constants. */

export enum DashboardMetric {
  TOTAL_MEMBERS = "total_members",
  ACTIVE_TASKS = "active_tasks",
  MONTHLY_SPENDING = "monthly_spending",
  UPCOMING_PAYMENTS = "upcoming_payments",
}

export enum ChartTimeRange {
  SEVEN_DAYS = "7d",
  THIRTY_DAYS = "30d",
  NINETY_DAYS = "90d",
}

export enum ActivityType {
  TASK_COMPLETED = "task_completed",
  TASK_CREATED = "task_created",
  MEMBER_JOINED = "member_joined",
  PAYMENT_MADE = "payment_made",
  SUBSCRIPTION_ADDED = "subscription_added",
}

export const CHART_TIME_RANGE_LABELS: Record<ChartTimeRange, string> = {
  [ChartTimeRange.SEVEN_DAYS]: "7 days",
  [ChartTimeRange.THIRTY_DAYS]: "30 days",
  [ChartTimeRange.NINETY_DAYS]: "90 days",
};
