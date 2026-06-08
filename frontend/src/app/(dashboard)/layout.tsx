"use client";

import { AuthGuard } from "@/app/(auth)/components/auth-guard/auth-guard";
import { AppHeader } from "@/components/layout/app-header/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar/app-sidebar";
import { SearchCommand } from "@/components/layout/search-command/search-command";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
            {children}
          </div>
        </SidebarInset>
        <SearchCommand />
      </SidebarProvider>
    </AuthGuard>
  );
}
