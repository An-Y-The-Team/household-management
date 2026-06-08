/** Subscription-specific enums and constants. */

export enum SubscriptionStatus {
  ACTIVE = "active",
  PAUSED = "paused",
  CANCELLED = "cancelled",
  TRIAL = "trial",
}

export enum BillingCycle {
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  YEARLY = "yearly",
}

export enum SubscriptionCategory {
  ENTERTAINMENT = "entertainment",
  UTILITIES = "utilities",
  SOFTWARE = "software",
  HEALTH = "health",
  FOOD = "food",
  INSURANCE = "insurance",
  OTHER = "other",
}

export enum SubscriptionOwnerType {
  HOUSEHOLD = "household",
  PERSONAL = "personal",
}

export const SUBSCRIPTION_STATUS_LABELS: Record<SubscriptionStatus, string> = {
  [SubscriptionStatus.ACTIVE]: "Active",
  [SubscriptionStatus.PAUSED]: "Paused",
  [SubscriptionStatus.CANCELLED]: "Cancelled",
  [SubscriptionStatus.TRIAL]: "Trial",
};

export const BILLING_CYCLE_LABELS: Record<BillingCycle, string> = {
  [BillingCycle.MONTHLY]: "Monthly",
  [BillingCycle.QUARTERLY]: "Quarterly",
  [BillingCycle.YEARLY]: "Yearly",
};

export const SUBSCRIPTION_CATEGORY_LABELS: Record<
  SubscriptionCategory,
  string
> = {
  [SubscriptionCategory.ENTERTAINMENT]: "Entertainment",
  [SubscriptionCategory.UTILITIES]: "Utilities",
  [SubscriptionCategory.SOFTWARE]: "Software",
  [SubscriptionCategory.HEALTH]: "Health",
  [SubscriptionCategory.FOOD]: "Food",
  [SubscriptionCategory.INSURANCE]: "Insurance",
  [SubscriptionCategory.OTHER]: "Other",
};

export const OWNER_TYPE_LABELS: Record<SubscriptionOwnerType, string> = {
  [SubscriptionOwnerType.HOUSEHOLD]: "Household",
  [SubscriptionOwnerType.PERSONAL]: "Personal",
};
