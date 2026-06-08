"use client";

import { useMemo, useState } from "react";

import { AppCard } from "@/app/(dashboard)/apps/app-card/app-card";
import { MOCK_INTEGRATIONS } from "@/app/(dashboard)/apps/data/mock-data";
import { Input } from "@/components/ui/input";

export default function AppsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = useMemo(() => {
    if (!searchQuery) return MOCK_INTEGRATIONS;
    return MOCK_INTEGRATIONS.filter(
      (app) =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Apps & Integrations
          </h1>
          <p className="text-muted-foreground text-sm">
            Connect third-party services to automate your household.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground text-sm">
            No integrations found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
