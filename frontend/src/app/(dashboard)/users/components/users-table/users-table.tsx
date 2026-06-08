"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MoreHorizontal, Trophy } from "lucide-react";

import {
  USER_ROLE_LABELS,
  USER_STATUS_LABELS,
  UserRole,
  UserStatus,
} from "@/app/(dashboard)/users/constants";
import type { User } from "@/app/(dashboard)/users/types";
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

dayjs.extend(relativeTime);

const ROLE_VARIANT: Record<UserRole, "default" | "secondary" | "outline"> = {
  [UserRole.ADMIN]: "default",
  [UserRole.MEMBER]: "secondary",
  [UserRole.GUEST]: "outline",
};

const STATUS_COLORS: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: "bg-emerald-500",
  [UserStatus.INVITED]: "bg-amber-500",
  [UserStatus.INACTIVE]: "bg-muted-foreground",
};

export function UsersTable({ users }: { users: User[] }) {
  if (users.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground text-sm">
          No members found. Invite someone to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Household</TableHead>
            <TableHead className="hidden lg:table-cell">Tasks Done</TableHead>
            <TableHead className="hidden lg:table-cell">Points</TableHead>
            <TableHead className="hidden md:table-cell">Last Active</TableHead>
            <TableHead className="w-[40px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const initials = (user.name ?? user.email)
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name ?? "—"}</p>
                      <p className="text-muted-foreground text-xs">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={ROLE_VARIANT[user.role]} className="text-xs">
                    {USER_ROLE_LABELS[user.role]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-2 rounded-full ${STATUS_COLORS[user.status]}`}
                    />
                    <span className="text-sm">
                      {USER_STATUS_LABELS[user.status]}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-muted-foreground text-sm">
                    {user.householdName}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className="text-sm tabular-nums">
                    {user.tasksCompleted}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center gap-1">
                    <Trophy className="text-amber-500 size-3" />
                    <span className="text-sm font-medium tabular-nums">
                      {user.totalPoints}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-muted-foreground text-sm">
                    {user.lastActiveAt
                      ? dayjs(user.lastActiveAt).fromNow()
                      : "Never"}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Member actions</span>
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Change Role</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
