import { useQuery } from "@tanstack/react-query";

import { MOCK_DASHBOARD_DATA } from "../../data/mock-data";
import type { DashboardData } from "../../types";

const DASHBOARD_QUERY_KEY = ["dashboard"] as const;

/**
 * Fetches dashboard overview data.
 *
 * Currently returns mock data with a small simulated delay.
 * When the backend is ready, replace the `queryFn` with an API call:
 *   `queryFn: () => api.get<DashboardData>("/dashboard")`
 */
export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: async () => {
      // Simulate network delay so loading states are visible during development.
      await new Promise((resolve) => setTimeout(resolve, 600));
      return MOCK_DASHBOARD_DATA;
    },
    staleTime: 5 * 60 * 1000,
  });
}
