import type {
  TaskCategory,
  TaskPriority,
  TaskRecurrence,
  TaskStatus,
} from "./constants";

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  recurrence: TaskRecurrence;
  /** User ID of the assigned member. */
  assigneeId: string;
  /** Display name of the assignee. */
  assigneeName: string;
  /** ID of the household this task belongs to. */
  householdId: string;
  householdName: string;
  dueDate: string;
  createdAt: string;
  completedAt?: string;
  /** Points awarded for completing this task (gamification). */
  points: number;
  subTasks: SubTask[];
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: TaskCategory;
  assigneeId?: string;
  householdId?: string;
  search?: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: TaskPriority;
  category: TaskCategory;
  recurrence: TaskRecurrence;
  assigneeId: string;
  householdId: string;
  dueDate: string;
  points: number;
  subTasks: Omit<SubTask, "id">[];
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  status?: TaskStatus;
}
