"use client";

import { useQuery } from "@tanstack/react-query";

import type { CurrentUser } from "@/app/(auth)/types";
import { HTTP_STATUS } from "@/constants";
import { isApiError } from "@/shared/api";

import {
  AUTH_QUERY_KEY,
  AUTH_STALE_TIME_MS,
} from "../../constants";

import { UserRole, UserStatus } from "@/app/(dashboard)/users/constants";

/**
 * Fetches the current user from the BFF. A 401 is an expected "not logged in"
 * answer (the api client throws on it), so it is surfaced via `error` and never
 * retried. Other failures retry a couple of times.
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      // MOCK: Bypass auth check while we build the backend.
      // We return a mock user object immediately.
      return {
        id: "mock-user-1",
        email: "demo@example.com",
        name: "Demo User",
        avatarUrl: "",
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        householdId: "mock-household-1",
        householdName: "Demo Household",
        joinedAt: new Date().toISOString(),
        tasksCompleted: 42,
        totalPoints: 1337,
      } as CurrentUser;
      
      // Real implementation below:
      // return api.get<CurrentUser>(AUTH_ME_PATH);
    },
    staleTime: AUTH_STALE_TIME_MS,
    retry: (failureCount, error) => {
      if (isApiError(error) && error.status === HTTP_STATUS.UNAUTHORIZED) {
        return false;
      }
      return failureCount < 2;
    },
  });
}
