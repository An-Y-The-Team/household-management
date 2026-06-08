import { IntegrationCategory, IntegrationStatus } from "../constants";
import type { Integration } from "../types";

export const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: "app-1",
    name: "Plaid",
    description:
      "Connect your bank accounts to sync transactions automatically.",
    icon: "Landmark",
    status: IntegrationStatus.CONNECTED,
    category: IntegrationCategory.FINANCE,
    connectedAt: "2026-05-15T10:00:00Z",
    accountName: "Chase Bank",
  },
  {
    id: "app-2",
    name: "Google Calendar",
    description: "Sync household events and chores with your calendar.",
    icon: "CalendarRange",
    status: IntegrationStatus.CONNECTED,
    category: IntegrationCategory.CALENDAR,
    connectedAt: "2026-06-01T14:30:00Z",
    accountName: "thienydo@gmail.com",
  },
  {
    id: "app-3",
    name: "Nest",
    description: "Manage smart thermostat settings and view energy reports.",
    icon: "Thermometer",
    status: IntegrationStatus.DISCONNECTED,
    category: IntegrationCategory.SMART_HOME,
  },
  {
    id: "app-4",
    name: "Philips Hue",
    description: "Automate your lighting for different times of the day.",
    icon: "Lightbulb",
    status: IntegrationStatus.DISCONNECTED,
    category: IntegrationCategory.SMART_HOME,
  },
  {
    id: "app-5",
    name: "Notion",
    description: "Export household notes and wiki pages directly to Notion.",
    icon: "BookOpen",
    status: IntegrationStatus.ERROR,
    category: IntegrationCategory.PRODUCTIVITY,
    connectedAt: "2026-04-10T09:00:00Z",
    accountName: "Thien Do's Workspace",
  },
];
