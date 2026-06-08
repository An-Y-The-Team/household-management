/** Task-specific enums and constants. */

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
  OVERDUE = "overdue",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export enum TaskCategory {
  KITCHEN = "kitchen",
  BATHROOM = "bathroom",
  BEDROOM = "bedroom",
  LIVING_ROOM = "living_room",
  GARDEN = "garden",
  GARAGE = "garage",
  OUTDOOR = "outdoor",
  LAUNDRY = "laundry",
  GENERAL = "general",
}

export enum TaskRecurrence {
  NONE = "none",
  DAILY = "daily",
  WEEKLY = "weekly",
  BIWEEKLY = "biweekly",
  MONTHLY = "monthly",
}

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "To Do",
  [TaskStatus.IN_PROGRESS]: "In Progress",
  [TaskStatus.DONE]: "Done",
  [TaskStatus.OVERDUE]: "Overdue",
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "Low",
  [TaskPriority.MEDIUM]: "Medium",
  [TaskPriority.HIGH]: "High",
  [TaskPriority.URGENT]: "Urgent",
};

export const TASK_CATEGORY_LABELS: Record<TaskCategory, string> = {
  [TaskCategory.KITCHEN]: "Kitchen",
  [TaskCategory.BATHROOM]: "Bathroom",
  [TaskCategory.BEDROOM]: "Bedroom",
  [TaskCategory.LIVING_ROOM]: "Living Room",
  [TaskCategory.GARDEN]: "Garden",
  [TaskCategory.GARAGE]: "Garage",
  [TaskCategory.OUTDOOR]: "Outdoor",
  [TaskCategory.LAUNDRY]: "Laundry",
  [TaskCategory.GENERAL]: "General",
};

export const TASK_RECURRENCE_LABELS: Record<TaskRecurrence, string> = {
  [TaskRecurrence.NONE]: "None",
  [TaskRecurrence.DAILY]: "Daily",
  [TaskRecurrence.WEEKLY]: "Weekly",
  [TaskRecurrence.BIWEEKLY]: "Biweekly",
  [TaskRecurrence.MONTHLY]: "Monthly",
};

export const DEFAULT_TASKS_PAGE_SIZE = 10;
