/** User/member-specific enums and constants. */

export enum UserRole {
  ADMIN = "admin",
  MEMBER = "member",
  GUEST = "guest",
}

export enum UserStatus {
  ACTIVE = "active",
  INVITED = "invited",
  INACTIVE = "inactive",
}

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Admin",
  [UserRole.MEMBER]: "Member",
  [UserRole.GUEST]: "Guest",
};

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: "Active",
  [UserStatus.INVITED]: "Invited",
  [UserStatus.INACTIVE]: "Inactive",
};

export const DEFAULT_USERS_PAGE_SIZE = 10;
