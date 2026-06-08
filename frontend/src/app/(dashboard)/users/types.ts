import type { UserRole, UserStatus } from "./constants";

/** A user/member as returned by the backend. */
export interface User {
  id: string;
  email: string;
  name?: string | null;
  role: UserRole;
  status: UserStatus;
  avatarUrl?: string | null;
  phone?: string | null;
  /** ID of the household this membership belongs to. */
  householdId: string;
  householdName: string;
  joinedAt: string;
  lastActiveAt?: string | null;
  /** Number of tasks this member has completed (gamification). */
  tasksCompleted: number;
  /** Total reward points earned. */
  totalPoints: number;
}

export interface UserFilters {
  role?: UserRole;
  status?: UserStatus;
  householdId?: string;
  search?: string;
}
