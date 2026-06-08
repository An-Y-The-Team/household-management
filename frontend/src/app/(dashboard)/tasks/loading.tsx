import { TasksTableSkeleton } from "@/app/(dashboard)/tasks/components/tasks-table-skeleton/tasks-table-skeleton";

export default function TasksLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-32 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-64 animate-pulse rounded-md bg-muted" />
        </div>
      </div>
      <TasksTableSkeleton />
    </div>
  );
}
