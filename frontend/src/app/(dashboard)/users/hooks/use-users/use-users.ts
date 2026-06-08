import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { MOCK_USERS } from "../../data/mock-data";
import type { User, UserFilters } from "../../types";

const USERS_QUERY_KEY = ["users"] as const;

/**
 * Fetches and filters users/members.
 *
 * Currently returns mock data with client-side filtering.
 * When the backend is ready, replace the `queryFn` with:
 *   `queryFn: () => api.get<User[]>("/users", { params: filters })`
 */
export function useUsers({ filters }: { filters?: UserFilters } = {}) {
  const query = useQuery<User[]>({
    queryKey: [...USERS_QUERY_KEY, filters],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return MOCK_USERS;
    },
    staleTime: 5 * 60 * 1000,
  });

  const filteredData = useMemo(() => {
    if (!query.data || !filters) return query.data;

    return query.data.filter((user) => {
      if (filters.role && user.role !== filters.role) return false;
      if (filters.status && user.status !== filters.status) return false;
      if (filters.householdId && user.householdId !== filters.householdId)
        return false;
      if (
        filters.search &&
        !user.name?.toLowerCase().includes(filters.search.toLowerCase()) &&
        !user.email.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [query.data, filters]);

  return {
    ...query,
    data: filteredData,
  };
}
