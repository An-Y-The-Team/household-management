"use client";

import { useState } from "react";

import { Plus, Search } from "lucide-react";

import { UsersTableSkeleton } from "@/app/(dashboard)/users/components/users-table-skeleton/users-table-skeleton";
import { UsersTable } from "@/app/(dashboard)/users/components/users-table/users-table";
import {
  USER_ROLE_LABELS,
  USER_STATUS_LABELS,
} from "@/app/(dashboard)/users/constants";
import { useUsers } from "@/app/(dashboard)/users/hooks/use-users/use-users";
import type { UserFilters } from "@/app/(dashboard)/users/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UsersPage() {
  const [filters, setFilters] = useState<UserFilters>({});
  const { data: users, isLoading } = useUsers({ filters });

  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }));
  };

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
          <h1 className="text-2xl font-semibold tracking-tight">Members</h1>
          <p className="text-muted-foreground text-sm">
            Manage household members across all your homes
            {users && (
              <span className="ml-1">
                · {users.length} member{users.length !== 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-4" />
          Invite Member
        </Button>
      </div>

      {/* ── Filters ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
          <Input
            placeholder="Search members…"
            className="pl-9"
            value={filters.search ?? ""}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <Select
          value={filters.role ?? "all"}
          onValueChange={(v: string | null) =>
            handleFilterChange("role", v || "all")
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {Object.entries(USER_ROLE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status ?? "all"}
          onValueChange={(v: string | null) =>
            handleFilterChange("status", v || "all")
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {Object.entries(USER_STATUS_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Table ────────────────────────────────────────────── */}
      {isLoading ? <UsersTableSkeleton /> : <UsersTable users={users ?? []} />}
    </div>
  );
}
