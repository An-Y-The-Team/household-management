import { useCallback } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TaskStatus } from "../../constants";
import type { CreateTaskInput, Task, UpdateTaskInput } from "../../types";

const TASKS_QUERY_KEY = ["tasks"] as const;

/**
 * Mock mutations for tasks — optimistically updates the query cache.
 *
 * When the backend is ready:
 *   - `mutationFn` calls `api.post`, `api.patch`, `api.delete`
 *   - `onSuccess` can invalidate instead of manually updating
 */
export function useTaskMutations() {
  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: async (input: CreateTaskInput) => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const subTasks = (input.subTasks ?? []).map((st, i) => ({
        ...st,
        id: `st-new-${i}`,
      }));

      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: input.title,
        description: input.description,
        status: TaskStatus.TODO,
        priority: input.priority,
        category: input.category,
        recurrence: input.recurrence,
        assigneeId: input.assigneeId,
        assigneeName: "New Assignee",
        householdId: input.householdId,
        householdName: "Household",
        dueDate: input.dueDate,
        createdAt: new Date().toISOString(),
        points: input.points ?? 5,
        subTasks,
      };

      return newTask;
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (old) => {
        if (!old) return [newTask];
        return [newTask, ...old];
      });
    },
  });

  const updateTask = useMutation({
    mutationFn: async ({
      taskId,
      data,
    }: {
      taskId: string;
      data: UpdateTaskInput;
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { taskId, data };
    },
    onSuccess: ({ taskId, data }) => {
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (old) => {
        if (!old) return old;
        return old.map((t) =>
          t.id === taskId ? ({ ...t, ...data } as Task) : t
        );
      });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (taskId: string) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return taskId;
    },
    onSuccess: (taskId) => {
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (old) => {
        if (!old) return old;
        return old.filter((t) => t.id !== taskId);
      });
    },
  });

  const handleCreate = useCallback(
    (input: CreateTaskInput) => {
      createTask.mutate(input);
    },
    [createTask]
  );

  const handleUpdate = useCallback(
    ({ taskId, data }: { taskId: string; data: UpdateTaskInput }) => {
      updateTask.mutate({ taskId, data });
    },
    [updateTask]
  );

  const handleDelete = useCallback(
    (taskId: string) => {
      deleteTask.mutate(taskId);
    },
    [deleteTask]
  );

  return {
    createTask: handleCreate,
    updateTask: handleUpdate,
    deleteTask: handleDelete,
    isCreating: createTask.isPending,
    isUpdating: updateTask.isPending,
    isDeleting: deleteTask.isPending,
  };
}
