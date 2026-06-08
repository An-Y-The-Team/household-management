import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { MOCK_TASKS } from "../../data/mock-data";
import type { Task, TaskFilters } from "../../types";

const TASKS_QUERY_KEY = ["tasks"] as const;

/**
 * Fetches and filters tasks.
 *
 * Currently filters mock data client-side.
 * When the backend is ready, replace the `queryFn` with:
 *   `queryFn: () => api.get<Task[]>("/tasks", { params: filters })`
 */
export function useTasks({ filters }: { filters?: TaskFilters } = {}) {
  const query = useQuery<Task[]>({
    queryKey: [...TASKS_QUERY_KEY, filters],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return MOCK_TASKS;
    },
    staleTime: 5 * 60 * 1000,
  });

  // Client-side filtering (would be server-side with a real backend).
  const filteredData = useMemo(() => {
    if (!query.data || !filters) return query.data;

    return query.data.filter((task) => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      if (filters.category && task.category !== filters.category) return false;
      if (filters.assigneeId && task.assigneeId !== filters.assigneeId)
        return false;
      if (filters.householdId && task.householdId !== filters.householdId)
        return false;
      if (
        filters.search &&
        !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !task.description?.toLowerCase().includes(filters.search.toLowerCase())
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
