"use client";

import { useState } from "react";

import { Plus, Search } from "lucide-react";

import { TasksTableSkeleton } from "@/app/(dashboard)/tasks/components/tasks-table-skeleton/tasks-table-skeleton";
import { TasksTable } from "@/app/(dashboard)/tasks/components/tasks-table/tasks-table";
import {
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from "@/app/(dashboard)/tasks/constants";
import { useTasks } from "@/app/(dashboard)/tasks/hooks/use-tasks/use-tasks";
import type { TaskFilters } from "@/app/(dashboard)/tasks/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TasksPage() {
  const [filters, setFilters] = useState<TaskFilters>({});
  const { data: tasks, isLoading } = useTasks({ filters });

  // Update a single filter field.
  const handleFilterChange = (key: keyof TaskFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }));
  };

  // Handle search input.
  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value || undefined,
    }));
  };

  return (
    <div className="space-y-6">
      {/* ── Page header ──────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground text-sm">
            Manage and track household tasks across all your homes
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-4" />
          New Task
        </Button>
      </div>

      {/* ── Filters ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
          <Input
            placeholder="Search tasks…"
            className="pl-9"
            value={filters.search ?? ""}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <Select
          value={filters.status ?? "all"}
          onValueChange={(v: string | null) =>
            handleFilterChange("status", v || "all")
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {Object.entries(TASK_STATUS_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.priority ?? "all"}
          onValueChange={(v: string | null) =>
            handleFilterChange("priority", v || "all")
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            {Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Table ────────────────────────────────────────────── */}
      {isLoading ? <TasksTableSkeleton /> : <TasksTable tasks={tasks ?? []} />}
    </div>
  );
}
