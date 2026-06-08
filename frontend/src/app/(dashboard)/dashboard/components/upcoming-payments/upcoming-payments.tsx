"use client";

import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";

import type { UpcomingPayment } from "@/app/(dashboard)/dashboard/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UpcomingPayments({
  payments,
}: {
  payments: UpcomingPayment[];
}) {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>
        <CardDescription>Next renewals and bills due</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="bg-muted flex size-9 items-center justify-center rounded-lg">
                  <CalendarDays className="text-muted-foreground size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {payment.name}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {dayjs(payment.dueDate).format("MMM D, YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {payment.category}
                </Badge>
                <span className="text-sm font-semibold tabular-nums">
                  ${payment.amount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
