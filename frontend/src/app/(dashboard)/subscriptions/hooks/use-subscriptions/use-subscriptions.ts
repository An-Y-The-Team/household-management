import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { MOCK_SUBSCRIPTIONS } from "../../data/mock-data";
import type { Subscription, SubscriptionFilters } from "../../types";

const SUBSCRIPTIONS_QUERY_KEY = ["subscriptions"] as const;

export function useSubscriptions({
  filters,
}: { filters?: SubscriptionFilters } = {}) {
  const query = useQuery<Subscription[]>({
    queryKey: [...SUBSCRIPTIONS_QUERY_KEY, filters],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return MOCK_SUBSCRIPTIONS;
    },
    staleTime: 5 * 60 * 1000,
  });

  const filteredData = useMemo(() => {
    if (!query.data || !filters) return query.data;

    return query.data.filter((sub) => {
      if (filters.status && sub.status !== filters.status) return false;
      if (filters.category && sub.category !== filters.category) return false;
      if (filters.ownerType && sub.ownerType !== filters.ownerType)
        return false;
      if (filters.householdId && sub.householdId !== filters.householdId)
        return false;
      if (
        filters.search &&
        !sub.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !sub.description?.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [query.data, filters]);

  return { ...query, data: filteredData };
}
