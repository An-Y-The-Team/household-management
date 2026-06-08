"use client";

import dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";

import {
  TASK_CATEGORY_LABELS,
  TASK_PRIORITY_LABELS,
  TASK_RECURRENCE_LABELS,
  TASK_STATUS_LABELS,
  TaskPriority,
  TaskRecurrence,
  TaskStatus,
} from "@/app/(dashboard)/tasks/constants";
import type { Task } from "@/app/(dashboard)/tasks/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { cn } from "@/lib/cn";

const STATUS_VARIANT: Record<
  TaskStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [TaskStatus.TODO]: "outline",
  [TaskStatus.IN_PROGRESS]: "default",
  [TaskStatus.DONE]: "secondary",
  [TaskStatus.OVERDUE]: "destructive",
};

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "text-muted-foreground",
  [TaskPriority.MEDIUM]: "text-amber-600",
  [TaskPriority.HIGH]: "text-orange-600",
  [TaskPriority.URGENT]: "text-red-600 font-semibold",
};

export function TasksTable({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground text-sm">
          No tasks found. Create your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]" />
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden lg:table-cell">Assignee</TableHead>
            <TableHead className="hidden lg:table-cell">Household</TableHead>
            <TableHead className="hidden md:table-cell">Due Date</TableHead>
            <TableHead className="hidden xl:table-cell">Recurrence</TableHead>
            <TableHead className="hidden xl:table-cell text-right">
              Points
            </TableHead>
            <TableHead className="w-[40px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Checkbox
                  checked={task.status === TaskStatus.DONE}
                  aria-label={`Mark ${task.title} complete`}
                />
              </TableCell>
              <TableCell>
                <div>
                  <p
                    className={cn(
                      "font-medium text-sm",
                      task.status === TaskStatus.DONE &&
                        "line-through opacity-60"
                    )}
                  >
                    {task.title}
                  </p>
                  {task.subTasks.length > 0 && (
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {task.subTasks.filter((st) => st.completed).length}/
                      {task.subTasks.length} subtasks
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={STATUS_VARIANT[task.status]}
                  className="text-xs"
                >
                  {TASK_STATUS_LABELS[task.status]}
                </Badge>
              </TableCell>
              <TableCell>
                <span className={cn("text-sm", PRIORITY_COLORS[task.priority])}>
                  {TASK_PRIORITY_LABELS[task.priority]}
                </span>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <span className="text-muted-foreground text-sm">
                  {TASK_CATEGORY_LABELS[task.category]}
                </span>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <span className="text-sm">{task.assigneeName}</span>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <span className="text-muted-foreground text-sm">
                  {task.householdName}
                </span>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <span
                  className={cn(
                    "text-sm tabular-nums",
                    task.status === TaskStatus.OVERDUE &&
                      "text-red-600 font-medium"
                  )}
                >
                  {dayjs(task.dueDate).format("MMM D")}
                </span>
              </TableCell>
              <TableCell className="hidden xl:table-cell">
                {task.recurrence !== TaskRecurrence.NONE && (
                  <Badge variant="outline" className="text-xs">
                    {TASK_RECURRENCE_LABELS[task.recurrence]}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="hidden xl:table-cell text-right">
                <span className="text-sm font-medium tabular-nums">
                  {task.points}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Task actions</span>
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Delete
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
