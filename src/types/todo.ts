import type { Category } from "./category";

export type Urgency = "LOW" | "MEDIUM" | "HIGH";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  archived: boolean;
  dueDate: string | null;
  urgency: Urgency | null;
  recurrenceDays: number | null;
  overdue: boolean;
  category: Category | null;
};

export type CreateTodoDto = {
  title: string;
  completed: boolean;
  categoryId: number;
  dueDate?: string | null;
  urgency?: Urgency | null;
  recurrenceDays?: number | null;
};

export type UpdateTodoDto = {
  title?: string | null;
  completed?: boolean | null;
  categoryId?: number | null;
  dueDate?: string | null;
  urgency?: Urgency | null;
  recurrenceDays?: number | null;
};

export type SortOrder = "ASC" | "DESC";

export type TodoSortBy =
  | "createdAt"
  | "title"
  | "completed"
  | "dueDate"
  | "urgency";

export type TodoQuery = {
  category?: number | null;
  sortBy?: TodoSortBy;
  order?: SortOrder;
  overdue?: boolean | null;
  dueBefore?: string | null;
  dueAfter?: string | null;
  urgency?: Urgency | null;
  completed?: boolean | null;
};
