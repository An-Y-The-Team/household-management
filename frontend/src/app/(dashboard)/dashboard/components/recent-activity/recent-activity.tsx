"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  CheckCircle2,
  CreditCard,
  PlusCircle,
  UserPlus,
  Zap,
} from "lucide-react";

import { ActivityType } from "@/app/(dashboard)/dashboard/constants";
import type { ActivityItem } from "@/app/(dashboard)/dashboard/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

dayjs.extend(relativeTime);

const ACTIVITY_ICONS: Record<ActivityType, React.ElementType> = {
  [ActivityType.TASK_COMPLETED]: CheckCircle2,
  [ActivityType.TASK_CREATED]: PlusCircle,
  [ActivityType.MEMBER_JOINED]: UserPlus,
  [ActivityType.PAYMENT_MADE]: CreditCard,
  [ActivityType.SUBSCRIPTION_ADDED]: Zap,
};

const ACTIVITY_COLORS: Record<ActivityType, string> = {
  [ActivityType.TASK_COMPLETED]: "text-emerald-500",
  [ActivityType.TASK_CREATED]: "text-blue-500",
  [ActivityType.MEMBER_JOINED]: "text-violet-500",
  [ActivityType.PAYMENT_MADE]: "text-amber-500",
  [ActivityType.SUBSCRIPTION_ADDED]: "text-pink-500",
};

export function RecentActivity({ items }: { items: ActivityItem[] }) {
  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across all households</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-4">
            {items.map((item) => {
              const Icon = ACTIVITY_ICONS[item.type];
              const colorClass = ACTIVITY_COLORS[item.type];
              return (
                <div key={item.id} className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted ${colorClass}`}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug">{item.description}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {item.user} · {dayjs(item.timestamp).fromNow()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
