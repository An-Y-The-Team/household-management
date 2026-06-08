"use client";

import { useState } from "react";

import { AccountForm } from "@/app/(dashboard)/settings/components/account-form/account-form";
import { AppearanceForm } from "@/app/(dashboard)/settings/components/appearance-form/appearance-form";
import { DisplayForm } from "@/app/(dashboard)/settings/components/display-form/display-form";
import { NotificationsForm } from "@/app/(dashboard)/settings/components/notifications-form/notifications-form";
import { ProfileForm } from "@/app/(dashboard)/settings/components/profile-form/profile-form";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";

const sidebarNavItems = [
  { id: "profile", title: "Profile", component: ProfileForm },
  { id: "account", title: "Account", component: AccountForm },
  { id: "appearance", title: "Appearance", component: AppearanceForm },
  { id: "notifications", title: "Notifications", component: NotificationsForm },
  { id: "display", title: "Display", component: DisplayForm },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const ActiveComponent =
    sidebarNavItems.find((item) => item.id === activeTab)?.component ||
    ProfileForm;

  return (
    <div className="space-y-6 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {sidebarNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "hover:bg-muted hover:text-primary justify-start rounded-md px-4 py-2 text-left text-sm font-medium transition-colors",
                  activeTab === item.id ? "bg-muted" : "text-muted-foreground"
                )}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}
