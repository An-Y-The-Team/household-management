"use client";

import dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";

import {
  BILLING_CYCLE_LABELS,
  OWNER_TYPE_LABELS,
  SUBSCRIPTION_CATEGORY_LABELS,
  SUBSCRIPTION_STATUS_LABELS,
  SubscriptionOwnerType,
  SubscriptionStatus,
} from "@/app/(dashboard)/subscriptions/constants";
import type { Subscription } from "@/app/(dashboard)/subscriptions/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const STATUS_VARIANT: Record<
  SubscriptionStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [SubscriptionStatus.ACTIVE]: "default",
  [SubscriptionStatus.PAUSED]: "secondary",
  [SubscriptionStatus.CANCELLED]: "destructive",
  [SubscriptionStatus.TRIAL]: "outline",
};

export function SubscriptionsTable({
  subscriptions,
}: {
  subscriptions: Subscription[];
}) {
  if (subscriptions.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground text-sm">
          No subscriptions found. Add your first subscription.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="hidden md:table-cell">Owner</TableHead>
            <TableHead className="hidden lg:table-cell">Household</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="hidden md:table-cell">Cycle</TableHead>
            <TableHead className="hidden lg:table-cell">Next Renewal</TableHead>
            <TableHead className="w-[40px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell>
                <div>
                  <p className="text-sm font-medium">{sub.name}</p>
                  {sub.description && (
                    <p className="text-muted-foreground mt-0.5 max-w-[200px] truncate text-xs">
                      {sub.description}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={STATUS_VARIANT[sub.status]} className="text-xs">
                  {SUBSCRIPTION_STATUS_LABELS[sub.status]}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-muted-foreground text-sm">
                  {SUBSCRIPTION_CATEGORY_LABELS[sub.category]}
                </span>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div>
                  <Badge variant="outline" className="text-xs">
                    {OWNER_TYPE_LABELS[sub.ownerType]}
                  </Badge>
                  {sub.ownerType === SubscriptionOwnerType.PERSONAL &&
                    sub.ownerName && (
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {sub.ownerName}
                      </p>
                    )}
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <span className="text-muted-foreground text-sm">
                  {sub.householdName}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span className="text-sm font-semibold tabular-nums">
                  ${sub.amount.toFixed(2)}
                </span>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <span className="text-muted-foreground text-sm">
                  {BILLING_CYCLE_LABELS[sub.billingCycle]}
                </span>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <span className="text-sm tabular-nums">
                  {dayjs(sub.nextRenewalDate).format("MMM D, YYYY")}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Subscription actions</span>
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Payment History</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
