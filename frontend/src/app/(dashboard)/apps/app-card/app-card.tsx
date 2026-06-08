import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  BookOpen,
  CalendarRange,
  Landmark,
  Lightbulb,
  MoreVertical,
  Thermometer,
} from "lucide-react";

import { IntegrationStatus } from "@/app/(dashboard)/apps/constants";
import type { Integration } from "@/app/(dashboard)/apps/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

dayjs.extend(relativeTime);

const ICON_MAP: Record<string, React.ElementType> = {
  Landmark,
  CalendarRange,
  Thermometer,
  Lightbulb,
  BookOpen,
};

export function AppCard({ app }: { app: Integration }) {
  const Icon = ICON_MAP[app.icon] || BookOpen;

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
            <Icon className="text-primary size-5" />
          </div>
          <div>
            <CardTitle className="text-base">{app.name}</CardTitle>
            <div className="mt-1 flex items-center gap-2">
              <Badge
                variant={
                  app.status === IntegrationStatus.CONNECTED
                    ? "default"
                    : app.status === IntegrationStatus.ERROR
                      ? "destructive"
                      : "secondary"
                }
                className="text-[10px]"
              >
                {app.status === IntegrationStatus.CONNECTED
                  ? "Connected"
                  : app.status === IntegrationStatus.ERROR
                    ? "Action Needed"
                    : "Not Connected"}
              </Badge>
              {app.connectedAt && (
                <span className="text-muted-foreground text-xs">
                  {dayjs(app.connectedAt).fromNow()}
                </span>
              )}
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-sm" className="-mr-2 -mt-2">
                <MoreVertical className="size-4" />
                <span className="sr-only">App actions</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>View Logs</DropdownMenuItem>
            {app.status === IntegrationStatus.CONNECTED && (
              <DropdownMenuItem className="text-destructive">
                Disconnect
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between pt-4">
        <CardDescription className="line-clamp-2">
          {app.description}
        </CardDescription>

        <div className="mt-4 pt-4">
          {app.status === IntegrationStatus.CONNECTED ? (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Account</span>
              <span className="font-medium truncate max-w-[150px]">
                {app.accountName}
              </span>
            </div>
          ) : (
            <Button className="w-full" variant="outline">
              Connect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
