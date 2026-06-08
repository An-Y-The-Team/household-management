import type {
  BillingCycle,
  SubscriptionCategory,
  SubscriptionOwnerType,
  SubscriptionStatus,
} from "./constants";

export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "failed" | "pending";
}

export interface Subscription {
  id: string;
  name: string;
  description?: string;
  status: SubscriptionStatus;
  category: SubscriptionCategory;
  ownerType: SubscriptionOwnerType;
  /** If personal, the member who owns it. */
  ownerId?: string;
  ownerName?: string;
  /** The household this subscription belongs to. */
  householdId: string;
  householdName: string;
  amount: number;
  currency: string;
  billingCycle: BillingCycle;
  nextRenewalDate: string;
  startDate: string;
  /** Recent payment history. */
  paymentHistory: PaymentRecord[];
  notes?: string;
}

export interface SubscriptionFilters {
  status?: SubscriptionStatus;
  category?: SubscriptionCategory;
  ownerType?: SubscriptionOwnerType;
  householdId?: string;
  search?: string;
}

export interface CreateSubscriptionInput {
  name: string;
  description?: string;
  category: SubscriptionCategory;
  ownerType: SubscriptionOwnerType;
  ownerId?: string;
  householdId: string;
  amount: number;
  currency: string;
  billingCycle: BillingCycle;
  startDate: string;
  notes?: string;
}
