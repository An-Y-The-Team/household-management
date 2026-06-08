import type { IntegrationCategory, IntegrationStatus } from "./constants";

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string; // Used as a Lucide icon name or URL
  status: IntegrationStatus;
  category: IntegrationCategory;
  connectedAt?: string;
  accountName?: string;
}
