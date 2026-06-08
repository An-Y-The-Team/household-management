import { SubscriptionsTableSkeleton } from "@/app/(dashboard)/subscriptions/components/subscriptions-table-skeleton/subscriptions-table-skeleton";

export default function SubscriptionsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-64 animate-pulse rounded-md bg-muted" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-28 w-full animate-pulse rounded-xl border bg-card"
          />
        ))}
      </div>
      <SubscriptionsTableSkeleton />
    </div>
  );
}
