"use client";

import { useMemo, useState } from "react";

import { CreditCard, DollarSign, Plus, Search, TrendingUp } from "lucide-react";

import { SubscriptionsTableSkeleton } from "@/app/(dashboard)/subscriptions/components/subscriptions-table-skeleton/subscriptions-table-skeleton";
import { SubscriptionsTable } from "@/app/(dashboard)/subscriptions/components/subscriptions-table/subscriptions-table";
import {
  BillingCycle,
  OWNER_TYPE_LABELS,
  SUBSCRIPTION_CATEGORY_LABELS,
  SUBSCRIPTION_STATUS_LABELS,
  SubscriptionStatus,
} from "@/app/(dashboard)/subscriptions/constants";
import { useSubscriptions } from "@/app/(dashboard)/subscriptions/hooks/use-subscriptions/use-subscriptions";
import type { SubscriptionFilters } from "@/app/(dashboard)/subscriptions/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SubscriptionsPage() {
  const [filters, setFilters] = useState<SubscriptionFilters>({});
  const { data: subscriptions, isLoading } = useSubscriptions({ filters });

  // Calculate summary metrics.
  const metrics = useMemo(() => {
    if (!subscriptions)
      return { monthlySpend: 0, activeCount: 0, yearlySpend: 0 };

    const active = subscriptions.filter(
      (s) => s.status === SubscriptionStatus.ACTIVE
    );

    const monthlySpend = active.reduce((sum, s) => {
      if (s.billingCycle === BillingCycle.MONTHLY) return sum + s.amount;
      if (s.billingCycle === BillingCycle.QUARTERLY) return sum + s.amount / 3;
      if (s.billingCycle === BillingCycle.YEARLY) return sum + s.amount / 12;
      return sum;
    }, 0);

    return {
      monthlySpend,
      activeCount: active.length,
      yearlySpend: monthlySpend * 12,
    };
  }, [subscriptions]);

  const handleFilterChange = (
    key: keyof SubscriptionFilters,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }));
  };

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value || undefined }));
  };

  return (
    <div className="space-y-6">
      {/* ── Page header ──────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Subscriptions
          </h1>
          <p className="text-muted-foreground text-sm">
            Track household bills and personal subscriptions
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-4" />
          Add Subscription
        </Button>
      </div>

      {/* ── Summary cards ────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <DollarSign className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.monthlySpend.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
            <CreditCard className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Yearly Projection
            </CardTitle>
            <TrendingUp className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.yearlySpend.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Filters ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
          <Input
            placeholder="Search subscriptions…"
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
            {Object.entries(SUBSCRIPTION_STATUS_LABELS).map(
              ([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>

        <Select
          value={filters.category ?? "all"}
          onValueChange={(v: string | null) =>
            handleFilterChange("category", v || "all")
          }
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.entries(SUBSCRIPTION_CATEGORY_LABELS).map(
              ([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>

        <Select
          value={filters.ownerType ?? "all"}
          onValueChange={(v: string | null) =>
            handleFilterChange("ownerType", v || "all")
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Owner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Owners</SelectItem>
            {Object.entries(OWNER_TYPE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Table ────────────────────────────────────────────── */}
      {isLoading ? (
        <SubscriptionsTableSkeleton />
      ) : (
        <SubscriptionsTable subscriptions={subscriptions ?? []} />
      )}
    </div>
  );
}
