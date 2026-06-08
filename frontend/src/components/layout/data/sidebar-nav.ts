import {
  BarChart3,
  CalendarCheck,
  CreditCard,
  Home,
  LayoutGrid,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  /** Badge text (e.g. unread count). */
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const SIDEBAR_NAV: NavGroup[] = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: Home },
      { title: "Tasks", href: "/tasks", icon: CalendarCheck },
      { title: "Members", href: "/users", icon: Users },
      {
        title: "Subscriptions",
        href: "/subscriptions",
        icon: CreditCard,
      },
      { title: "Chats", href: "/chats", icon: MessageSquare, badge: "3" },
      { title: "Apps", href: "/apps", icon: LayoutGrid },
    ],
  },
  {
    label: "Other",
    items: [
      { title: "Reports", href: "/reports", icon: BarChart3 },
      { title: "Settings", href: "/settings", icon: Settings },
    ],
  },
];
