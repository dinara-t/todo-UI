import type { Category } from "./category";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  category: Category | null;
};

export type CreateTodoDto = {
  title: string;
  completed: boolean;
  categoryId: number;
};

export type UpdateTodoDto = {
  title?: string | null;
  completed?: boolean | null;
  categoryId?: number | null;
};

export type SortOrder = "ASC" | "DESC";

export type TodoSortBy = "createdAt" | "title" | "completed";

export type TodoQuery = {
  category?: number | null;
  sortBy?: TodoSortBy;
  order?: SortOrder;
};
